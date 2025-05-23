import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';

// Placeholder dinosaur sprite (a green rectangle for now)
const DINO_COLOR = 0x43a047;
const OBSTACLE_COLOR = 0x1565c0;
const GROUND_COLOR = 0x888888;

class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private obstacles!: Phaser.Physics.Arcade.Group;
  private ground!: Phaser.GameObjects.Rectangle;
  private score: number = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private gameSpeed: number = 5;
  private isGameOver: boolean = false;
  private onScoreUpdate: (score: number) => void;
  private ducking: boolean = false;
  private restartHandler: (() => void) | null = null;
  private obstacleTypes = ['low', 'high']; // 'low' = jump, 'high' = duck
  private baseGameSpeed = 3.5; // 70% of previous 5
  private speedIncrement = 0.00007; // 70% of previous 0.0001
  private lastActionTime: number = Date.now();
  private onJump?: (responseTime: number) => void;

  constructor(config: { onScoreUpdate: (score: number) => void; onJump?: (responseTime: number) => void }) {
    super({ key: 'GameScene' });
    this.onScoreUpdate = config.onScoreUpdate;
    this.onJump = config.onJump;
  }

  setRestartHandler(handler: () => void) {
    this.restartHandler = handler;
  }

  create() {
    // Create ground (road)
    this.ground = this.add.rectangle(200, 290, 400, 40, GROUND_COLOR).setOrigin(0.5, 0.5);
    this.physics.add.existing(this.ground, true);

    // Create player (dinosaur placeholder)
    this.player = this.add.rectangle(80, 240, 40, 48, DINO_COLOR).setOrigin(0.5, 1);
    this.physics.add.existing(this.player);
    (this.player.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);

    // Create obstacles group
    this.obstacles = this.physics.add.group();

    // Add collision between player and ground
    this.physics.add.collider(this.player, this.ground);

    // Add collision between player and obstacles
    this.physics.add.collider(this.player, this.obstacles, this.gameOver, undefined, this);

    // Score text
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '20px', color: '#222' });

    // Input handlers are now managed from React for focus control
    // Start spawning obstacles
    this.time.addEvent({
      delay: 1200,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });

    this.gameSpeed = this.baseGameSpeed;
  }

  update() {
    if (this.isGameOver) return;

    // Update score
    this.score += 0.1;
    this.scoreText.setText(`Score: ${Math.floor(this.score)}`);
    this.onScoreUpdate(Math.floor(this.score));

    // Move obstacles
    this.obstacles.getChildren().forEach((obstacle: any) => {
      obstacle.x -= this.gameSpeed;
      if (obstacle.x < -30) {
        obstacle.destroy();
      }
    });

    // Increase game speed over time
    this.gameSpeed += this.speedIncrement;
  }

  jump() {
    if (this.isGameOver) return;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (body.blocked.down && !this.ducking) {
      body.setVelocityY(-420);
      const now = Date.now();
      if (this.onJump) {
        this.onJump(now - this.lastActionTime);
      }
      this.lastActionTime = now;
    }
  }

  setDucking(isDucking: boolean) {
    if (this.isGameOver) return;
    if (isDucking && !this.ducking) {
      this.ducking = true;
      this.player.setSize(40, 24);
      this.player.y = 290 - 12; // Adjust y position to stay on ground
      (this.player.body as Phaser.Physics.Arcade.Body).setSize(40, 24);
      const now = Date.now();
      if (this.onJump) {
        this.onJump(now - this.lastActionTime);
      }
      this.lastActionTime = now;
    } else if (!isDucking && this.ducking) {
      this.ducking = false;
      this.player.setSize(40, 48);
      this.player.y = 290 - 24; // Adjust y position to stay on ground
      (this.player.body as Phaser.Physics.Arcade.Body).setSize(40, 48);
    }
  }

  spawnObstacle() {
    if (this.isGameOver) return;
    // Randomly choose obstacle type
    const type = Phaser.Math.RND.pick(this.obstacleTypes);
    let obstacle;
    if (type === 'low') {
      // Low obstacle: must jump over (tall, on ground)
      obstacle = this.add.rectangle(420, 240, 24, 48, OBSTACLE_COLOR).setOrigin(0.5, 1);
    } else {
      // High obstacle: must duck under (short, higher up)
      obstacle = this.add.rectangle(420, 240, 48, 24, 0xffb300).setOrigin(0.5, 1); // orange for high
    }
    this.physics.add.existing(obstacle);
    this.obstacles.add(obstacle);
    (obstacle.body as Phaser.Physics.Arcade.Body).setImmovable(true);
    (obstacle.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
  }

  gameOver() {
    this.isGameOver = true;
    this.physics.pause();
    this.add.text(200, 120, 'Game Over', { fontSize: '32px', color: '#c62828' }).setOrigin(0.5);
    if (this.restartHandler) {
      this.input.once('pointerdown', () => {
        this.restartHandler && this.restartHandler();
      });
    }
  }
}

interface AnalystRunnerGameProps {
  onScoreUpdate: (score: number) => void;
  onJump?: (responseTime: number) => void;
}

export default function AnalystRunnerGame({ onScoreUpdate, onJump }: AnalystRunnerGameProps) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [restartFlag, setRestartFlag] = useState(0); // Used to force remount on restart
  const sceneRef = useRef<GameScene | null>(null);
  // Store the last jump time
  const lastJumpTime = useRef<number>(Date.now());

  useEffect(() => {
    if (gameRef.current || !containerRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 400,
      height: 300,
      parent: containerRef.current,
      backgroundColor: '#f8fafc',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 1200, x: 0 },
          debug: false
        }
      },
      scene: new (class extends GameScene {
        constructor() {
          super({ onScoreUpdate, onJump });
        }
        create() {
          super.create();
          sceneRef.current = this;
          this.setRestartHandler(() => {
            setRestartFlag(f => f + 1);
            setIsFocused(true);
          });
        }
      })()
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [onScoreUpdate, restartFlag]);

  // Keyboard event handler
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isFocused) return;
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        const now = Date.now();
        if (onJump) {
          onJump(now - lastJumpTime.current);
        }
        lastJumpTime.current = now;
        sceneRef.current?.jump();
      } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        e.preventDefault();
        sceneRef.current?.setDucking(true);
      }
    }
    function handleKeyUp(e: KeyboardEvent) {
      if (!isFocused) return;
      if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        e.preventDefault();
        sceneRef.current?.setDucking(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isFocused]);

  // Focus on click
  function handleClick() {
    setIsFocused(true);
    containerRef.current?.focus();
    // If game is over, restart
    if (sceneRef.current && sceneRef.current['isGameOver']) {
      setRestartFlag(f => f + 1);
    }
  }

  // Blur on click outside
  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, []);

  return (
    <div
      id="game-container"
      ref={containerRef}
      tabIndex={0}
      style={{
        width: 400,
        height: 300,
        margin: '0 auto',
        outline: isFocused ? '3px solid #0070f3' : 'none',
        borderRadius: 8,
        boxShadow: isFocused ? '0 0 0 2px #0070f3' : '0 2px 8px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        background: '#f8fafc',
      }}
      onClick={handleClick}
    />
  );
} 
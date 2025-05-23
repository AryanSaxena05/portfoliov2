import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';

// Game colors in retro arcade style
const DINO_COLOR = 0xFFB71F;      // Gold player
const OBSTACLE_COLOR = 0x89CFF0;   // Arcade blue obstacles
const GROUND_COLOR = 0x43C6AC;     // Arcade teal ground

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
    this.onScoreUpdate = (score: number) => {
      config.onScoreUpdate(score);
    };
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
    this.scoreText = this.add.text(16, 16, 'Score: 0', { 
      fontSize: '20px', 
      color: '#FFB71F',
      fontFamily: '"Press Start 2P"'
    });

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
    this.add.text(200, 120, 'Game Over', { 
      fontSize: '32px', 
      color: '#FF47A3',
      fontFamily: '"Press Start 2P"'
    }).setOrigin(0.5);
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
  const [score, setScore] = useState(0);
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
      backgroundColor: '#0D1B2A',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 1200, x: 0 },
          debug: false
        }
      },
      scene: new (class extends GameScene {
        constructor() {
          super({ 
            onScoreUpdate: (newScore) => {
              setScore(newScore);
              onScoreUpdate(newScore);
            }, 
            onJump 
          });
        }
        create() {
          super.create();
          sceneRef.current = this;
          this.setRestartHandler(() => {
            setScore(0);
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
      setScore(0);
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
    <div className="bg-[#0D1B2A] border-2 border-[#89CFF0] p-6 rounded-lg h-full">
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <h3 className="font-['Press_Start_2P'] text-[#FFB71F] text-lg">Score: {Math.floor(score)}</h3>
        </div>
        <div 
          ref={containerRef}
          onClick={() => setIsFocused(true)}
          className="w-[400px] h-[300px] mx-auto cursor-pointer bg-[#0D1B2A]"
          style={{ 
            outline: isFocused ? '2px solid #FFB71F' : 'none',
            borderRadius: '4px'
          }}
        />
        <div className="mt-6 flex justify-between items-center">
          <div className="font-['Press_Start_2P'] text-[#89CFF0] text-sm">
            {isFocused ? 'Click to play!' : 'Game paused'}
          </div>
          <button
            onClick={() => setRestartFlag(f => f + 1)}
            className="bg-[#FFB71F] text-[#0D1B2A] font-['Press_Start_2P'] px-4 py-2 rounded hover:bg-[#89CFF0] transition-colors"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}
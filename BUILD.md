# Build Instructions for ProfessionalPortfolio_0410

This project uses Vite, React, and TypeScript. Follow these steps to build the project for production.

## Prerequisites
- Node.js (v16 or higher recommended)
- npm (v8 or higher recommended)

## 1. Install Dependencies

```
npm install
```

## 2. Build the Project

```
npm run build
```

This will generate a production-ready build in the `client/dist` directory.

## 3. Preview the Production Build (Optional)

To locally preview the production build:

```
npm run preview
```

## 4. Customization
- Edit source files in `client/src/` as needed.
- Static assets are in `attached_assets/` and referenced in the code.

## 5. Troubleshooting
- If you encounter issues, delete `node_modules` and `package-lock.json`, then reinstall:
  ```
  rm -rf node_modules package-lock.json
  npm install
  ```

---

For more details, see the `package.json` and `vite.config.ts` files.

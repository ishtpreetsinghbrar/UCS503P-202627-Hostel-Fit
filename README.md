# HostelFit

HostelFit is a hostel-focused mobile application for estimated mess-meal calorie tracking,
workout logging, and fitness progress monitoring. This repository currently contains only the
Phase 1 application foundation; authentication, database models, and business features have not
yet been implemented.

## Prerequisites

- Node.js 20.19-24.x
- pnpm 11+
- Expo Go on an Android/iOS device, or an Android/iOS simulator for mobile development

## Setup

1. Install workspace dependencies:

   ```bash
   pnpm install
   ```

2. Create local environment files from the safe examples:

   ```bash
   Copy-Item backend/.env.example backend/.env
   Copy-Item frontend/.env.example frontend/.env
   ```

   On macOS/Linux, use `cp` in place of `Copy-Item`.

3. Start the API in one terminal:

   ```bash
   pnpm dev:backend
   ```

   The health check is available at `http://localhost:4000/api/health`.

4. Start Expo in another terminal:

   ```bash
   pnpm dev:frontend
   ```

   For a physical device, set `EXPO_PUBLIC_API_BASE_URL` in `frontend/.env` to the computer's
   reachable LAN address, for example `http://192.168.1.10:4000/api`.

## Quality checks

```bash
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
```

## Environment variables

Only non-secret development configuration appears in the example files. Never commit `.env`
files or production credentials. `EXPO_PUBLIC_*` values are bundled into the mobile app and must
not contain secrets.

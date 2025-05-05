# Vite of the Three Kingdoms

This project demonstrates a **micro-frontend architecture** using **React**, **Vite**, **Module Federation**, and **Nx**. It includes one host application (`shell`) and three remote apps (`auroria`, `borealis`, `cygnus`), each exposing federated React components. The host dynamically consumes and renders components from the remotes.

This implementation follows patterns similar to [vite-plugin-federation examples](https://github.com/originjs/vite-plugin-federation/tree/main/packages/examples/react-vite) and is structured as an Nx monorepo using PNPM.

---

## Requirements

- Node.js 18+
- PNPM
- Nx CLI (npm install -g nx)

## Running the apps in preview mode

#### 1. Install dependencies with PNPM

```bash
pnpm install
```

#### 2. Preview apps:

To preview the application (host and remotes) you must first build the apps.

##### Build apps

To build all apps at once:

```bash
pnpm build:all
```

Or build them individually:

```bash
pnpm nx build auroria
pnpm nx build borealis
pnpm nx build cygnus
pnpm nx build shell
```

You can also use these shortcuts:

```bash
pnpm build:remotes
pnpm build:host
```

##### Preview apps

To preview all apps concurrently:

```bash
pnpm preview:all
```

This starts the apps at:

- shell on http://localhost:4200
- auroria on http://localhost:4201
- borealis on http://localhost:4202
- cygnus on http://localhost:4203

To preview apps individually:

```bash
pnpm preview:auroria
pnpm preview:borealis
pnpm preview:cygnus
pnpm preview:host
```

#### 4. Access the Host App

Open [localhost:4200](http://localhost:4200/) to view the shell consuming components from remotes.

## Custom Nx Plugin

This project includes a custom Nx plugin named nx-mf-vite that automates Vite + Module Federation configuration.

To configure an app as a remote or host:

```bash
pnpm nx g @91life/nx-mf-vite:setup-vite-mf --project=<app-name> --type=remote|host
```

This sets up:

- vite.config.ts with proper federation() options
- A basic RemoteComponent.tsx for remotes (if missing)
- Port assignments, shared dependencies, and build configuration

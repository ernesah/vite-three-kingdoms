import {
  Tree,
  formatFiles,
  readProjectConfiguration,
  updateJson,
  joinPathFragments,
} from '@nx/devkit';
import { SetupViteMfGeneratorSchema } from './schema';

export default async function setupViteMfGenerator(
  tree: Tree,
  options: SetupViteMfGeneratorSchema
) {
  const { project, type } = options;
  const config = readProjectConfiguration(tree, project);
  const root = config.root;

  const viteConfigPath = joinPathFragments(root, 'vite.config.ts');

  updateJson(tree, 'package.json', (json) => {
    json.devDependencies ??= {};
    json.devDependencies['@originjs/vite-plugin-federation'] = '0.0.1';
    return json;
  });

  const federationOptions =
    type === 'remote'
      ? `
      exposes: {
        './Component': './src/RemoteComponent.tsx'
      },`
      : `
      remotes: {
        auroria: 'http://localhost:4201/assets/remoteEntry.js',
        borealis: 'http://localhost:4202/assets/remoteEntry.js',
        cygnus: 'http://localhost:4203/assets/remoteEntry.js',
      },`;

  const viteConfigContent = `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: '${project}',
      filename: 'remoteEntry.js',${federationOptions}
      shared: ['react', 'react-dom']
    })
  ],
  server: {
    port: ${getPortForApp(project)}
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});
`;

  tree.write(viteConfigPath, viteConfigContent);

  if (type === 'remote') {
    const componentPath = joinPathFragments(root, 'src/RemoteComponent.tsx');
    if (!tree.exists(componentPath)) {
      tree.write(
        componentPath,
        `const RemoteComponent = () => <div>${project} Remote</div>;\nexport default RemoteComponent;`
      );
    }
  }

  await formatFiles(tree);
}

function getPortForApp(name: string): number {
  const ports: Record<string, number> = {
    auroria: 4201,
    borealis: 4202,
    cygnus: 4203,
    shell: 4200,
  };
  return ports[name] ?? 4300;
}

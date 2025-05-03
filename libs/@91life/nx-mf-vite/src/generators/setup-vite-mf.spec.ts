import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import {
  Tree,
  addProjectConfiguration,
  readProjectConfiguration,
} from '@nx/devkit';
import setupViteMfGenerator from './setup-vite-mf';
import { SetupViteMfGeneratorSchema } from './schema';

describe('setup-vite-mf generator', () => {
  let tree: Tree;
  const options: SetupViteMfGeneratorSchema = {
    project: 'test',
    type: 'remote',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    addProjectConfiguration(tree, 'test', {
      root: 'apps/test',
      projectType: 'application',
      sourceRoot: 'apps/test/src',
      targets: {},
    });
  });

  it('should run successfully', async () => {
    await setupViteMfGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});

import { NodeServer } from '@bitdev/node.node-server';

export default NodeServer.from({
  name: 'trellis-service',
  mainPath: import.meta.resolve('./trellis-service.app-root.js'),
});

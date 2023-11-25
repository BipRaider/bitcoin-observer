import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    server: {
      host: '0.0.0.0',
      port: 3000,
      //https: true,

      watch: {
        usePolling: true,
      },
    },
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {},
    },
  });
};

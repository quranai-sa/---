import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      plugins: [],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
        __BUILD_TIME__: JSON.stringify(new Date().toISOString())
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
          '@components': path.resolve(__dirname, 'components'),
          '@utils': path.resolve(__dirname, 'utils'),
          '@services': path.resolve(__dirname, 'services')
        }
      },
      server: {
        port: 5173,
        host: true,
        headers: {
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin'
        }
      },
      build: {
        target: 'es2015',
        minify: 'esbuild',
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
              audio: ['./components/AudioManager', './components/FloatingAudioPlayer', './components/PlaylistModal'],
              admin: ['./components/AdminPage', './components/AdminDashboard', './components/AdminLogin', './components/AdminFormModal'],
              utils: ['./utils/security', './utils/performance', './utils/monitoring', './utils/cache']
            },
            chunkFileNames: 'assets/js/[name]-[hash].js',
            entryFileNames: 'assets/js/[name]-[hash].js',
            assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
          }
        },
        chunkSizeWarningLimit: 1000,
        sourcemap: false
      },
      optimizeDeps: {
        include: ['react', 'react-dom']
      }
    };
});

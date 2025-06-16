import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const base = command === 'serve' ? '/' : '/dnd-fighter/';

    return {
        base,
        plugins: [vue(), vueDevTools()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    };
});

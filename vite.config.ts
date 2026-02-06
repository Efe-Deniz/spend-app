import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // ← Yeni ekleme

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(), // ← Tailwind v4 plugin'i
    ],
});

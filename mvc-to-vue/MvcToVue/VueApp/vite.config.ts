import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path/win32'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/dist/',  //sets base path for built assets
  build: {
    outDir: '../wwwroot/dist',  //outputs the build to required directory
    emptyOutDir: true,  //ensures clean build
    manifest: true,     //generates manifest file
    rolldownOptions: {
      input: {
        privacy: path.resolve(__dirname, 'src/entries/Privacy.ts')  //defines entry point file for privacy page
      },
    }
  }
})

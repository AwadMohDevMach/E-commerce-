import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  resolve : {
    alias : {
      "@assets" : path.resolve(__dirname , "src/assets"),
      "@components" : path.resolve(__dirname , "src/components"),
      "@routes" : path.resolve(__dirname , "src/routes"),
      "@layouts" : path.resolve(__dirname , "src/layouts"),
      "@hooks" : path.resolve(__dirname , "src/hooks"),
      "@services" : path.resolve(__dirname , "src/services"),
      "@store" : path.resolve(__dirname , "src/store"),
      "@styles" : path.resolve(__dirname , "src/styles"),
      "@utils" : path.resolve(__dirname , "src/utils"),
      "@customTypes" : path.resolve(__dirname , "src/customTypes"),
      "@pages" : path.resolve(__dirname , "src/pages"),
      "@images" : path.resolve(__dirname , "src/images"),
      "@validations" : path.resolve(__dirname , "src/validations"),
    },
  },
  plugins: [react() , svgr()],
})

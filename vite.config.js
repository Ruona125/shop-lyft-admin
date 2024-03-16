import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/shop-lyft-admin/"
  // server: {
  //   proxy: {
  //     '/api':'http://64.23.187.18:8000/'
  //   }
  // }
})

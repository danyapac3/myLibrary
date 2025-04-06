import path from "path";
const pathSrc = path.resolve(__dirname, "./src");


export default {
  build: {
    outDir: '../dist',
    emptyOutDir: true, // also necessary
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@use "${pathSrc}/sass/shared" as *\n`
      }
    }
  }
}
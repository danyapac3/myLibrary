import path from "path";
const pathSrc = path.resolve(__dirname, "./src");


export default {
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@use "${pathSrc}/sass/shared" as *\n`
      }
    }
  }
}
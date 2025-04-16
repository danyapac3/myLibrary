import path from "path";
const pathSrc = path.resolve(__dirname, "./src");


export default {
  base: '',
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@use "${pathSrc}/sass/shared" as *\n`
      }
    }
  },
  resolve: {
    alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
}

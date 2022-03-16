module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        logLevel: "debug",
        // onProxyReq: function (request) {
        //   request.setHeader("origin", "http://localhost:8080");
        // }
      },
    },
  }
}
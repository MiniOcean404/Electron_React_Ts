const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const dev = process.env.NODE_ENV !== "development";

const devProxy = {
  "/api": {
    target: "http://127.0.0.1:7001", // 端口自己配置合适的
    pathRewrite: {
      "^/api": "/",
    },
    changeOrigin: true,
    logger: console,
    on: {
      proxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader("x-added", "foobar");
      },
      proxyRes: (proxyRes, req, res) => {
        proxyRes.headers["x-added"] = "foobar";
        delete proxyRes.headers["x-removed"];
      },
      error: (err, req, res) => {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("代理错误");
      },
    },
  },
};

const port = parseInt(process.env.PORT, 10) || 3000;

const server = express();
if (dev && devProxy) {
  Object.keys(devProxy).forEach((context) =>
    server.use(createProxyMiddleware(context, devProxy[context]))
  );
}

server.all("*", (req, res) => {});

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> 代理启动在 http://127.0.0.1:${port}`);
});

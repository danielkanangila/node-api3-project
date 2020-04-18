const http = require("http");
const app = require("./index");
const env = process.env;

const server = http.createServer(app);

server.listen(env.PORT, () => {
  console.log(`Application listen on ${env.HOST}:${env.PORT}`);
});

const http = require("http");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    fs.readFile("./index.html", (err, data) => {
      if (err) {
        res
          .writeHead(200, { "Content-Type": "text/html" })
          .end("File is Empty");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" }).end(data);
      }
    });
  } else if (req.method === "GET" && req.url === "/json") {
    res.end(
      JSON.stringify({
        data: {
          slideshow: {
            author: "Yours Truly",
            date: "date of publication",
            slides: [
              {
                title: "Wake up to WonderWidgets!",
                type: "all",
              },
              {
                items: [
                  "Why <em>WonderWidgets</em> are great",
                  "Who <em>buys</em> WonderWidgets",
                ],
                title: "Overview",
                type: "all",
              },
            ],
            title: "Sample Slide Show",
          },
        },
      })
    );
  } else if (req.method === "GET" && req.url === "/uuid") {
    res.end(JSON.stringify({ uuid: uuidv4() }));
  } else if (req.method === "GET" && req.url.match("/status")) {
    let StatusCode = +req.url.slice(8);
    req.url === "status/100"
      ? res.writeHead(100, { "Content-Type": "text/plain" }) && res.end("100")
      : req.url === "/status/200"
      ? res.writeHead(200, { "Content-Type": "text/plain" }) && res.end("200")
      : req.url === "/status/300"
      ? res.writeHead(300, { "Content-Type": "text/plain" }) && res.end("300")
      : req.url === "/status/400"
      ? res.writeHead(400, { "Content-Type": "text/plain" }) && res.end("400")
      : req.url === "status/500"
      ? res.writeHead(500, { "Content-Type": "text/plain" }) && res.end("500")
      : res.end(`${StatusCode} ${http.STATUS_CODES[StatusCode]}`);
  } else if (req.method === "GET" && req.url.match("/delay")) {
    let delayTime = +req.url.slice(7);
    setTimeout(() => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`response successful with the delay of ${delayTime} seconds`);
    }, delayTime * 1000);
  }
});
server.listen(8080, () => {
  console.log("port 8080");
});

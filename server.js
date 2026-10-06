const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = Number(process.env.PORT || 8080);
const ROOT = process.cwd();

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8"
};

const server = http.createServer((req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "127.0.0.1"}`);
    let pathname = decodeURIComponent(url.pathname);

    if (pathname === "/") pathname = "/index.html";

    // Prevent path traversal outside the site directory.
    const filePath = path.resolve(ROOT, "." + pathname);
    if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }

    fs.stat(filePath, (err, stat) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("Not Found");
      }

      if (stat.isDirectory()) {
        const indexFile = path.join(filePath, "index.html");
        return fs.stat(indexFile, (indexErr) => {
          if (indexErr) {
            res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
            return res.end("Not Found");
          }
          fs.createReadStream(indexFile).pipe(
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
          );
        });
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME[ext] || "application/octet-stream";
      res.writeHead(200, {
        "Content-Type": contentType,
        "Cache-Control": "no-cache"
      });
      fs.createReadStream(filePath).pipe(res);
    });
  } catch {
    res.writeHead(400);
    res.end("Bad Request");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`slash: http://127.0.0.1:${PORT}/`);
});

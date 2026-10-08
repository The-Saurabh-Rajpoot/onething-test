const http = require("http");

const PORT = process.env.PORT || 4000;

const users = [
  { id: 1, name: "Saurabh" },
  { id: 2, name: "Alex" },
];

const send = (res, status, data) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data) + "\n");
};

const server = http.createServer((req, res) => {
  if (req.method !== "GET") return send(res, 405, { error: "Method not allowed" });

  if (req.url === "/api/users") return send(res, 200, users);

  const match = req.url.match(/^\/api\/users\/(\d+)$/);
  if (match) {
    const user = users.find((u) => u.id === Number(match[1]));
    return user ? send(res, 200, user) : send(res, 404, { error: "User not found" });
  }

  send(res, 404, { error: "Route not found" });
});

server.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});

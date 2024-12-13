import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("./data/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get("/stats", (req, res) => {
  const { _groupby } = req.query;
  fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((users) => {
      const groupedResult = users.reduce((acc, user) => {
        const xAxisKey = user[_groupby];
        acc[xAxisKey] ??= { label: xAxisKey, value: 0 };
        acc[xAxisKey].value += 1;
        return acc;
      }, {});
      res.jsonp(Object.values(groupedResult));
    });
});

server.use(jsonServer.bodyParser);

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

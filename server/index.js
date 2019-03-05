const express = require("express");
const app = express();
const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({
  host: process.env.ES_HOST,
  log: "trace"
});
const EPISODE_TYPE = "slashfilmcast";

app.use(express.static("build"));
app.use(express.json());
app.use((req, res, next) => {
  res.reply = async fn => {
    try {
      const result = await fn();
      res.send({ result });
    } catch (error) {
      res.status(400).send({ error: { message: error.message } });
    }
  };
  next();
});

app.get("/api/info", (req, res) => res.reply(async () => await client.info()));

app.get("/api/mapping/:index", (req, res) =>
  res.reply(
    async () =>
      await client.indices.getMapping({
        index: req.params.index
      })
  )
);

app.post("/api/episodes", (req, res) =>
  res.reply(
    async () =>
      await client.create({
        index: "episodes",
        type: EPISODE_TYPE,
        id: req.body.id,
        body: req.body
      })
  )
);

app.put("/api/episodes/:id", (req, res) =>
  res.reply(
    async () =>
      await client.index({
        index: "episodes",
        type: EPISODE_TYPE,
        id: req.params.id,
        body: req.body
      })
  )
);

app.get("/api/episodes/:id", (req, res) =>
  res.reply(
    async () =>
      await client.get({
        index: "episodes",
        type: EPISODE_TYPE,
        id: req.params.id
      })
  )
);

app.get("/api/search", (req, res) =>
  res.reply(
    async () =>
      await client.search({
        index: "episodes",
        q: req.query.q
      })
  )
);

app.listen("4000");

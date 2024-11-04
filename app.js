const express = require("express");

const cors = require("cors");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const path = require("path");

const databasePath = path.join(__dirname, "cricket.db");

const app = express();

app.use(express.json());
let db = null;

app.use(cors());

const initializer = async () => {
  try {
    db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    app.listen(3000);
  } catch (error) {
    console.log(`DB error : ${error}`);
    process.exit(1);
  }
};

initializer();

app.get("/", async (request, response) => {
  const query = `select * from home;`;
  const one = await db.all(query);
  response.send(one);
});

module.exports = app;

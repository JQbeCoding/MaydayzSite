const { Client } = require("pg");

exports.handler = async function (event, context) {
  const client = new Client({
    host: "your-database-host",
    database: "your-database-name",
    user: "your-database-user",
    password: "your-database-password",
    port: 5432,
  });

  await client.connect();

  const res = await client.query("SELECT * FROM your_table");
  await client.end();

  return {
    statusCode: 200,
    body: JSON.stringify(res.rows),
  };
};

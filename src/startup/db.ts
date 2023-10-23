import knex from "knex";

const db = knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "mysql",
  },
  useNullAsDefault: true
  
});

db.raw('SELECT 1+1 AS result')
  .then(() => {
    console.log('connected to db');
  })
  .catch((error) => {
    console.error('cannot connect to db', error);
  });


export default db
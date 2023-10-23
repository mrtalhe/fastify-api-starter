import knex from './../../startup/db';

const createUserInput = knex.schema.createTableIfNotExists('users', function (table) {
  table.increments('id').primary();
  table.string('name').notNullable();
  table.string('email').notNullable().unique();
  table.string('password').notNullable();
}).then(function() {
  console.log('Table "users" created.');
}).catch(function(error) {
  console.error('Error creating table:', error);
});

export default createUserInput;
import knex from "knex";
export async function createUser(input: { name: string, email: string, password: string }) {
    const user = await knex("users").insert({
      name: input.name,
      email: input.email,
      password: input.password,
    });
    return user;
  }
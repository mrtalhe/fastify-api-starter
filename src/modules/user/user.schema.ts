import { Static, Type } from "@sinclair/typebox";

export const createUserSchema = Type.Object({
  name: Type.String({ maxLength: 30 }),
  email: Type.String({ maximum: 50, minimum: 18, format: "email" }),
  password: Type.String({ minLength: 8, maxLength: 20 }),
});

export type CreateUserInput = Static<typeof createUserSchema>;

import { Static, Type } from "@sinclair/typebox";

export const registerSchema = Type.Object({
  name: Type.String({ maxLength: 30 }),
  email: Type.String({ maximum: 50, minimum: 18, format: "email" }),
  password: Type.String({ minLength: 8, maxLength: 20 }),
});
export const loginSchema = Type.Object({
  email: Type.String({ maximum: 50, minimum: 18, format: "email" }),
  password: Type.String({ minLength: 8, maxLength: 20 }),
});
export const forgetpasswordSchema = Type.Object({
  email: Type.String({ maximum: 50, minimum: 18, format: "email" }),
});
export const resetpasswordSchema = Type.Object({
  password: Type.String({ minLength: 8, maxLength: 20 }),
});

export type RegisterInput = Static<typeof registerSchema>;

export type LoginInput = Static<typeof loginSchema>;

export type ForgetPasswordInput = Static<typeof forgetpasswordSchema>;

export type ResetPasswordInput = Static<typeof resetpasswordSchema>;

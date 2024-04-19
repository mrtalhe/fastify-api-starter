import { Static, Type } from "@sinclair/typebox";
import envSchema from "env-schema";

const schema = Type.Strict(
  Type.Object({
    PORT: Type.Number({ default: 3000 }),
    JWT_KEY: Type.String({ default: "fwevregfgxfbcbertgregfhgdfssdfgsfdg" }),
    development: Type.Boolean({ default: false }),
  })
);

export type Env = Static<typeof schema>;

export const appConfig = (): Env =>
  envSchema<Env>({
    dotenv: true,
    schema,
  });

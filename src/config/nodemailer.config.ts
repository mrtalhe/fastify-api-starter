import {Static, Type} from '@sinclair/typebox'
import envSchema from 'env-schema'

const schema = Type.Strict(
	Type.Object({
			host: Type.String({default: "smtp.gmail.com"}),
			user: Type.String({default: ""}),
			pass: Type.String({default: ""})
	}),
)

export type NodeMailerEnv = Static<typeof schema>


export const nodeMailerConfig = (): NodeMailerEnv => envSchema<NodeMailerEnv>({
	dotenv: true,
	schema,
})
import "dotenv/config";

import Fastify from 'fastify'
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import z from "zod";

const app = Fastify({
  logger: true
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// app.get('/', async function handler () {
//   return { hello: 'world' }
// })

app.withTypeProvider<ZodTypeProvider>().route({
  method: 'GET',
  url: '/',
    schema: {
        description: "hello world",
        tags: ["hello world"],
        response: {
            200:z.object({
                message: z.string()
            }),
        },
  },
  handler: () => {
    return {
        message: ""
    }
  }
});

try {
  await app.listen({ port: Number(process.env.PORT) })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
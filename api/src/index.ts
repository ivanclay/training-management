import "dotenv/config";

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import Fastify from 'fastify'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import z from "zod";

const app = Fastify({
  logger: true
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Training Management API',
      description: 'Sample backend service',
      version: '1.0.0',
    },
    servers: [
        {
            description: "Local",
            url: "http://localhost:3000"
        }
    ],
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
});
// app.get('/', async function handler () {
//   return { hello: 'world' }
// })

app.withTypeProvider<ZodTypeProvider>().route({
  method: 'GET',
  url: '/',
    schema: {
        description: "hello world 1",
        tags: ["hello world 2"],
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
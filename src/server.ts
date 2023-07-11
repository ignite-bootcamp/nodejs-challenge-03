import fastify from "fastify";

const PORT = 3333;
export const app = fastify();

app.get("/", (request, reply) => {
  return reply.send({ message: "hello" });
});

app
  .listen({
    host: "0.0.0.0",
    port: PORT,
  })
  .then(() => {
    console.log(`Server is running ${PORT}`);
  })
  .catch((error) => {
    if (error instanceof Error) {
      console.error(error.message);
      process.exit(1);
    }
  });

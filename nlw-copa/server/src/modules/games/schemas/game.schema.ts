import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const findGameByPoolSchema = z.object({
  id: z
    .string({
      required_error: "id is required",
      invalid_type_error: "id must be a string",
    }).min(1, { message: "id is required" })
});

export type FindGameByPoolInput = z.infer<typeof findGameByPoolSchema>;

export const { schemas: gameSchemas, $ref } = buildJsonSchemas({
  findGameByPoolSchema,
}, {
  $id: 'game-schema',
});

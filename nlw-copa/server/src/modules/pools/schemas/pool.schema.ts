import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const createPoolSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title must be a string",
    }).min(1, { message: "title is required" })
});

const createPoolResponseSchema = z.object({
  code: z.string(),
});

export type CreatePoolInput = z.infer<typeof createPoolSchema>;

const joinPoolSchema = z.object({
  code: z
    .string({
      required_error: "code is required",
      invalid_type_error: "code must be a string",
    }).min(1, { message: "code is required" })
});

export type JoinPoolInput = z.infer<typeof joinPoolSchema>;

const findPoolSchema = z.object({
  id: z
    .string({
      required_error: "id is required",
      invalid_type_error: "id must be a string",
    }).min(1, { message: "id is required" })
});

export type FindPoolInput = z.infer<typeof findPoolSchema>;

export const { schemas: poolSchemas, $ref } = buildJsonSchemas({
  createPoolResponseSchema,
  createPoolSchema,
  joinPoolSchema,
  findPoolSchema,
}, {
  $id: 'pool-schema',
});

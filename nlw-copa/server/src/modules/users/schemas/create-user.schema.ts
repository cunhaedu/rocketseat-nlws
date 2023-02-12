import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const createUserSchema = z.object({
  access_token: z
    .string({
      required_error: "access_token is required",
      invalid_type_error: "access_token must be a string",
    }).min(1, { message: "access_token is required" })
});

const createUserResponseSchema = z.object({
  code: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserResponseSchema,
  createUserSchema,
}, {
  $id: 'create-user-schema',
});

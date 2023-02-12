import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const createGuessParamsSchema = z.object({
  gameId: z
    .string({
      required_error: "gameId is required",
      invalid_type_error: "gameId must be a string",
    }).min(1, { message: "gameId is required" }),
    poolId: z
    .string({
      required_error: "poolId is required",
      invalid_type_error: "poolId must be a string",
    }).min(1, { message: "poolId is required" }),
});

const createGuessBodySchema = z.object({
  firstTeamPoints: z
    .number({
      required_error: "firstTeamPoints is required",
      invalid_type_error: "firstTeamPoints must be a number",
    }).min(0, { message: 'firstTeamPoints should be greater or equal to 0' }),
  secondTeamPoints: z
    .number({
      required_error: "secondTeamPoints is required",
      invalid_type_error: "secondTeamPoints must be a number",
    }).min(0, { message: 'secondTeamPoints should be greater or equal to 0' }),
});

export type CreateGuessParamsInput = z.infer<typeof createGuessParamsSchema>;
export type CreateGuessBodyInput = z.infer<typeof createGuessBodySchema>;

export const { schemas: guessSchemas, $ref } = buildJsonSchemas({
  createGuessParamsSchema,
  createGuessBodySchema,
}, {
  $id: 'guess-schema',
});

import { z } from "zod"

// Нужно создать схему для таблицы Order

const ClientSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  inn: z.string().min(1),
  orders: z.array(z.object({}))
})

const ContragentSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  orders: z.array(z.object({}))
})

const AgentSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  orders: z.array(z.object({}))
})

const CountrySchema = z.object({
  id: z.number().min(1),
  name: z.string().min(1),
  code: z.string().min(1),
  full_name: z.string().min(1),
  orders: z.array(z.object({}))
})



export { ClientSchema, ContragentSchema, AgentSchema, CountrySchema,  }
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
  id: z.number(),
  name: z.string().min(1),
  code: z.string().min(1),
  full_name: z.string().min(1),
  orders: z.array(z.object({}))
})

const ManagerSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  tel: z.string(),
  date: z.string().date(),
  orders: z.array(z.object({})),
  review_table: z.array(z.object({})),
})

const SubagentSchema = z.object({
  
})

export { ClientSchema, ContragentSchema, AgentSchema, CountrySchema,  }
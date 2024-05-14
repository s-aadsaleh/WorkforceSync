import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const empSchema = z.object({
  id: z.string(),
  EmpID: z.string(),
  EmpName: z.string(),
  JoinDate: z.date(),
  Status: z.string(),
  EmpPNumber: z.string(),
  EmpEmail: z.string(),
  label: z.string().optional(),
});


export type Employee = z.infer<typeof empSchema>
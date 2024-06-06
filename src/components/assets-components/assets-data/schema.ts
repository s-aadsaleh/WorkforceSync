import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const assetsSchema = z.object({
  id: z.string(),
  AssetsID: z.string(),
  AssetsName: z.string(),
  AssetsStatus: z.string(),
  AssetsType: z.string(),
  AssetsRemarks: z.string(),
  AssetsValue: z.string(),
  AllocatedTo: z.string(),
  label: z.string().optional(),
})


export type Assets = z.infer<typeof assetsSchema>
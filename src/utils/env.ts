import { z } from 'zod'
import * as dotenv from 'dotenv'

dotenv.config()

const envSchema = z.object({
  EMAIL: z.string().email().nonempty(),
  PASSWORD: z.string().nonempty(),
  SUBREDDITS: z.string().nonempty(),
  CRON_SCHEDULE: z.string().nonempty(),
})

export const env = envSchema.parse(process.env)

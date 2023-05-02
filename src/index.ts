import schedule from 'node-schedule'
import { env } from './utils/env'
import { logger } from './utils/logger'
import { Mailer } from './utils/mailer'
import { getSubredditsTopPosts } from './utils/reddit'

const start = async () => {
  logger.info('Starting job')
  const mailer = new Mailer({
    email: env.EMAIL as string,
    password: env.PASSWORD as string,
  })

  const postsFromSubreddits = await getSubredditsTopPosts({
    subredditNames: (env.SUBREDDITS as string).split(','),
  })

  const mailerResponse = await mailer.sendMail(postsFromSubreddits)

  logger.info({
    success: mailerResponse.accepted,
    rejected: mailerResponse.rejected,
  })
}

schedule.scheduleJob(env.CRON_SCHEDULE, start)

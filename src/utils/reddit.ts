import axios from 'axios'
import { RedditPosts } from '../types/reddit'

export const getSubredditTopPosts = async ({
  subredditName,
  timeframe,
  limit,
}: {
  subredditName: string
  timeframe?: string
  limit?: number
}) => {
  const {
    data: { data: posts },
  } = await axios.get<RedditPosts>(
    `https://www.reddit.com/r/${subredditName}/top.json?sort=top&t=${
      timeframe ?? 'day'
    }&limit=${limit ?? 10}`
  )
  return posts
}

export const getSubredditsTopPosts = async ({
  subredditNames,
  timeframe,
  limit,
}: {
  subredditNames: string[]
  timeframe?: string
  limit?: number
}) => {
  const posts = await Promise.all(
    subredditNames.map(async (subredditName) => {
      const posts = await getSubredditTopPosts({
        subredditName,
        timeframe,
        limit,
      })
      return {
        name: subredditName,
        posts: posts.children,
      }
    })
  )
  return posts
}

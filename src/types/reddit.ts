type Hint = 'image' | 'link' | 'hosted:video'

export interface RedditPost {
  data: {
    subreddit: string
    title: string
    ups: number
    thumbnail: string
    post_hint: Hint
    permalink: string
  }
}

export interface RedditPosts {
  data: {
    children: RedditPost
  }
}

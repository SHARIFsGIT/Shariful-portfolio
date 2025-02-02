export interface IUser {
  name: string
  username: string
  profile_image: {
    small: string
    medium: string
    large: string
  }
}

export interface IPhoto {
  id: string
  created_at: string
  alt_description: string | null
  description: string | null
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
  user: IUser
  likes: number
  liked_by_user: boolean
}

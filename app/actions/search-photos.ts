const clientId = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY

export async function searchPhotos(query: string) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=40&client_id=${clientId}`
    )
    return response.json()
  } catch (error) {
    console.error('Error searching photos:', error)
    throw error
  }
}

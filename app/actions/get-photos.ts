const clientId = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY

export async function getPhotos() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos?per_page=40&client_id=${clientId}`
    )
    return response.json()
  } catch (error) {
    console.error('Error fetching photos:', error)
    throw error
  }
}
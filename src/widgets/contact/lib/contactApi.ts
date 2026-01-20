export interface SubmitContactFormRequest {
  name: string
  email: string
  company?: string
  projectType: string
  message: string
  locale: string
}

export interface SubmitContactFormResponse {
  success: boolean
  message: string
}

/**
 * Submit contact form data to the backend API
 * @param data - The form data to submit
 * @returns Promise with the API response
 */
export async function submitContactForm(
  data: SubmitContactFormRequest
): Promise<SubmitContactFormResponse> {
  try {
    // Set 30-second timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      // Handle server errors (4xx, 5xx)
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Server error: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    // Handle network errors
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.')
      }
      throw error
    }
    throw new Error('An unexpected error occurred. Please try again.')
  }
}

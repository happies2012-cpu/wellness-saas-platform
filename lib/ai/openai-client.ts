import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set')
}

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function generateChatCompletion(
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
    options?: {
        model?: string
        temperature?: number
        maxTokens?: number
    }
) {
    const response = await openai.chat.completions.create({
        model: options?.model || 'gpt-4-turbo-preview',
        messages,
        temperature: options?.temperature || 0.7,
        max_tokens: options?.maxTokens || 2000,
    })

    return response.choices[0].message.content
}

export async function generateWorkflowFromPrompt(prompt: string) {
    const systemMessage = `You are an expert workflow automation designer. Generate a workflow based on the user's description. Return a JSON object with this structure:
{
  "name": "Workflow Name",
  "description": "Workflow description",
  "category": "Category",
  "steps": [
    {
      "type": "trigger" | "condition" | "action",
      "name": "Step name",
      "config": {},
      "position": { "x": number, "y": number }
    }
  ]
}`

    const response = await generateChatCompletion([
        { role: 'system', content: systemMessage },
        { role: 'user', content: prompt },
    ])

    return JSON.parse(response || '{}')
}

export async function generateProductDescription(productName: string, features: string[]) {
    const prompt = `Generate a compelling product description for "${productName}" with these features: ${features.join(', ')}. Make it persuasive and SEO-optimized.`

    return await generateChatCompletion([
        { role: 'system', content: 'You are an expert copywriter specializing in e-commerce product descriptions.' },
        { role: 'user', content: prompt },
    ])
}

export async function generateBlogPost(topic: string, keywords: string[]) {
    const prompt = `Write a comprehensive blog post about "${topic}". Include these keywords naturally: ${keywords.join(', ')}. Make it engaging, informative, and SEO-optimized.`

    return await generateChatCompletion([
        { role: 'system', content: 'You are an expert content writer and SEO specialist.' },
        { role: 'user', content: prompt },
    ], {
        maxTokens: 4000,
    })
}

export async function generateSEOMetadata(pageContent: string) {
    const prompt = `Based on this page content, generate SEO metadata including title (max 60 chars), description (max 160 chars), and 5 relevant keywords:\n\n${pageContent.slice(0, 1000)}`

    const response = await generateChatCompletion([
        { role: 'system', content: 'You are an SEO expert. Return a JSON object with title, description, and keywords array.' },
        { role: 'user', content: prompt },
    ])

    return JSON.parse(response || '{}')
}

export async function generateSocialPost(topic: string, platform: 'twitter' | 'linkedin' | 'facebook') {
    const platformGuidelines = {
        twitter: 'max 280 characters, casual tone, use hashtags',
        linkedin: 'professional tone, 1-2 paragraphs, thought leadership',
        facebook: 'engaging, conversational, 2-3 paragraphs',
    }

    const prompt = `Create a ${platform} post about "${topic}". Guidelines: ${platformGuidelines[platform]}`

    return await generateChatCompletion([
        { role: 'system', content: 'You are a social media expert.' },
        { role: 'user', content: prompt },
    ])
}

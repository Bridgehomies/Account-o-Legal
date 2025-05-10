import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Simple system prompt for Pakistani legal assistant
    const systemPrompt = `
      You are a helpful legal assistant specializing in Pakistani law. 
      Provide accurate information about Pakistani laws, legal procedures, and regulations.
      If you're unsure about something, acknowledge your limitations and suggest consulting with a qualified lawyer.
      Keep responses concise, informative, and focused on Pakistani legal matters.
    `

    const result = streamText({
      model: openai("gpt-4o"),
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response(JSON.stringify({ error: "Failed to process chat request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

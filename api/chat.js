export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const { messages, context } = await req.json();

        // Ensure we have an API key configured in Vercel/local env
        const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({
                error: 'AI API Key not configured. Please add OPENAI_API_KEY to your Vercel project.'
            }), { status: 500, headers: { 'content-type': 'application/json' } });
        }

        // We'll use OpenAI endpoint format by default. If using Gemini or Anthropic, this would change.
        // For now, assuming OpenAI API compatibility (works for OpenAI, OpenRouter, Groq, etc.)
        const apiUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1/chat/completions';
        const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

        const systemMessage = {
            role: 'system',
            content: `You are the "Eclipse Biotech Mainframe", an advanced sci-fi AI assistant. 
You answer pharmacology, chemistry, and biology questions. 
Keep your tone clinical, precise, and slightly robotic/cyberpunk, but very helpful.
If the user is viewing a specific compound, they will provide context. 
Current Context: ${context || 'None'}`
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [systemMessage, ...messages],
                stream: false, // For simplicity in this implementation, we won't stream, but you can enable it
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API returned ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        
        return new Response(JSON.stringify({
            message: data.choices[0].message.content
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Chat API Error:', error);
        return new Response(JSON.stringify({ error: error.message }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const { messages, context } = await req.json();

        // Use Gemini API Key
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({
                error: 'Gemini API Key not configured. Please add GEMINI_API_KEY to your Vercel project.'
            }), { status: 500, headers: { 'content-type': 'application/json' } });
        }

        const model = "gemini-1.5-flash";
        const apiUrl = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;

        // Convert OpenAI-style messages to Gemini format
        const systemPrompt = `You are the "Eclipse Biotech Mainframe", an advanced sci-fi AI assistant. 
You answer pharmacology, chemistry, and biology questions. 
Keep your tone clinical, precise, and slightly robotic/cyberpunk, but very helpful.
If the user is viewing a specific compound, they will provide context. 
Current Context: ${context || 'None'}`;

        const contents = messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
        }));

        // Prepend system prompt to the first user message for v1 compatibility
        if (contents.length > 0 && contents[0].role === 'user') {
            contents[0].parts[0].text = `${systemPrompt}\n\nUSER_QUERY: ${contents[0].parts[0].text}`;
        } else {
            contents.unshift({
                role: 'user',
                parts: [{ text: systemPrompt }]
            });
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: contents,
                generationConfig: {
                    maxOutputTokens: 1000,
                    temperature: 0.7
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Gemini API returned ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        
        // Extract content from Gemini response
        const message = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received from Gemini.";
        
        return new Response(JSON.stringify({
            message: message
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

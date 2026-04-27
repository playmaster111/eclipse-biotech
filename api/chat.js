export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const { messages, context } = await req.json();

        // Use OpenAI API Key
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({
                error: 'OpenAI API Key not configured. Please add OPENAI_API_KEY to your Vercel project.'
            }), { status: 500, headers: { 'content-type': 'application/json' } });
        }

        const apiUrl = 'https://api.openai.com/v1/chat/completions';
        const model = 'gpt-4o-mini';

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
                max_tokens: 1000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`OpenAI API returned ${response.status}: ${errorText}`);
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

async function testLive() {
    try {
        const res = await fetch('https://eclipse-biotech.vercel.app/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [{ role: 'user', content: 'test response' }],
                context: ''
            })
        });
        const data = await res.json();
        console.log("Status:", res.status);
        console.log("Data:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Test failed:", err);
    }
}

testLive();

async function listModels() {
    const apiKey = "AIzaSyC7hipnd76IFZWlSQ86QSk66SXD2iEH1UU";
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await res.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("List failed:", err);
    }
}

listModels();

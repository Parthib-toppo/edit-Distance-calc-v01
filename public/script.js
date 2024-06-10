async function processText() {
    const inputText = document.getElementById('inputText').value;

    // Make API call to rewrite text
    const response = await fetch('/rewrite', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: inputText })
    });

    const data = await response.json();
    const rewrittenText = data.rewrittenText;
    const distance = data.distance;

    // Update the UI
    document.getElementById('rewrittenText').value = rewrittenText;
    document.getElementById('distance').innerText = distance;
}

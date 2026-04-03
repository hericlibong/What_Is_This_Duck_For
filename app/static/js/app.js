document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyze-btn');
    const outputText = document.getElementById('output-text');

    const handleAction = async (actionLabel) => {
        analyzeBtn.disabled = true;
        outputText.innerHTML = `<em>${actionLabel}...</em>`;
        
        try {
            const response = await fetch('/analyze');
            const data = await response.json();
            
            // Artificial delay for "serious" computation
            setTimeout(() => {
                outputText.innerHTML = data.message;
                analyzeBtn.disabled = false;
            }, 1000);
            
        } catch (error) {
            outputText.textContent = 'ERROR: The duck analysis has encountered an existential void.';
            analyzeBtn.disabled = false;
        }
    };

    analyzeBtn.addEventListener('click', () => handleAction('Initiating core duck scan'));

    // Global functions for the inline onclick handlers
    window.requestInterpretation = () => handleAction('Accessing deeper interpretive layers');
    window.consultReasoning = () => handleAction('Querying advanced duck logic systems');
    window.askAgain = () => handleAction('Re-consulting Gemini for secondary confirmation');
});

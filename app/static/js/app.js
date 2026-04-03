document.addEventListener('DOMContentLoaded', () => {
    const outputText = document.getElementById('output-text');
    const buttons = document.querySelectorAll('.btn-action');

    const modeLabels = {
        'analyze': 'Initiating Primary Duck Analysis',
        'deeper': 'Requesting Deeper Philosophical Interpretation',
        'ministry': 'Escalating to High-Level Ministerial Review',
        'trust': 'Initiating Full System Trust Protocols',
        'distrust': 'Scanning for Subversive Synthetic Deviations'
    };

    window.triggerMode = async (mode) => {
        // Disable all buttons during analysis
        buttons.forEach(btn => btn.disabled = true);
        
        const initialLabel = modeLabels[mode] || 'Processing';
        outputText.innerHTML = `<em style="color: #888;">${initialLabel}...</em>`;
        
        try {
            // We pass the mode to the backend (to be implemented)
            const response = await fetch(`/analyze?mode=${mode}`);
            const data = await response.json();
            
            // Artificial delay for "serious" computation
            setTimeout(() => {
                outputText.innerHTML = data.message;
                buttons.forEach(btn => btn.disabled = false);
            }, 1200);
            
        } catch (error) {
            outputText.textContent = 'SYSTEM ERROR: The duck has exceeded known interpretive boundaries.';
            buttons.forEach(btn => btn.disabled = false);
        }
    };
});

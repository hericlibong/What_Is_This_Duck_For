document.addEventListener('DOMContentLoaded', () => {
    const outputText = document.getElementById('output-text');
    const reportStatus = document.getElementById('report-status');
    const reportConfidence = document.getElementById('report-confidence');
    const buttons = document.querySelectorAll('.btn-action');

    const modeLabels = {
        'analyze': 'Initiating Primary Duck Analysis',
        'deeper': 'Requesting Deeper Philosophical Interpretation',
        'ministry': 'Escalating to High-Level Ministerial Review',
        'trust': 'Initiating Full System Trust Protocols',
        'distrust': 'Scanning for Subversive Synthetic Deviations'
    };

    const formatReport = (data) => {
        return `
            <div class="report-content">
                <p><strong>HYPOTHESIS:</strong> ${data.hypothesis}</p>
                <p><strong>CLASSIFICATION:</strong> ${data.classification}</p>
                <p><strong>THREAT LEVEL:</strong> <span class="threat-${data.threat_level.toLowerCase()}">${data.threat_level}</span></p>
                <p><strong>CONFIDENCE:</strong> ${data.confidence}%</p>
                <hr style="border: 1px dashed #ccc; margin: 20px 0;">
                <p><strong>CONCLUSION:</strong> ${data.conclusion}</p>
            </div>
        `;
    };

    window.triggerMode = async (mode) => {
        // Disable all buttons during analysis
        buttons.forEach(btn => btn.disabled = true);
        
        const initialLabel = modeLabels[mode] || 'Processing';
        outputText.innerHTML = `<em style="color: #888;">${initialLabel}...</em>`;
        reportStatus.textContent = 'SCANNING...';
        reportConfidence.textContent = 'CALCULATING...';
        
        try {
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mode: mode }),
            });
            
            if (!response.ok) {
                throw new Error('Ministerial Communication Failure');
            }

            const data = await response.json();
            
            // Artificial delay for "serious" computation drama
            setTimeout(() => {
                outputText.innerHTML = formatReport(data);
                reportStatus.textContent = 'AUTHORIZED';
                reportConfidence.textContent = `${data.confidence}%`;
                buttons.forEach(btn => btn.disabled = false);
            }, 1000);
            
        } catch (error) {
            outputText.textContent = 'SYSTEM ERROR: The duck has exceeded known interpretive boundaries or API key is missing.';
            reportStatus.textContent = 'ERROR';
            reportConfidence.textContent = 'N/A';
            buttons.forEach(btn => btn.disabled = false);
        }
    };
});

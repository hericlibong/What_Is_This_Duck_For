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

    /**
     * Progressively types text into an element.
     * @param {HTMLElement} element - The target element to append words to.
     * @param {string} text - The text content to type.
     * @param {number} speed - Base delay between words in ms.
     */
    const typeWords = async (element, text, speed = 100) => {
        if (!text) return;
        const words = text.split(' ');
        for (let i = 0; i < words.length; i++) {
            element.textContent += words[i] + (i === words.length - 1 ? '' : ' ');
            // Auto-scroll the report body to keep the newest text visible
            outputText.scrollTop = outputText.scrollHeight;
            // Visible delay between words (90-120ms range as requested)
            await new Promise(r => setTimeout(r, speed + Math.random() * 30));
        }
    };

    /**
     * Appends and reveals a report line.
     */
    const revealLine = async (container, label, content, className = "") => {
        const p = document.createElement('p');
        p.style.margin = '10px 0';
        p.innerHTML = `<strong>${label}:</strong> `;
        const span = document.createElement('span');
        if (className) span.className = className;
        p.appendChild(span);
        container.appendChild(p);
        
        // Wait for words to type out
        await typeWords(span, content);
        // Pause between report sections (400-700ms range as requested)
        await new Promise(r => setTimeout(r, 600)); 
    };

    window.triggerMode = async (mode) => {
        // Find the specific button that was clicked
        const clickedBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick')?.includes(mode));

        // Disable all buttons and update active state
        buttons.forEach(btn => {
            btn.disabled = true;
            btn.classList.remove('active-mode');
        });
        
        if (clickedBtn) {
            clickedBtn.classList.add('active-mode');
        }
        
        // Reset panel and scroll to top for new analysis
        outputText.innerHTML = '';
        outputText.scrollTop = 0;
        
        const initialLabel = modeLabels[mode] || 'Processing';
        const loadingPrompt = document.createElement('em');
        loadingPrompt.style.color = '#888';
        loadingPrompt.textContent = `${initialLabel}...`;
        outputText.appendChild(loadingPrompt);
        
        reportStatus.textContent = 'UNDER REVIEW';
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
            
            // Clear the loading prompt and ensure scroll is at top before reveal
            outputText.innerHTML = '';
            outputText.scrollTop = 0;
            
            const reportContent = document.createElement('div');
            reportContent.className = 'report-content';
            outputText.appendChild(reportContent);

            // Progressive Reveal of the dossier sections
            await revealLine(reportContent, 'HYPOTHESIS', data.hypothesis);
            await revealLine(reportContent, 'CLASSIFICATION', data.classification);
            await revealLine(reportContent, 'THREAT LEVEL', data.threat_level, `threat-${data.threat_level.toLowerCase()}`);
            
            // Confidence metadata updates after its specific line is typed
            await revealLine(reportContent, 'CONFIDENCE', `${data.confidence}%`);
            reportConfidence.textContent = `${data.confidence}%`;

            const hr = document.createElement('hr');
            hr.style.cssText = 'border: 1px dashed #ccc; margin: 20px 0;';
            reportContent.appendChild(hr);
            await new Promise(r => setTimeout(r, 500));

            await revealLine(reportContent, 'CONCLUSION', data.conclusion);

            // Finalize ministerial authorization
            reportStatus.textContent = 'AUTHORIZED';
            buttons.forEach(btn => btn.disabled = false);
            
        } catch (error) {
            outputText.innerHTML = `<p style="color: var(--distrust-color);">SYSTEM ERROR: The duck has exceeded known interpretive boundaries or API key is missing.</p>`;
            reportStatus.textContent = 'ERROR';
            reportConfidence.textContent = 'N/A';
            buttons.forEach(btn => btn.disabled = false);
        }
    };
});

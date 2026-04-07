document.addEventListener('DOMContentLoaded', () => {
    const outputText = document.getElementById('output-text');
    const reportStatus = document.getElementById('report-status');
    const reportConfidence = document.getElementById('report-confidence');
    const buttons = document.querySelectorAll('.btn-action');
    const resetBtn = document.getElementById('btn-reset');

    const INITIAL_TEXT = 'No official conclusion has been reached yet. Press "Analyze the Duck" to begin the inquiry.';

    const modeLabels = {
        'analyze': 'Initiating Primary Duck Analysis',
        'deeper': 'Requesting Deeper Philosophical Interpretation',
        'ministry': 'Escalating to High-Level Ministerial Review',
        'trust': 'Initiating Full System Trust Protocols',
        'distrust': 'Scanning for Subversive Synthetic Deviations'
    };

    /**
     * Progressively types text into an element.
     */
    const typeWords = async (element, text, speed = 100) => {
        if (!text) return;
        const words = text.split(' ');
        for (let i = 0; i < words.length; i++) {
            element.textContent += words[i] + (i === words.length - 1 ? '' : ' ');
            outputText.scrollTop = outputText.scrollHeight;
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
        
        await typeWords(span, content);
        await new Promise(r => setTimeout(r, 600)); 
    };

    /**
     * Resets the interface to a clean, ready state.
     */
    window.openNewCase = () => {
        // Clear panel
        outputText.innerHTML = INITIAL_TEXT;
        outputText.scrollTop = 0;
        
        // Reset metadata
        reportStatus.textContent = 'READY';
        reportConfidence.textContent = '--';
        
        // Hide reset button again until next run
        if (resetBtn) {
            resetBtn.style.display = 'none';
            resetBtn.disabled = false;
        }

        // Clear active states and enable buttons
        buttons.forEach(btn => {
            btn.classList.remove('active-mode');
            btn.disabled = false;
        });
    };

    window.triggerMode = async (mode) => {
        const clickedBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick')?.includes(mode));

        // Lock interface and show reset button as context action
        buttons.forEach(btn => {
            btn.disabled = true;
            btn.classList.remove('active-mode');
        });
        
        if (resetBtn) {
            resetBtn.style.display = 'inline-block';
            resetBtn.disabled = true;
        }
        
        if (clickedBtn) clickedBtn.classList.add('active-mode');
        
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mode: mode }),
            });
            
            if (response.status === 429) {
                throw new Error('MINISTERIAL QUOTA EXCEEDED: Too many inquiries. Please wait for the clerks to clear the backlog.');
            }
            
            if (!response.ok) {
                throw new Error('MINISTERIAL COMMUNICATION FAILURE: The duck analysis has been interrupted by an administrative error.');
            }

            const data = await response.json();
            
            outputText.innerHTML = '';
            outputText.scrollTop = 0;
            
            const reportContent = document.createElement('div');
            reportContent.className = 'report-content';
            outputText.appendChild(reportContent);

            await revealLine(reportContent, 'HYPOTHESIS', data.hypothesis);
            await revealLine(reportContent, 'CLASSIFICATION', data.classification);
            await revealLine(reportContent, 'THREAT LEVEL', data.threat_level, `threat-${data.threat_level.toLowerCase()}`);
            
            await revealLine(reportContent, 'CONFIDENCE', `${data.confidence}%`);
            reportConfidence.textContent = `${data.confidence}%`;

            const hr = document.createElement('hr');
            hr.style.cssText = 'border: 1px dashed #ccc; margin: 20px 0;';
            reportContent.appendChild(hr);
            await new Promise(r => setTimeout(r, 500));

            await revealLine(reportContent, 'CONCLUSION', data.conclusion);

            reportStatus.textContent = 'AUTHORIZED';
        } catch (error) {
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = error.message.includes('QUOTA') 
                ? 'MINISTERIAL OVERLOAD. The department is currently at capacity. Please open a new case and try again shortly.'
                : 'COMMUNICATION BREAKDOWN. The analysis was terminated prematurely. Access to the duck is temporarily restricted.';
            
            outputText.innerHTML = '';
            outputText.appendChild(errorMsg);
            reportStatus.textContent = 'TERMINATED';
            reportConfidence.textContent = 'ERR-0';
        } finally {
            // Re-enable everything so user can recover via OPEN NEW CASE
            buttons.forEach(btn => btn.disabled = false);
            if (resetBtn) resetBtn.disabled = false;
        }
    };
});

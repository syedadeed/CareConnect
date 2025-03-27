/**
 * CareConnect API Test Helper
 * This script helps diagnose connection issues with the backend API
 */

// Create the UI for the debugging tool
function createDebugUI() {
    const debugDiv = document.createElement('div');
    debugDiv.id = 'api-debug-panel';
    debugDiv.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #f8f9fa;
        border-top: 2px solid #dee2e6;
        padding: 10px 20px;
        font-family: monospace;
        max-height: 30vh;
        overflow-y: auto;
        z-index: 9999;
    `;

    const header = document.createElement('div');
    header.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <h3 style="margin: 0;">API Debug Console</h3>
            <div>
                <button id="test-api-btn" style="margin-right: 10px;">Test API Connection</button>
                <button id="clear-log-btn">Clear Log</button>
                <button id="toggle-debug-btn" style="margin-left: 10px;">Hide</button>
            </div>
        </div>
        <div id="api-server-url">API URL: <span></span></div>
    `;

    const logDiv = document.createElement('div');
    logDiv.id = 'api-debug-log';
    logDiv.style.cssText = `
        background: #343a40;
        color: #fff;
        padding: 10px;
        border-radius: 4px;
        margin-top: 10px;
        height: 20vh;
        overflow-y: auto;
    `;

    debugDiv.appendChild(header);
    debugDiv.appendChild(logDiv);
    document.body.appendChild(debugDiv);

    // Add event listeners
    document.getElementById('toggle-debug-btn').addEventListener('click', function() {
        const panel = document.getElementById('api-debug-panel');
        const log = document.getElementById('api-debug-log');
        const btn = document.getElementById('toggle-debug-btn');
        
        if (log.style.display === 'none') {
            log.style.display = 'block';
            panel.style.maxHeight = '30vh';
            btn.textContent = 'Hide';
        } else {
            log.style.display = 'none';
            panel.style.maxHeight = 'auto';
            btn.textContent = 'Show';
        }
    });

    document.getElementById('clear-log-btn').addEventListener('click', function() {
        document.getElementById('api-debug-log').innerHTML = '';
    });

    document.getElementById('test-api-btn').addEventListener('click', testAPIConnection);

    // Display the current API URL
    try {
        const apiURLElement = document.querySelector('#api-server-url span');
        if (apiURLElement && typeof API_URL !== 'undefined') {
            apiURLElement.textContent = API_URL;
        } else {
            apiURLElement.textContent = 'Not defined (API_URL global variable not found)';
        }
    } catch (e) {
        console.error('Error displaying API URL:', e);
    }
}

// Log messages to the debug console
function debugLog(message, type = 'info') {
    const logDiv = document.getElementById('api-debug-log');
    if (!logDiv) return;

    const entry = document.createElement('div');
    const timestamp = new Date().toLocaleTimeString();
    const color = type === 'error' ? '#f77' : type === 'success' ? '#7f7' : '#fff';
    
    entry.style.color = color;
    entry.innerHTML = `[${timestamp}] ${message}`;
    logDiv.appendChild(entry);
    logDiv.scrollTop = logDiv.scrollHeight;
}

// Test connection to the API server
async function testAPIConnection() {
    try {
        debugLog('Testing API connection...');
        
        // Try to determine API URL
        let apiUrl;
        try {
            apiUrl = typeof API_URL !== 'undefined' ? API_URL : 'http://127.0.0.1:3000/api';
        } catch (e) {
            apiUrl = 'http://127.0.0.1:3000/api';
        }
        
        // Make a simple OPTIONS request to check connectivity
        debugLog(`Sending OPTIONS request to ${apiUrl}/auth/register`);
        
        const response = await fetch(`${apiUrl}/auth/register`, {
            method: 'OPTIONS',
            mode: 'cors'
        });
        
        debugLog(`Response received: ${response.status} ${response.statusText}`, 'success');
        
        // Check CORS headers
        const corsHeader = response.headers.get('Access-Control-Allow-Origin');
        if (corsHeader) {
            debugLog(`CORS is configured: Access-Control-Allow-Origin: ${corsHeader}`, 'success');
        } else {
            debugLog('Warning: No CORS headers detected in the response', 'error');
        }
        
        debugLog('Connection test completed successfully', 'success');
    } catch (error) {
        debugLog(`Connection test failed: ${error.message}`, 'error');
        debugLog(`Error details: ${error.stack || 'No stack trace available'}`, 'error');
        
        // Additional helpful messages based on error
        if (error.message.includes('Failed to fetch')) {
            debugLog('This likely means the server is not running or is unreachable.', 'error');
            debugLog('Please check that your Node.js server is running at port 3000.', 'error');
        } else if (error.message.includes('CORS')) {
            debugLog('This is a CORS (Cross-Origin Resource Sharing) issue.', 'error');
            debugLog('Make sure your server has CORS enabled for this origin.', 'error');
        }
    }
}

// Add a global error handler
window.addEventListener('error', function(event) {
    debugLog(`Global error: ${event.message} at ${event.filename}:${event.lineno}`, 'error');
});

// Initialize when the page loads
window.addEventListener('DOMContentLoaded', function() {
    createDebugUI();
    debugLog('API Debug Helper loaded');
    
    // Patch the fetch function to log API calls
    const originalFetch = window.fetch;
    window.fetch = async function(url, options) {
        // Only log API calls
        if (url && (typeof url === 'string') && url.includes('/api/')) {
            debugLog(`Fetch: ${options?.method || 'GET'} ${url}`);
            try {
                const response = await originalFetch(url, options);
                debugLog(`Response: ${response.status} ${response.statusText}`);
                return response;
            } catch (error) {
                debugLog(`Fetch error: ${error.message}`, 'error');
                throw error;
            }
        } else {
            // Pass through normal fetch calls
            return originalFetch(url, options);
        }
    };
}); 
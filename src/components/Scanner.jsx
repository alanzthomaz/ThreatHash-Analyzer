import { useEffect, useState, useRef } from 'react';

export default function Scanner({ file, onComplete }) {
  const [status, setStatus] = useState('Initializing scan...');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const logContainerRef = useRef(null);

  const addLog = (message) => {
    setLogs(prev => {
      const newLogs = [...prev, `[${new Date().toISOString().split('T')[1].slice(0, -1)}] ${message}`];
      if (newLogs.length > 20) return newLogs.slice(newLogs.length - 20);
      return newLogs;
    });
  };

  useEffect(() => {
    let isMounted = true;

    const processFile = async () => {
      try {
        addLog(`Initiating sequence for file: ${file.name}`);
        addLog(`File size: ${file.size} bytes`);
        setStatus('Reading file contents...');
        setProgress(10);
        
        const arrayBuffer = await file.arrayBuffer();
        addLog('File buffer loaded into memory.');
        
        setStatus('Generating SHA-256 hash...');
        addLog('Executing crypto.subtle.digest(SHA-256)...');
        setProgress(30);
        
        // Simulate reading blocks
        for (let i = 0; i < 3; i++) {
          await new Promise(r => setTimeout(r, 200));
          addLog(`Hashing block ${i+1}/3...`);
        }
        
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        addLog(`SHA-256 Hash computed: ${hashHex}`);
        setProgress(50);
        
        setStatus(`Querying Threat Intelligence APIs...`);
        addLog(`Establishing secure connection to remote threat engines...`);
        
        // Step 3: Query real Python backend
        const response = await fetch(`https://threathash-analyzer.onrender.com/api/scan/${hashHex}`);
        if (!response.ok) {
          throw new Error(`Backend returned status ${response.status}`);
        }
        const report = await response.json();
        report.fileName = file.name;
        
        // Format size
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(file.size) / Math.log(1024));
        report.fileSize = file.size === 0 ? '0 Bytes' : `${parseFloat((file.size / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
        
        addLog(`Response received. Detections: ${report.detectionRatio}`);
        setProgress(90);
        
        setStatus('Analyzing results...');
        addLog(`Parsing threat labels...`);
        
        await new Promise(r => setTimeout(r, 500));
        addLog(`Analysis complete. Triggering report rendering.`);
        setProgress(100);
        setStatus('Complete');
        
        if (isMounted) {
          onComplete(report);
        }
        
      } catch (err) {
        console.error("Error processing file", err);
        setStatus('Error processing file. Please try again.');
        addLog(`ERR: ${err.message}`);
      }
    };

    if (file) {
      processFile();
    }

    return () => { isMounted = false; };
  }, [file, onComplete]);

  return (
    <div className="glass-panel scanner-container">
      <div className="terminal-logs" ref={logContainerRef}>
        <div className="terminal-logs-content">
          {logs.map((log, i) => (
            <div key={i} className={`log-line ${i === logs.length - 1 ? 'active' : ''}`}>
              {log}
            </div>
          ))}
        </div>
      </div>
      
      <div className="scan-status">{status}</div>
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

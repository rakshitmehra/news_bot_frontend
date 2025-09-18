import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatScreen.scss';
import './App.css';

// BACKEND URL
axios.defaults.baseURL = "http://localhost:8080";

// MAIN APP COMPONENT
function App() {
  const [sessionId, setSessionId] = useState(null);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const typingRef = useRef(null);

  // CREATE SESSION
  useEffect(() => {
    (async () => {
      try {
        const r = await axios.post('/session');
        setSessionId(r.data.sessionId);
      } catch (err) {
        console.error("Failed to create session:", err);
      }
    })();
  }, []);

  // SEND MESSAGE
  const send = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setHistory(prev => [...prev, userMsg, { role: 'assistant', text: '' }]);
    const currentInput = input;
    setInput('');

    try {
      const r = await axios.post('/chat', { sessionId, message: currentInput });
      const answer = r.data.answer;
      typeOut(answer);
    } catch (e) {
      setHistory(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1].text = 'Error contacting server.';
          return newHistory;
      });
    }
  };

  // TYPE OUT EFFECT
  const typeOut = (text) => {
    let i = 0;
    clearInterval(typingRef.current);
    typingRef.current = setInterval(() => {
      if (i < text.length) {
        i++;
        setHistory(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1].text = text.slice(0, i);
          return newHistory;
        });
      } else {
        clearInterval(typingRef.current);
      }
    }, 20);
  };

  // RESET SESSION
  const resetSession = async () => {
    if (!sessionId) return;
    try {
      await axios.post(`/reset/${sessionId}`);
      setHistory([]);
    } catch (err) {
      console.error("Failed to reset session:", err);
    }
  };

  // RENDER COMPONENT
  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <h2>NewsBot</h2>
        <button onClick={resetSession}>Reset Session</button>
      </div>

      <div className="message-area">
        {history.map((m, idx) => (
          <div key={idx} className={`msg ${m.role}`}>
            <div className="bubble">
              {m.text}
              {idx === history.length - 1 && m.role === 'assistant' && m.text.length < 500 && <span className="cursor">|</span>}
            </div>
          </div>
        ))}
      </div>


      <div className="input-area">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask about the news..."
        />
        <button onClick={send} disabled={!sessionId || !input.trim()}>
          {sessionId ? 'Send' : 'Connecting...'}
        </button>

      </div>
    </div>
  );
}

export default App;
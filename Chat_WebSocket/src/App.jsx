import React, { useEffect, useState, useRef } from 'react';
import './App.css';

const getWebSocketUrl = () => {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isLocalhost) {
    return 'ws://localhost:8080';
  } else {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${protocol}//${window.location.host}`;
  }
};

function App() {
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Déconnecté');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isJoined) {
      const wsUrl = getWebSocketUrl();
      console.log('Connexion WebSocket vers:', wsUrl);
      const socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        console.log('Connecté au serveur WebSocket');
        setConnectionStatus('Connecté');
        setWs(socket);
      };

      socket.onmessage = (event) => {
        try {
          const receivedMessage = JSON.parse(event.data);
          setMessages(prev => [...prev, receivedMessage]);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      socket.onerror = (error) => {
        console.error('Erreur WebSocket:', error);
        setConnectionStatus('Erreur');
      };

      socket.onclose = () => {
        console.log('Connexion WebSocket fermée');
        setConnectionStatus('Déconnecté');
        setWs(null);
      };

      return () => {
        socket.close();
      };
    }
  }, [isJoined]);

  const handleJoinChat = () => {
    if (username.trim()) {
      setIsJoined(true);
    }
  };

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN && message.trim()) {
      const messageData = {
        username: username,
        message: message.trim()
      };
      
      ws.send(JSON.stringify(messageData));
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isJoined) {
        handleJoinChat();
      } else {
        sendMessage();
      }
    }
  };

  const leaveChat = () => {
    if (ws) {
      ws.close();
    }
    setIsJoined(false);
    setMessages([]);
    setConnectionStatus('Déconnecté');
  };

  if (!isJoined) {
    return (
      <div className="join-container">
        <div className="join-card">
          <h1>⚡ CYBER_CHAT</h1>
          <p>// Entrez votre identifiant pour accéder au réseau</p>
          <div className="input-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="&gt; identifiant_"
              onKeyPress={handleKeyPress}
              maxLength={20}
            />
            <button 
              onClick={handleJoinChat}
              disabled={!username.trim()}
            >
              Connexion
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>⚡ CYBER_CHAT</h1>
        <div className="header-info">
          <span className="username">@{username}</span>
          <span className={`status ${connectionStatus === 'Connecté' ? 'connected' : connectionStatus === 'Erreur' ? 'error' : 'disconnected'}`}>
            {connectionStatus}
          </span>
          <button onClick={leaveChat} className="leave-btn">
            Déconnexion
          </button>
        </div>
      </div>

      <div className="messages-container">
        <div className="messages">
          {messages.length === 0 ? (
            <div className="empty-state">
              <p>// En attente de transmission...</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="message">
                <span className="message-username">@{msg.username}</span>
                <span className="message-text">{msg.message}</span>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="input-container">
        <div className="input-group">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="&gt; message_"
            disabled={connectionStatus !== 'Connecté'}
          />
          <button 
            onClick={sendMessage}
            disabled={!message.trim() || connectionStatus !== 'Connecté'}
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { ref, set, onValue, push } from 'firebase/database';
import { database } from './firebase';
import './App.css';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const messagesRef = ref(database, 'messages');
    
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.entries(data).map(([id, value]) => ({
          id,
          ...value
        }));
        setMessages(messageList);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messagesRef = ref(database, 'messages');
      const newMessageRef = push(messagesRef);
      set(newMessageRef, {
        text: newMessage,
        timestamp: Date.now()
      });
      setNewMessage('');
    }
  };

  return (
    <main>
      <h1>Firebase Realtime Database Demo</h1>
      <p>Add messages and see them sync in real-time!</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter a message..."
        />
        <button type="submit">Add Message</button>
      </form>

      <div className="messages">
        <h2>Messages:</h2>
        {messages.length === 0 ? (
          <p>No messages yet. Add one above!</p>
        ) : (
          <ul>
            {messages.map((msg) => (
              <li key={msg.id}>
                {msg.text} <small>({new Date(msg.timestamp).toLocaleTimeString()})</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

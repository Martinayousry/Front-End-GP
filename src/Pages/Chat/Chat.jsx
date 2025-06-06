import { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

export default function Chat() {
  const { id: receiverId } = useParams();
  const { token, userId } = useAuth();
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [currentChatName, setCurrentChatName] = useState('');
  const messagesEndRef = useRef(null);

  // Connect to SignalR hub with token
  useEffect(() => {
    if (token) {
      const newConnection = new HubConnectionBuilder()
        .withUrl('/api/chatHub', {
          accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);
    }
  }, [token]);

  // Start the connection and set up message handlers
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log('Connected to SignalR hub');
          setIsConnected(true);
          
          if (receiverId) {
            connection.invoke('JoinRoom', receiverId)
              .then(() => console.log(`Joined room with receiver: ${receiverId}`))
              .catch((err) => console.error('Failed to join room: ', err));
          }
        })
        .catch((err) => console.error('Connection failed: ', err));

      connection.on('ReceiveMessage', (senderId, senderName, message) => {
        console.log('Received message:', message);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            SenderId: senderId,
            SenderName: senderName,
            Message: message,
            Timestamp: new Date().toISOString(),
            from: senderId === userId ? 'me' : 'them'
          }
        ]);
      });

      return () => {
        if (connection) {
          connection.stop();
        }
      };
    }
  }, [connection, receiverId, userId]);

  // Fetch past messages when receiverId or token changes
  useEffect(() => {
    if (receiverId && token) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `/api/chat/messages?receiverId=${receiverId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const formattedMessages = response.data.map((msg) => ({
            SenderId: msg.senderId,
            SenderName: msg.senderName,
            Message: msg.message,
            Timestamp: msg.timestamp,
            from: msg.senderId === userId ? 'me' : 'them'
          }));

          setMessages(formattedMessages);
          
          // Set the chat name from the first message (if available)
          if (formattedMessages.length > 0) {
            const firstMessage = formattedMessages.find(msg => msg.SenderId === receiverId);
            if (firstMessage) {
              setCurrentChatName(firstMessage.SenderName);
            }
          }
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
      };

      fetchMessages();
    }
  }, [receiverId, token, userId]);

  // Scroll to the bottom of the messages list
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send a message
  const handleSend = () => {
    if (!newMessage.trim() || !connection || !receiverId) return;
    
    connection
      .invoke('SendMessage', receiverId, newMessage)
      .then(() => {
        setNewMessage('');
      })
      .catch((err) => console.error('Failed to send message: ', err));
  };

  return (
    <div className="flex h-[80vh] bg-[#F9FAFB] rounded-xl overflow-hidden shadow-lg mt-[70px]">
      {/* Chat Area Only */}
      <div className="flex flex-col flex-1 w-full">
        {receiverId ? (
          <>
            {/* Chat Header */}
            <div className="bg-white p-4 border-b border-gray-200">
              <h3 className="font-semibold text-lg">
                {currentChatName || 'Chat'}
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 'calc(80vh - 120px)' }}>
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex transition-all duration-300 ${
                      msg.SenderId !== receiverId ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="max-w-[70%]">
                      {/* Sender Name */}
                      <div className={`text-xs font-semibold mb-2 ${
                        msg.SenderId !== receiverId ? 'text-right' : 'text-left'
                      }`}>
                        {msg.SenderId !== receiverId ? 'Me' : msg.SenderName}:
                      </div>
                      
                      {/* Message Bubble */}
                      <div
                        className={`p-3 rounded-xl ${
                          msg.SenderId !== receiverId 
                            ? "bg-[#749260E5] text-white px-6 rounded-r-xl hover:bg-[#749260] transition-colors"
                            : "bg-gray-200 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        {msg.Message}
                        {/* Timestamp */}
                        <div className={`text-xs mt-1 ${
                          msg.SenderId !== receiverId ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          {new Date(msg.Timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 border rounded-l-xl p-3 focus:outline-none"
                  placeholder="Type your message..."
                />
                <button
                  onClick={handleSend}
                  className="bg-[#749260E5] text-white px-6 rounded-r-xl hover:bg-[#749260] transition-colors"
                  disabled={!newMessage.trim()}
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">No chat selected</p>
          </div>
        )}
      </div>
    </div>
  );
}
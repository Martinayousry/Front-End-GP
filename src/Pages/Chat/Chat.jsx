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
        .withUrl('https://localhost:7090/chatHub', {
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
          setIsConnected(true);
          if (receiverId) {
            connection.invoke('JoinRoom', receiverId)
              .catch((err) => console.error('Failed to join room: ', err));
          }
        })
        .catch((err) => console.error('Connection failed: ', err));

      connection.on('ReceiveMessage', (senderId, senderName, message) => {
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
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages]);

  // Send a message
  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!newMessage.trim() || !connection || !receiverId) return;
    connection
      .invoke('SendMessage', receiverId, newMessage)
      .then(() => {
        setNewMessage('');
      })
      .catch((err) => console.error('Failed to send message: ', err));
  };

  // UI copied from the second code (theme only, not functionality)
  return (
    <div className="flex flex-col h-screen" style={{ marginTop: '65px' }}>
      <div className="flex flex-1 bg-white rounded-t-xl overflow-hidden shadow-lg">
        {/* No sidebar for this single chat page */}
        {/* Right Side - Chat Area */}
        <div className="flex flex-col flex-1 bg-white">
          {receiverId ? (
            <>
              <div className="bg-white p-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium mr-3">
                    {currentChatName?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{currentChatName || "Chat"}</h3>
                    <p className="text-xs text-gray-500">
                      {isConnected ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`h-2 w-2 rounded-full ${
                    isConnected ? 'bg-emerald-500' : 'bg-rose-500'
                  } mr-2`}></span>
                  <span className="text-xs text-gray-500 capitalize">{isConnected ? 'connected' : 'disconnected'}</span>
                </div>
              </div>
              
              <div 
                className="flex-1 overflow-y-auto p-6 bg-[#f9faf9]"
                style={{ 
                  maxHeight: 'calc(100vh - 240px)',
                  scrollBehavior: 'smooth'
                }}
              >
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                    </div>
                    <h4 className="font-medium text-gray-700 mb-1">No messages yet</h4>
                    <p className="text-sm text-gray-500 max-w-xs">Start the conversation{currentChatName && ` with ${currentChatName}`}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg, index) => {
                      const isMe = msg.SenderId !== receiverId;
                      return (
                        <div
                          key={index}
                          className={`flex transition-all duration-300 ${isMe ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`max-w-[75%] flex ${isMe ? "flex-row-reverse" : ""}`}>
                            <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${isMe ? "ml-3 bg-[#749260] text-white" : "mr-3 bg-gray-200 text-gray-600"}`}>
                              {isMe ? 'You' : msg.SenderName?.charAt(0)}
                            </div>
                            <div>
                              <div className={`text-xs font-medium mb-1 ${isMe ? "text-right text-white" : "text-left text-gray-500"}`}>
                                {isMe ? 'You' : msg.SenderName}
                              </div>
                              <div
                                className={`p-4 rounded-2xl ${isMe
                                  ? "bg-[#749260] text-white rounded-tr-none hover:bg-[#678a55] transition-colors"
                                  : "bg-gray-100 text-gray-800 rounded-tl-none"
                                }`}
                              >
                                <p className={`whitespace-pre-wrap ${isMe ? "!text-white" : "!text-black"}`}>{msg.Message}</p>
                                <div className={`text-xs mt-2 ${isMe ? "text-white" : "text-gray-500"}`}>
                                  {new Date(msg.Timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-white">
                <div className="flex items-center rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-[#749260] focus-within:border-transparent transition-all">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 p-3 focus:outline-none text-gray-700 placeholder-gray-400"
                    placeholder={
                      isConnected 
                        ? `Message ${currentChatName || "user"}...` 
                        : "Connecting to chat..."
                    }
                    disabled={!isConnected}
                    onKeyDown={e => e.key === 'Enter' && handleSend(e)}
                  />
                  <button
                    type="submit"
                    className={`p-3 px-5 transition-colors ${
                      isConnected && newMessage.trim()
                        ? "text-[#749260] hover:text-[#678a55]"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!newMessage.trim() || !isConnected}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-[#f9faf9] text-center p-8">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <h3 className="font-medium text-gray-700 text-lg mb-2">
                No chat selected
              </h3>
              <p className="text-gray-500 max-w-md text-sm">
                Start a new conversation by finding someone to chat with
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
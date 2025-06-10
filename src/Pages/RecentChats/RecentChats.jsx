import { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';

export default function Chat() {
  const { token, userId } = useAuth();
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(true);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const messagesEndRef = useRef(null);

  // --- Fix scroll on refresh ---
  const isFirstLoad = useRef(true);

  // Fetch previous chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('/api/Chat/PreviousChats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChats(response.data);
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      } finally {
        setLoadingChats(false);
      }
    };
  
    if (token) {
      fetchChats();
    }
  }, [token]);

  // Initialize SignalR connection
  useEffect(() => {
    if (token) {
      const newConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:7090/chatHub', {
          accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);

      return () => {
        if (newConnection) {
          newConnection.stop();
        }
      };
    }
  }, [token]);

  // Start connection and setup handlers
  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          setConnectionStatus('connected');
          console.log('SignalR connection established');
          
          if (selectedReceiver) {
            joinRoom(selectedReceiver.receiverId);
          }
        })
        .catch(err => {
          setConnectionStatus('disconnected');
          console.error('SignalR connection error:', err);
        });

      connection.on('ReceiveMessage', (senderId, senderName, message) => {
        console.log('New message received:', message);
        setMessages(prev => [
          ...prev,
          {
            SenderId: senderId,
            SenderName: senderName,
            Message: message,
            Timestamp: new Date().toISOString(),
            from: senderId === userId ? 'me' : 'them'
          }
        ]);
      });

      connection.onclose(() => {
        setConnectionStatus('disconnected');
        console.log('SignalR connection closed');
      });

      connection.onreconnecting(() => {
        setConnectionStatus('reconnecting');
        console.log('SignalR reconnecting...');
      });

      connection.onreconnected(() => {
        setConnectionStatus('connected');
        console.log('SignalR reconnected');
        if (selectedReceiver) {
          joinRoom(selectedReceiver.receiverId);
        }
      });
    }
  }, [connection]); // eslint-disable-line

  const joinRoom = async (receiverId) => {
    if (connection && connectionStatus === 'connected') {
      try {
        await connection.invoke('JoinRoom', receiverId);
        console.log(`Successfully joined room: ${receiverId}`);
      } catch (err) {
        console.error('Error joining room:', err);
      }
    }
  };

  const handleSelectChat = async (chat) => {
    setSelectedReceiver({
      receiverId: chat.receiverId,
      receiverName: chat.receiverName
    });
    setMessages([]);
    
    try {
      const response = await axios.get(
        `/api/chat/messages?receiverId=${chat.receiverId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const formattedMessages = response.data.map(msg => ({
        SenderId: msg.senderId,
        SenderName: msg.senderName,
        Message: msg.message,
        Timestamp: msg.timestamp,
        from: msg.senderId === userId ? 'me' : 'them'
      }));

      setMessages(formattedMessages);
      
      if (connectionStatus === 'connected') {
        await joinRoom(chat.receiverId);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!newMessage.trim() || !selectedReceiver || connectionStatus !== 'connected') return;
    
    try {
      await connection.invoke('SendMessage', selectedReceiver.receiverId, newMessage);
      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  // --- Only scroll after initial render ---
  // useEffect(() => {
  //   if (isFirstLoad.current) {
  //     isFirstLoad.current = false;
  //     return;
  //   }
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages]);

  return (
    <div className="flex flex-col h-screen" style={{ marginTop: '65px' }}>
      <div className="flex flex-1 bg-white rounded-t-xl overflow-hidden shadow-lg">
        {/* Left Sidebar - Chat List */}
        <div className="w-[300px] bg-[#f8faf7] p-4 overflow-y-auto border-r border-gray-100">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <h2 className="font-semibold text-[#2c3e22] text-xl">Messages</h2>
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${
                connectionStatus === 'connected' ? 'bg-emerald-500' : 
                connectionStatus === 'reconnecting' ? 'bg-amber-400' : 'bg-rose-500'
              }`}></span>
              <span className="text-xs text-gray-500 capitalize">{connectionStatus}</span>
            </div>
          </div>
          
          {loadingChats ? (
            <div className="flex flex-col items-center justify-center h-20 gap-2">
              <div className="w-6 h-6 border-2 border-[#749260] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 text-sm">Loading conversations</p>
            </div>
          ) : chats.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">No conversations yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {chats.map((chat, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectChat(chat)}
                  className={`flex items-center p-3 rounded-xl cursor-pointer transition-all ${
                    selectedReceiver?.receiverId === chat.receiverId
                      ? "bg-[#749260] text-white shadow-sm"
                      : "hover:bg-gray-50 active:bg-gray-100"
                  }`}
                >
                  <div className={`flex-shrink-0 h-10 w-10 rounded-full ${selectedReceiver?.receiverId === chat.receiverId ? "bg-[#749260] text-white" : "bg-gray-200 text-gray-600"} flex items-center justify-center font-medium`}>
                    {chat.receiverName.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className={`font-medium text-sm truncate ${selectedReceiver?.receiverId === chat.receiverId ? "text-white" : ""}`}>{chat.receiverName}</p>
                      {chat.unreadCount > 0 && (
                        <span className="bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                    {chat.lastMessage && (
                      <p className={`text-xs truncate ${
                        selectedReceiver?.receiverId === chat.receiverId ? "text-white/90" : "text-gray-500"
                      }`}>
                        {chat.lastMessage.length > 30 
                          ? `${chat.lastMessage.substring(0, 30)}...` 
                          : chat.lastMessage}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side - Chat Area */}
        <div className="flex flex-col flex-1 bg-white">
          {selectedReceiver ? (
            <>
              <div className="bg-white p-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium mr-3">
                    {selectedReceiver.receiverName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{selectedReceiver.receiverName}</h3>
                    <p className="text-xs text-gray-500">
                      {connectionStatus === 'connected' ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`h-2 w-2 rounded-full ${
                    connectionStatus === 'connected' ? 'bg-emerald-500' : 
                    connectionStatus === 'reconnecting' ? 'bg-amber-400' : 'bg-rose-500'
                  } mr-2`}></span>
                  <span className="text-xs text-gray-500 capitalize">{connectionStatus}</span>
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
                    <p className="text-sm text-gray-500 max-w-xs">Start the conversation with {selectedReceiver.receiverName}</p>
                  </div>
                ) : (
<div className="space-y-4">
  {messages.map((msg, index) => {
    const isMe = msg.SenderId !== selectedReceiver.receiverId;
    return (
      <div
        key={index}
        className={`flex transition-all duration-300 ${isMe ? "justify-end" : "justify-start"}`}
      >
        <div className={`max-w-[75%] flex ${isMe ? "flex-row-reverse" : ""}`}>
          <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${isMe ? "ml-3 bg-[#749260] text-white" : "mr-3 bg-gray-200 text-gray-600"}`}>
            {isMe ? 'You' : msg.SenderName.charAt(0)}
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
                      connectionStatus === 'connected' 
                        ? `Message ${selectedReceiver.receiverName}...` 
                        : "Connecting to chat..."
                    }
                    disabled={connectionStatus !== 'connected'}
                  />
                <button
  type="submit"
  className={`p-3 px-5 transition-colors ${
    connectionStatus === 'connected' && newMessage.trim()
      ? "text-[#749260] hover:text-[#678a55]"
      : "text-gray-400 cursor-not-allowed"
  }`}
  disabled={!newMessage.trim() || connectionStatus !== 'connected'}
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
                {chats.length === 0 ? 'No conversations' : 'Select a conversation'}
              </h3>
              <p className="text-gray-500 max-w-md text-sm">
                {chats.length === 0 
                  ? 'Start a new conversation by finding someone to chat with' 
                  : 'Choose from your existing conversations or start a new one'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
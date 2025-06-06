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

 // Fetch previous chats
useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          'api/Chat/PreviousChats',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setChats(response.data);
        // Removed the auto-selection of first chat
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
        .withUrl('/api/chatHub', {
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
          
          // Join room if receiver is already selected
          if (selectedReceiver) {
            joinRoom(selectedReceiver.receiverId);
          }
        })
        .catch(err => {
          setConnectionStatus('disconnected');
          console.error('SignalR connection error:', err);
        });

      // Setup message handler
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
  }, [connection]);

  // Join SignalR room
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

  // Handle selecting a chat
  const handleSelectChat = async (chat) => {
    setSelectedReceiver({
      receiverId: chat.receiverId,
      receiverName: chat.receiverName
    });
    setMessages([]); // Clear previous messages
    
    // Fetch historical messages
    try {
      const response = await axios.get(
        `/api/chat/messages?receiverId=${chat.receiverId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const formattedMessages = response.data.map(msg => ({
        SenderId: msg.senderId,
        SenderName: msg.senderName,
        Message: msg.message,
        Timestamp: msg.timestamp,
        from: msg.senderId === userId ? 'me' : 'them'
      }));

      setMessages(formattedMessages);
      
      // Join the SignalR room
      if (connectionStatus === 'connected') {
        await joinRoom(chat.receiverId);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  // Send a message
  const handleSend = async () => {
    if (!newMessage.trim() || !selectedReceiver || connectionStatus !== 'connected') return;
    
    try {
      await connection.invoke('SendMessage', selectedReceiver.receiverId, newMessage);
      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-[80vh] bg-[#F9FAFB] rounded-xl overflow-hidden shadow-lg mt-[70px]">
      {/* Left Sidebar - Chat List */}
      <div className="w-[300px] bg-[#ebf0e8e5] p-4 overflow-y-auto border-r border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-[#749260E5] text-lg">Recent Chats</h2>
          <span className={`h-3 w-3 rounded-full ${
            connectionStatus === 'connected' ? 'bg-green-500' : 
            connectionStatus === 'reconnecting' ? 'bg-yellow-500' : 'bg-red-500'
          }`} title={connectionStatus}></span>
        </div>
        
        {loadingChats ? (
          <div className="flex justify-center items-center h-20">
            <p>Loading chats...</p>
          </div>
        ) : chats.length === 0 ? (
          <p className="text-gray-400">No chats yet.</p>
        ) : (
          chats.map((chat, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectChat(chat)}
              className={`block p-3 mb-2 rounded-lg cursor-pointer transition ${
                selectedReceiver?.receiverId === chat.receiverId
                  ? "bg-[#749260E5] text-white"
                  : "hover:bg-[#d9e2cbe5]"
              }`}
            >
              <div className="flex justify-between items-start">
                <p className="font-medium">{chat.receiverName}</p>
                {chat.unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
              {chat.lastMessage && (
                <p className={`text-sm truncate ${
                  selectedReceiver?.receiverId === chat.receiverId ? "text-white/80" : "text-gray-500"
                }`}>
                  {chat.lastMessage}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex flex-col flex-1">
        {selectedReceiver ? (
          <>
            {/* Chat Header */}
            <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-lg">
                {selectedReceiver.receiverName}
              </h3>
              <span className={`text-xs ${
                connectionStatus === 'connected' ? 'text-green-500' : 
                connectionStatus === 'reconnecting' ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {connectionStatus}
              </span>
            </div>
            
            {/* Messages Area */}
            <div 
              className="flex-1 overflow-y-auto p-4" 
              style={{ maxHeight: 'calc(80vh - 120px)' }}
            >
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                 messages.map((msg, index) => (
      <div
        key={index}
        className={`mb-4 flex transition-all duration-300 ${
          msg.SenderId!== selectedReceiver.receiverId ? "justify-end" : "justify-start"
        }`}
      >
        <div className="max-w-[70%]">
          {/* Sender Name */}
          <div className={`text-xs font-semibold mb-2  ${
            msg.SenderId!== selectedReceiver.receiverId ? 'text-right' : 'text-left'
          }`}>
            {/* {msg.from === 'me' ? 'Me' : msg.SenderName} */}
            {msg.SenderId!== selectedReceiver.receiverId ? 'Me' : msg.SenderName}:
          </div>
          
          {/* Message Bubble */}
          <div
            className={`p-3 rounded-xl ${
              msg.SenderId!== selectedReceiver.receiverId
                ? "bg-[#749260E5] text-white px-6 rounded-r-xl hover:bg-[#749260] transition-colors"
                : "bg-gray-200 text-gray-800 rounded-bl-none"
            }`}
          >
            {msg.Message}
            {/* Timestamp */}
            <div className={`text-xs mt-1 ${
              msg.SenderId!== selectedReceiver.receiverId ? 'text-white/70' : 'text-gray-500'
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
                  placeholder={
                    connectionStatus === 'connected' 
                      ? "Type your message..." 
                      : "Connecting..."
                  }
                  disabled={connectionStatus !== 'connected'}
                />
                <button
                  onClick={handleSend}
                  className={`px-6 rounded-r-xl transition-colors ${
                    connectionStatus === 'connected' && newMessage.trim()
                      ? "bg-[#749260E5] text-white hover:bg-[#749260]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!newMessage.trim() || connectionStatus !== 'connected'}
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">
              {chats.length === 0 ? 'No chats available' : 'Select a chat to start messaging'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
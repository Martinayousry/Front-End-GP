import { useEffect, useState } from 'react';
import { fetchMessages } from './ChatService'; // A service function to fetch initial messages
import MessageBubble from './MessageBubble'; // Import the MessageBubble component

const ChatWindow = ({ receiverId }) => {
  const [messages, setMessages] = useState([]); // Holds the messages for the chat
  const [newMessage, setNewMessage] = useState(''); // Holds the new message being typed

  // Fetch initial messages when the component mounts
  useEffect(() => {
    const loadMessages = async () => {
      try {
        // Fetch messages from your API (e.g., from your backend chat endpoint)
        const data = await fetchMessages(receiverId, localStorage.getItem('authToken'));
        setMessages(data);
      } catch (err) {
        console.error('Failed to load messages:', err);
      }
    };

    if (receiverId) loadMessages();
  }, [receiverId]);

  // WebSocket setup for real-time message updates
  useEffect(() => {
    const socket = new WebSocket('ws://your-websocket-endpoint'); // Replace with your WebSocket server URL

    socket.onopen = () => {
      console.log('WebSocket connection opened');
      socket.send(JSON.stringify({ receiverId })); // You can send the receiverId or other data to join the chat
    };

    // Listen for incoming messages from the WebSocket server
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('New message received:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, [receiverId]);

  // Send a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    // Send the message to the WebSocket server
    const socket = new WebSocket('ws://your-websocket-endpoint'); // Replace with your WebSocket server URL
    socket.onopen = () => {
      socket.send(JSON.stringify({
        receiverId,
        senderId: localStorage.getItem('userId'), // Assuming you have a way to get the current user ID
        message: newMessage
      }));
    };

    // Update the state with the new message in the UI
    setMessages((prevMessages) => [
      ...prevMessages,
      { senderId: localStorage.getItem('userId'), text: newMessage }
    ]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">Start a conversation!</p>
        ) : (
          messages.map((message, index) => (
            <MessageBubble
              key={index}
              message={message}
              isSender={message.senderId === localStorage.getItem('userId')}
            />
          ))
        )}
      </div>

      <div className="flex items-center mt-4">
        <input
          type="text"
          className="w-full p-2 border border-[#ddd] rounded-lg"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-[#6941C6] text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

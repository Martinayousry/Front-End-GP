import { useEffect, useState } from 'react';
import { fetchPreviousChats } from './ChatService';

const ChatList = ({ onSelectChat, selectedChat }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await fetchPreviousChats(localStorage.getItem('authToken'));
        setChats(data); // Store chats fetched from API
      } catch (err) {
        console.error('Failed to load chats:', err);
      }
    };
    loadChats();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent Chats</h2>
      <div className="space-y-2">
        {chats.length === 0 ? (
          <p>No recent chats.</p>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.roomName}
              className={`p-3 cursor-pointer rounded-lg ${
                selectedChat === chat.receiverId ? 'bg-[#e6e6e6]' : ''
              } hover:bg-[#f0f0f0]`}
              onClick={() => onSelectChat(chat.receiverId)}
            >
              <p className="font-semibold">{chat.receiverName}</p>
              <p className="text-sm text-gray-500">{chat.lastMessage}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;

import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";

const ChatList = () => {
  const { token } = useAuth();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch("/api/Chat/PreviousChats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch chats");
        const data = await res.json();
        setChats(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChats();
  }, [token]);

  return (
    <div className="flex h-screen p-5 bg-[#F9FAFB]">
      <div className="w-full bg-white rounded-2xl shadow-md p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>
        {chats.length === 0 && <p className="text-gray-400">No chats yet.</p>}
        {chats.map((chat, idx) => (
          <Link
            key={idx}
            to={`/chat/${chat.receiverId}`}
            className="block p-3 mb-2 rounded-lg hover:bg-[#ebf0e8e5] cursor-pointer transition"
          >
            <p className="font-medium">{chat.receiverName}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
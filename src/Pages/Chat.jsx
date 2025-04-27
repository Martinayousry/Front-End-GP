// import { useState } from 'react';
// import ChatList from '../components/Chat/ChatList';
// import ChatWindow from '../components/Chat/ChatWindow';

// const Chat = () => {
//   const [selectedChat, setSelectedChat] = useState(null); // receiverId
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Mobile sidebar toggle

//   return (
//     <div className="flex h-screen bg-[#f9fafb]">
//       {/* Left side - Chat List (Mobile collapses on smaller screens) */}
//       <div
//         className={`w-full md:w-1/4 border-r overflow-y-auto p-4 transition-all ${
//           isSidebarOpen ? 'block' : 'hidden md:block'
//         }`}
//       >
//         <ChatList onSelectChat={setSelectedChat} selectedChat={selectedChat} />
//       </div>

//       {/* Mobile Sidebar Toggle Button */}
//       <button
//         className="md:hidden absolute top-4 left-4 z-10 bg-[#6941C6] text-white p-2 rounded-full"
//         onClick={() => setIsSidebarOpen((prev) => !prev)}
//       >
//         <i className="fa-solid fa-bars"></i>
//       </button>

//       {/* Right side - Chat Window */}
//       <div className="w-full md:w-3/4">
//         {selectedChat ? (
//           <ChatWindow receiverId={selectedChat} />
//         ) : (
//           <div className="flex items-center justify-center h-full text-gray-500">
//             Select a chat to start messaging
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chat;
// import { useState } from "react";

// const users = [
//   { id: 1, name: "Bella" },
//   { id: 2, name: "Charlie" },
//   { id: 3, name: "Max" },
// ];

// const messagesData = {
//   1: [{ from: "me", text: "Hey Bella!" }, { from: "Bella", text: "Hi there!" }],
//   2: [{ from: "me", text: "Hello Charlie!" }],
//   3: [{ from: "Max", text: "Good morning!" }],
// };

// export default function Chat() {
//   const [selectedUserId, setSelectedUserId] = useState(users[0].id);
//   const [messages, setMessages] = useState(messagesData[users[0].id]);
//   const [newMessage, setNewMessage] = useState("");

//   const handleUserClick = (userId) => {
//     setSelectedUserId(userId);
//     setMessages(messagesData[userId] || []);
//   };

//   const handleSend = () => {
//     if (!newMessage.trim()) return;
//     const updated = [...messages, { from: "me", text: newMessage }];
//     setMessages(updated);
//     messagesData[selectedUserId] = updated; // For demo only
//     setNewMessage("");
//   };

//   return (
//     <div className="flex h-[80vh] bg-[#F9FAFB] rounded-xl overflow-hidden shadow-lg">
//       {/* Left Sidebar */}
//       <div className="w-[250px] bg-[#ebf0e8e5] p-4">
//         <h2 className="font-semibold mb-4 text-[#749260E5]">Recent Chats</h2>
//         {users.map((user) => (
//           <div
//             key={user.id}
//             onClick={() => handleUserClick(user.id)}
//             className={`p-3 mb-2 rounded-lg cursor-pointer ${
//               selectedUserId === user.id
//                 ? "bg-[#749260E5] text-white"
//                 : "hover:bg-[#d9e2cbe5]"
//             }`}
//           >
//             {user.name}
//           </div>
//         ))}
//       </div>

//       {/* Chat Area */}
//       <div className="flex flex-col flex-1 p-4">
//         <div className="flex-1 overflow-y-auto mb-4">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`mb-2 flex ${
//                 msg.from === "me" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`p-2 rounded-xl max-w-[60%] ${
//                   msg.from === "me"
//                     ? "bg-[#749260E5] text-white"
//                     : "bg-gray-200 text-gray-800"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Input Box */}
//         <div className="flex">
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             className="flex-1 border rounded-l-xl p-2 focus:outline-none"
//             placeholder="Type your message..."
//           />
//           <button
//             onClick={handleSend}
//             className="bg-[#749260E5] text-white px-4 rounded-r-xl"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../Context/AuthContext"; // Assuming you have this
import { Link } from "react-router-dom";

const Chat = () => {
  const { token, user } = useAuth(); // Make sure you have user info
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);

  // Load previous chats
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

  // Open WebSocket
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = new WebSocket("wss://your-websocket-url"); // Put your websocket URL here

      socketRef.current.onmessage = (event) => {
        const incomingMessage = JSON.parse(event.data);
        if (incomingMessage.roomName === selectedChat?.roomName) {
          setMessages((prev) => [...prev, incomingMessage]);
        }
      };
    }

    return () => {
      socketRef.current?.close();
    };
  }, [selectedChat]);

  const handleSelectChat = async (receiverId) => {
    try {
      // Start or fetch chat room
      const res = await fetch("/api/Chat/start", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ receiverId }),
      });
      const data = await res.json();
      const roomName = data.roomName;

      setSelectedChat({ receiverId, roomName });

      // Fetch messages
      const msgRes = await fetch(`/api/Chat/messages?receiverId=${receiverId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!msgRes.ok) throw new Error("Failed to load messages");
      const msgData = await msgRes.json();
      setMessages(msgData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      roomName: selectedChat.roomName,
      senderId: user.id,
      receiverId: selectedChat.receiverId,
      message: newMessage,
    };

    socketRef.current.send(JSON.stringify(messageData));

    setMessages((prev) => [...prev, { ...messageData, isMine: true }]);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen p-5 bg-[#F9FAFB]">
      {/* Sidebar */}
      <div className="w-1/4 bg-white rounded-2xl shadow-md p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>
        {chats.length === 0 && <p className="text-gray-400">No chats yet.</p>}
        {chats.map((chat, idx) => (
          <div
            key={idx}
            className="p-3 mb-2 rounded-lg hover:bg-[#ebf0e8e5] cursor-pointer transition"
            onClick={() => handleSelectChat(chat.receiverId)}
          >
            <p className="font-medium">{chat.receiverName}</p>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-md mx-5 p-4">
        {selectedChat ? (
          <>
            <div className="flex-1 overflow-y-auto mb-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.isMine ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-xs ${
                      msg.isMine
                        ? "bg-[#749260E5] text-white"
                        : "bg-[#ebf0e8e5] text-black"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 border rounded-2xl p-3 mr-3 bg-[#F9FAFB]"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#749260E5] hover:bg-[#4c5d3fe5] text-white rounded-2xl p-3 px-6"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;



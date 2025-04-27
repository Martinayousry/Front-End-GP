import React from 'react';

const MessageBubble = ({ message, isSender }) => {
  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] p-3 rounded-lg text-white ${
          isSender
            ? 'bg-[#6941C6]' // Sender's message style
            : 'bg-[#e6e6e6] text-black' // Receiver's message style
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;

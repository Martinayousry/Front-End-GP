export const fetchPreviousChats = async (token) => {
  const res = await fetch('/api/Chat/PreviousChats', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch previous chats');
  return res.json();
};

export const fetchMessages = async (receiverId, token) => {
  const res = await fetch(`/api/Chat/messages?receiverId=${receiverId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch messages');
  return res.json();
};

export const startChat = async (receiverId, token) => {
  const res = await fetch('/api/Chat/start', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ receiverId }),
  });
  if (!res.ok) throw new Error('Failed to start chat');
  return res.json();
};

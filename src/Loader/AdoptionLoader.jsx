
import axios from "axios";


export async function adoptionLoaderAnimals() {
  const res = await axios.get('/api/Animals');
  return res.data;
}
export async function adoptionLoaderPets() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const res = await axios.get('/api/Pet/GetAllPets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const currentUserId = localStorage.getItem("userId");  // Or however you store the user ID

  // Filter out pets that belong to the logged-in user
  const availablePets = res.data.filter(pet => pet.userId !== currentUserId);

  return availablePets;
}


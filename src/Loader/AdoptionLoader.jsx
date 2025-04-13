
import axios from "axios";

export async function adoptionLoader() {
  const res = await axios.get('/api/Animals');
  return res.data;
}

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Card from "../components/Card";
// import { useAuth } from "../Context/AuthContext";

// const MyCart = () => {
//   const { token } = useAuth();
//   const [pets, setPets] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPets = async () => {
//       try {
//         const response = await axios.get("/api/Cart/MyCart", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const validItems = response.data.cartItems.filter(
//           (item) => item.animalId !== null || item.petId !== null
//         );

//         setPets(validItems);
//       } catch (err) {
//         setError("Failed to fetch pets");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) {
//       fetchPets();
//     } else {
//       setError("No token found. Please log in.");
//       setLoading(false);
//     }
//   }, [token]);

//   return (
//     <div className="min-h-screen bg-white py-10">
//       <div className="grid place-items-center">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center p-10 gap-8 w-[90%]">
//           {loading ? (
//             <p className="text-gray-500 text-lg">Loading your cart...</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : pets.length > 0 ? (
//             pets.map((item) => (
//               <Card
//                 key={item.cartItemId}
//                 id={item.petId || item.animalId}
//                 title={item.name}
//                 description={item.itemType}
//                 gender={item.gender}
//                 photoUrls={item.photoUrls}
//                 type={item.petId ? "pet" : "animal"}
//               />
//             ))
//           ) : (
//             <p className="text-gray-600">No animals in your cart.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyCart;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useAuth } from "../Context/AuthContext";
import { Heart, PawPrint, ShoppingCart, AlertTriangle } from "lucide-react";

const MyCart = () => {
  const { token } = useAuth();
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("/api/Cart/MyCart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const validItems = response.data.cartItems.filter(
          (item) => item.animalId !== null || item.petId !== null
        );

        setPets(validItems);
      } catch (err) {
        setError("Oops! We couldn't load your beloved pets.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPets();
    } else {
      setError("You're not logged in. Please sign in to see your cart.");
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="text-center mb-6">
        <div className="flex justify-center items-center gap-2">
          <ShoppingCart className="text-pink-500" size={28} />
          <h1 className="text-3xl font-semibold text-gray-800">Your Pet Cart</h1>
        </div>
        <p className="text-gray-500 mt-2">
          🐶These are the pets you've shown love to — keep them close!
        </p>
      </div>

      <div className="grid place-items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center p-10 gap-8 w-[90%]">
          {loading ? (
            <p className="text-gray-500 text-lg flex items-center gap-2">
              <PawPrint className="animate-bounce" /> Loading your cart...
            </p>
          ) : error ? (
            <p className="text-red-500 flex items-center gap-2">
              <AlertTriangle className="text-red-400" /> {error}
            </p>
          ) : pets.length > 0 ? (
            pets.map((item) => (
              <Card
                key={item.cartItemId}
                id={item.petId || item.animalId}
                title={item.name}
                description={item.itemType}
                gender={item.gender}
                photoUrls={item.photoUrls}
                type={item.petId ? "pet" : "animal"}
              />
            ))
          ) : (
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <Heart className="text-pink-500" /> No pets in your cart yet. Find a friend to love!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCart;


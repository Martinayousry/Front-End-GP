import Profile from "./Profile";
import { useAuth } from "../../Context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PetProfile = () => {
  const { isAuthenticated } = useAuth();
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // Track favorite status
  const [cartItemId, setCartItemId] = useState(null); // Store cart item ID
  const { token } = useAuth();

  // Check if the pet is already in the favorites list
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!token) return; // Don't proceed if there's no token

      try {
        const res = await fetch("/api/Cart/MyCart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch cart items");

        const data = await res.json();

        const favoriteItem = data.cartItems?.find(
          (item) => item.petId === parseInt(id) && item.itemType === "Pet"
        );

        if (favoriteItem) {
          setIsFavorite(true);
          setCartItemId(favoriteItem.cartItemId); // Set cart item ID
        } else {
          setIsFavorite(false);
          setCartItemId(null);
        }
      } catch (err) {
        console.error("Error checking favorite status:", err);
      }
    };

    checkFavoriteStatus();
  }, [id, token]);

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite && cartItemId) {
        const res = await fetch(`/api/Cart/Remove/${cartItemId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to remove from favorites");

        setIsFavorite(false);
        setCartItemId(null);
      } else {
        const res = await fetch("/api/Cart/Add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            petId: id,
            animalId: null,
            itemType: "Pet",
          }),
        });

        if (!res.ok) throw new Error("Failed to add to favorites");

        const cartRes = await fetch("/api/Cart/MyCart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!cartRes.ok) throw new Error("Failed to fetch updated favorites");

        const cartData = await cartRes.json();

        const addedItem = cartData.cartItems?.find(
          (item) => item.petId === parseInt(id) && item.itemType === "Pet"
        );

        if (addedItem) {
          setIsFavorite(true);
          setCartItemId(addedItem.cartItemId);
        } else {
          throw new Error("Added item not found in cart");
        }
      }
    } catch (err) {
      console.error("Toggle favorite failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Profile
      apiEndpoint="/api/Pet"
      requiresAuth={true}
      titleKey="name"
      onDataLoaded={setPet}
      detailsConfig={[
        { key: "foundDate", label: "Found Date" },
        {
          key: "healthStatus",
          label: "Health Status",
          default: "No known issues",
        },
        { key: "breed", label: "Breed", default: "Not specified" },
      ]}
      showOwnerInfo={true}
      buttons={
        <div className="flex">
          <Link
            to={`/adoption/adoption-form/${id}?type=pet`}
            className="bg-[#749260E5] w-40 p-3 rounded-xl mt-3 text-white me-3 mb-4 text-center"
          >
            Adopt Me <i className="ms-2 fa-solid fa-dog"></i>
          </Link>

          <button
            className="bg-[#ebf0e8e5] p-3 rounded-2xl mt-3 text-white me-3 mb-4 sm:w-[50%] md:w-[30%] w-[75%] text-center"
            onClick={handleToggleFavorite}
          >
            {isFavorite ? (
              <i className="fa-solid fa-heart text-[#749260E5] hover:text-[#4c5d3fe5]"></i>
            ) : (
              <i className="fa-regular fa-heart text-[#749260E5] hover:text-[#4c5d3fe5]"></i>
            )}
          </button>
        </div>
      }
    />
  );
};

export default PetProfile;

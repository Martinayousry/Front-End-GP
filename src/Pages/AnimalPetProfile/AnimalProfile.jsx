import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Profile from "./Profile";
import { useAuth } from "../../Context/AuthContext";
import AdoptionRequests from "./AdoptionRequest";
import MarriageRequests from "./MarriageRequests";

const AnimalProfile = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartItemId, setCartItemId] = useState(null);
  const { token,user } = useAuth();

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const res = await fetch("/api/Cart/MyCart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch favorites");

        const data = await res.json();

        const favoriteItem = data.cartItems?.find(
          (item) => item.animalId === parseInt(id) && item.itemType === "animal"
        );

        if (favoriteItem) {
          setIsFavorite(true);
          setCartItemId(favoriteItem.cartItemId);
        } else {
          setIsFavorite(false);
          setCartItemId(null);
        }
      } catch (err) {
        console.error("Error checking favorite status:", err);
      }
    };

    if (token) checkFavoriteStatus();
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
            petId: null,
            animalId: id,
            itemType: "animal",
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
          (item) => item.animalId === parseInt(id) && item.itemType === "animal"
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
      apiEndpoint="/api/Animals"
      requiresAuth={false}
      titleKey="title"
      customAdoptionRequestContent={<AdoptionRequests ID={id}/>}
      customMarriageRequestContent={<MarriageRequests petId={id}/>}
      detailsConfig={[
        { key: "foundDate", label: "Found Date" },
        {
          key: "healthIssues",
          label: "Health Issues",
          default: "No known issues",
        },
        { key: "creationDate", label: "Creation Date" },
      ]}
      tabs={["Description", "Habitat", "Conservation"]}
      buttons={
        !user.roles.includes("Admin") && (
          <>
            <button className="bg-[#749260E5] w-40 p-3 rounded-xl mt-3 text-white me-3 mb-4 text-center">
              <Link to={`/adoption/adoption-form/${id}?type=animal`}>
                Adopt Me <i className="ms-2 fa-solid fa-dog"></i>
              </Link>
            </button>
      
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
          </>
        )
      }
    />
  );
};

export default AnimalProfile;

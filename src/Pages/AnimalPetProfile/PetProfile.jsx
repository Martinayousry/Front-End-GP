import Profile from "./Profile";
import { useAuth } from "../../Context/AuthContext";
import { Link, useParams } from "react-router-dom";

const PetProfile = () => {
  const { isAuthenticated } = useAuth();
  const {id} = useParams();

  return (
    <Profile
      apiEndpoint="/api/Pet"
      requiresAuth={true}
      titleKey="name"
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
        isAuthenticated ? (
          <>
            <button className="bg-[#749260E5] w-40 p-3 rounded-xl mt-3 text-white me-3 mb-4 text-center">
              <Link to={`/adoption/adoption-form/${id}`}>
                Adopt Me <i className="ms-2 fa-solid fa-dog"></i>
              </Link>
            </button>
            <button className="bg-[#749260E5] w-40 p-3 rounded-xl mt-3 text-white me-3 mb-4 text-center">
              <Link to={`/adoption/adoption-form/${id}`}>
                marriage<i className="ms-2 fa-solid fa-dog"></i>
              </Link>
            </button>
            <button className="bg-[#ebf0e8e5] p-3 rounded-2xl mt-3 text-white me-3 mb-4 sm:w-[50%] md:w-[30%] w-[75%] text-center">
              <Link to={"/adoption-form"}>
                <i className="fa-regular fa-heart text-[#749260E5] hover:text-black"></i>
              </Link>
            </button>
          </>
        ) : (
          <button className="bg-blue-500 w-40 p-3 rounded-xl mt-3 text-white me-3 mb-4">
            <Link to="/login">Login to Adopt</Link>
          </button>
        )
      }
    />
  );
};

export default PetProfile;

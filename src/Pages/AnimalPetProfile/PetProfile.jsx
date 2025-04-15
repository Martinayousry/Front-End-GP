import Profile from "./Profile";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

const PetProfile = () => {
  const { isAuthenticated } = useAuth();

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
            <button className="bg-blue-500 w-40 p-3 rounded-xl mt-3 text-white me-3 mb-4">
              <Link to="/pet-foster">Foster Me</Link>
            </button>
            <button className="bg-green-500 w-40 p-3 rounded-xl mt-3 text-white me-3 mb-4">
              <Link to="/pet-sponsor">Sponsor</Link>
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

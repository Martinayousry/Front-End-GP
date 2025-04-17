import { Link, useParams } from "react-router-dom";
import Profile from "./Profile";

const AnimalProfile = () => {
    const {id} = useParams();

  <Profile
    apiEndpoint="/api/Animals"
    requiresAuth={false}
    titleKey="title"
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
      <>
        <button className="bg-[#749260E5] w-40 p-3 rounded-xl mt-3 text-white me-3 mb-4 text-center">
              <Link to={`/adoption/adoption-form/${id}`}>
                Adopt Me <i className="ms-2 fa-solid fa-dog"></i>
              </Link>
            </button>
            <button className="bg-[#ebf0e8e5] p-3 rounded-2xl mt-3 text-white me-3 mb-4 sm:w-[50%] md:w-[30%] w-[75%] text-center">
              <Link to={"/adoption-form"}>
                <i className="fa-regular fa-heart text-[#749260E5] hover:text-black"></i>
              </Link>
            </button>
      </>
    }
  />
  };

export default AnimalProfile;

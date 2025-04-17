import { Link } from "react-router-dom";
import Profile from "./Profile";

const AnimalProfile = () => (
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
        <button className="bg-orange-500 w-40 p-3 rounded-xl mt-3 text-white me-3 mb-4">
          <Link to="/wildlife-donate">Donate</Link>
        </button>
        <button className="bg-purple-500 w-40 p-3 rounded-xl mt-3 text-white me-3 mb-4">
          <Link to="/wildlife-volunteer">Volunteer</Link>
        </button>
      </>
    }
  />
);

export default AnimalProfile;

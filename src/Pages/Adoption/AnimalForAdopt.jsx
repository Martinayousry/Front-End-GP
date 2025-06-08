import { Link, useLoaderData } from "react-router-dom";
import Card from "../../components/Card";
import { useAuth } from "@/Context/AuthContext";

export default function AnimalForAdopt() {
  const animals = useLoaderData();
  const { user } = useAuth();  // get user from context
  const isAdmin = user?.roles?.includes("Admin");

  if (!animals || !Array.isArray(animals)) {
    return <p className="text-center text-red-500 mt-10">No animals data available.</p>;
  }
  return (
    <div className="grid place-items-center ">
      <div className="text-center mt-10">
        {isAdmin ? (
          <>
            <p className="text-3xl font-semibold text-[#749260]">Welcome {user.userName}!</p>
            <p className="text-[#667085] mt-2">
              Manage your animals listed for adoption.
            </p>
            <Link to="add-Animal">
              <button className="mt-4 px-5 py-2 bg-[#749260] text-white rounded-lg hover:bg-[#5a784d]">
                ➕ Add New Animal
              </button>
            </Link>
          </>
        ) : (
          <>
            <p className="text-[#749260] mt-7 text-xl">We are hiring!</p>
            <p className="text-black text-3xl mt-3 font-medium">Variety of animals</p>
            <p className="text-[#667085] mt-3">
              Our mission is simple — care for animals with compassion, provide them
              with a<br /> safe haven, and help them find loving forever homes
            </p>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center p-10 gap-17 w-[90%]">
        {animals.length > 0 ? (
          animals.map((animal) => (
            <Card
              key={animal.animalId}
              id={animal.animalId}
              title={animal.title}
              description={animal.description}
              gender={animal.gender}
              photoUrls={animal.photoUrls}
              type="animal"
            />
          ))
        ) : (
          <p>No animals available for adoption.</p>
        )}
      </div>
    </div>
  );
}

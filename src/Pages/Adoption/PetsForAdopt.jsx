import { Link, useLoaderData } from "react-router-dom";
import Card from "../../components/Card";

export default function PetsForAdopt() {
  const Pets = useLoaderData();
  return (
    <div className="grid place-items-center ">
      <div className="text-center">
        <p className="text-[#749260] mt-7 text-xl">We are hiring! </p>
        <p className="text-black text-3xl mt-3 font-medium">Variety of Pets</p>
        <p className="text-[#667085] mt-3">
          Our mission is simple — care for Pets with compassion, provide them
          with a<br /> safe haven, and help them find loving forever homes
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center p-10 gap-8 w-[90%]">
        {Pets.length > 0 ? (
          Pets.map((pet) => (
            <Card
              key={pet.petId}
              animalId={pet.petId}
              title={pet.title}
              description={pet.description}
              gender={pet.gender}
              photoUrls={pet.photoUrls}
              type="pet"
            />
          ))
        ) : (
          <p>No Pets available for adoption.</p>
        )}
      </div>
    </div>
  );
}

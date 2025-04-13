import { Link, useLoaderData } from "react-router-dom";
import Card from "../../components/Card";

export default function Adoption() {
  const animals = useLoaderData();
  return (
    <div className="grid place-items-center ">
      <div className="text-center">
        <p className="text-[#749260] mt-7 text-xl">We are hiring! </p>
        <p className="text-black text-3xl mt-3 font-medium">
          Variety of animals
        </p>
        <p className="text-[#667085] mt-3">
          Our mission is simple — care for animals with compassion, provide them
          with a<br /> safe haven, and help them find loving forever homes
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center p-10 gap-8 w-[90%]">
        {animals.length > 0 ? (
          animals.map((animal) => (
            <Card
            key={animal.animalId}
            animalId={animal.animalId}
            title={animal.title}
            description={animal.description}
            gender={animal.gender}
            photoUrls={animal.photoUrls}
            />
          ))
        ) : (
          <p>No animals available for adoption.</p>
        )}
      </div>
    </div>
  );
}

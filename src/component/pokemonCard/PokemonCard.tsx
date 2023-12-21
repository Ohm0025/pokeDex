import { Type } from "@/interface/pokemonDetail";
import { Link } from "react-router-dom";

interface PokemonCardProps {
  image: string;
  name: string;
  id: number;
  types: Type[];
}

const PokemonCard = ({ image, name, id, types }: PokemonCardProps) => {
  return (
    <div className="rounded-[20px] overflow-hidden shadow dark:bg-gray-800 dark:border-gray-700 p-[16px] bg-[#253641] text-white max-w-[275px] w-full m-auto">
      <div className="bg-[url('./image/poke-card-bg.png')] bg-center aspect-square max-h-[218px] w-full bg-cover rounded-[20px]">
        <Link to={`detail/${name}`}>
          <img
            className="rounded-t-lg h-[218px] p-[40px] w-full"
            src={image}
            alt=""
          />
        </Link>
      </div>
      <div className="pt-5">
        <div className="flex justify-between">
          <h5 className="mb-2 capitalize text-white text-xl font-bold tracking-tight dark:text-white">
            {name}
          </h5>
          <h5 className="mb-2 text-white text-xl font-bold tracking-tight dark:text-white">
            {"#" + id}
          </h5>
        </div>
        <div className="flex gap-2 justify-end mt-[16px]">
          {types.map((item, index) => {
            return (
              <span
                key={`pokemon-card-${index}`}
                className={`badge-type-${item.type.name} px-[14px] py-1 rounded-lg capitalize text-[gray]`}>
                {item.type.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;

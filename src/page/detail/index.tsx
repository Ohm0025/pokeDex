import LikeButton from "@/component/likeButton/LikeButton";
import { IPokemonDetailResponse } from "@/interface/pokemonDetail";
import { pokemonDetailService } from "@/service";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type pokemonType = {
  data: IPokemonDetailResponse | undefined;
  loading: boolean;
  error: null | any;
};

const DetailPage = () => {
  const { name } = useParams();

  const [selectedPokemon, setSelectedPokemon] = useState<pokemonType>({
    data: undefined,
    loading: true,
    error: null,
  });

  const callData = async (name: string) => {
    const response = await pokemonDetailService.getPokemonDetail(name);

    if (response.status === 200) {
      response.data &&
        setSelectedPokemon({
          data: {
            ...response.data,
            image:
              response.data?.sprites.other.dream_world.front_default ||
              response.data?.sprites.other["official-artwork"].front_default,
          },
          loading: false,
          error: null,
        });
    } else {
      setSelectedPokemon({
        data: undefined,
        loading: false,
        error: response.error,
      });
    }
  };

  useEffect(() => {
    name && callData(name);
  }, [name]);

  return (
    <div className="w-[90%] m-[auto] max-w-[1100px]">
      <div className="flex justify-center">
        <img
          src="/image/logo.webp"
          alt="logo_web"
          className="max-h-[80px] mt-[20px]"
        />
      </div>
      <div className="w-[90%] max-w-[600px] m-[auto]">
        <Link
          to="/"
          className="text-white underline tracking-wide text-[18px] bg-[#4cafeb] dark:bg-[#050833] rounded-[16px] px-[16px] py-[10px]">
          Back
        </Link>
        {selectedPokemon.data && (
          <div className="rounded-[20px] overflow-hidden shadow bg-[#6EA3FF] dark:bg-gray-800 dark:border-gray-700 p-[16px] text-white m-auto my-[20px]">
            <div className="flex justify-end">
              <LikeButton nameId={name || ""} sizeImg="8" />
            </div>
            <div className="bg-[url('/image/pokemon_bg.png')] bg-center aspect-square w-full bg-cover rounded-[20px] p-10">
              <img
                className="rounded-t-lg h-[400px] pt-[50px] w-full"
                src={selectedPokemon.data?.image}
                alt=""
              />
            </div>
            <div className="pt-5 bg-[#A8CDFE] dark:bg-[#253641] rounded-[20px] p-[16px] my-[20px]">
              <div className="flex justify-between">
                <h5 className="mb-2 capitalize text-white text-xl font-bold tracking-tight dark:text-white">
                  {name}
                </h5>
                <h5 className="mb-2 text-white text-xl font-bold tracking-tight dark:text-white">
                  {"#" + selectedPokemon.data?.id}
                </h5>
              </div>
              <div className="grid grid-col-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                <div>
                  <div className="flex gap-x-[10px]">
                    <div className="text-[#4CAFEB] font-semibold">Height</div>
                    <div className="text-white">
                      {(selectedPokemon.data.height / 10).toFixed(1) + " m."}
                    </div>
                  </div>
                  <div className="flex gap-x-[10px]">
                    <div className="text-[#4CAFEB] font-semibold">Weight</div>
                    <div className="text-white">
                      {(selectedPokemon.data.weight / 10).toFixed(1) + " kg."}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 justify-start sm:justify-end mt-[16px]">
                  {selectedPokemon.data?.types.map((item, index1) => {
                    return (
                      <span
                        key={`pokemon-card-${index1}`}
                        className={`badge-type-${item.type.name} px-[14px] py-1 rounded-lg capitalize text-[gray]`}>
                        {item.type.name}
                      </span>
                    );
                  })}
                </div>
                <div>
                  <h5 className="text-white font-semibold">Abilities</h5>
                  <div className="grid grid-cols-2 sm:grid-col-1 gap-[7px] mt-1">
                    {selectedPokemon.data.abilities.map((item, index2) => {
                      return (
                        <div
                          key={`pokemon-ability-${index2}`}
                          className="bg-[#4cafeb] px-[14px] capitalize py-1 rounded-[16px] text-center">
                          {item.ability.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h5 className="text-white font-semibold">Status</h5>
                  <div className="grid grid-col-1 gap-[7px] mt-1">
                    {selectedPokemon.data.stats.map((item, index) => {
                      return (
                        <div
                          key={`pokestat-${index}`}
                          className="flex gap-x-[10px] justify-between">
                          <div className="text-[#4CAFEB] font-semibold capitalize">
                            {item.stat.name}
                          </div>
                          <div className="text-white">{item.base_stat}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;

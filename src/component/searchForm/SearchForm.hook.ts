import { useEffect } from "react";
import { pokemonListService, pokemonDetailService } from "@/service";
import { useForm } from "react-hook-form";
import { usePokemonListStore } from "@/store/pokemonList";
import { IPokemonDetailResponse } from "@/interface/pokemonDetail";
import { generationList } from "@/utils/optionList";

const useSearchForm = () => {
  const {
    register,

    watch,
    formState: {},
  } = useForm();

  const { setFetchPokemonList, fetchPokemon, setPokemonList } =
    usePokemonListStore();

  const keyword = watch("keyword");
  const generation = watch("generation");
  const type = watch("type");
  const sort = watch("sort");

  const callData = async (filter: {
    name: string;
    limit: number;
    offset: number;
  }) => {
    setFetchPokemonList({ data: [], loading: true, error: null });
    const responseList = await pokemonListService.getPokemonList(
      filter.limit,
      filter.offset
    );
    const pokeList: Array<IPokemonDetailResponse> = [];
    if (responseList.status === 200) {
      const responseResult = responseList.data?.results || [];
      for (const pokemon of responseResult) {
        const response = await pokemonDetailService.getPokemonDetail(
          pokemon.name
        );
        const pokeData = response.data;
        pokeData &&
          pokeList.push({
            ...pokeData,
            image:
              pokeData?.sprites.other["official-artwork"].front_default ||
              pokeData?.sprites.other.dream_world.front_default,
          });
      }
      setFetchPokemonList({ data: pokeList, loading: false, error: null });
      const data = filterPokemon(pokeList, keyword, type, sort);
      setPokemonList({ data: data, loading: false, error: null });
    } else {
      setFetchPokemonList({
        data: [],
        loading: false,
        error: responseList.error,
      });
      setPokemonList({
        data: [],
        loading: false,
        error: responseList.error,
      });
    }
  };

  const sortBy = (data: IPokemonDetailResponse[], type: "id" | "name") => {
    switch (type) {
      case "id":
        return data.sort((a, b) => a.id - b.id);
      case "name":
        return data.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
      default:
        return data.sort((a, b) => a.id - b.id);
    }
  };
  const filterPokemon = (
    pokelist: IPokemonDetailResponse[],
    keyword: string,
    type: string,
    sort: "id" | "name"
  ) => {
    const keywordFilter = pokelist.filter((item) =>
      item.name.toLowerCase().includes(keyword)
    );
    const typeFilter =
      type !== "all types"
        ? keywordFilter.filter((item) =>
            item.types.find((f) =>
              f.type.name.toLowerCase().includes(type.toLowerCase())
            )
          )
        : keywordFilter;

    return sortBy(typeFilter, sort);
  };

  useEffect(() => {
    generation !== undefined && callData(generationList[generation]);
  }, [generation]);
  useEffect(() => {
    const data = filterPokemon(fetchPokemon.data, keyword, type, sort);
    setPokemonList({ data: data, loading: false, error: null });
  }, [keyword, type, sort]);

  return {
    fieldKeyword: register("keyword"),
    fieldGen: register("generation"),
    fieldType: register("type"),
    fieldSort: register("sort"),
  };
};

export { useSearchForm };

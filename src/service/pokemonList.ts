import axios from "axios";
import { API_BASE_URL } from "@/utils/constant";
import { IPokemonListResponse } from "@/interface/pokemonList";
import { IRespose, handleResponse } from "@/utils/handleResponse";

interface IGetPokemonListResponse extends IRespose {
  status: number | undefined;
  data?: IPokemonListResponse;
}

export const pokemonListService = {
  getPokemonList: async (
    nameGen: string,
    limit?: number,
    offset?: number
  ): Promise<IGetPokemonListResponse> => {
    try {
      console.log(nameGen);
      const genCache = localStorage.getItem("genCache");

      const cache = localStorage.getItem("cacheData");
      const cacheData = JSON.parse(cache || "null");

      if (cacheData.data && genCache === nameGen) {
        console.log("have cache");
        console.log(cacheData.data);
        return handleResponse.success(cacheData);
      } else {
        const response = await axios.get(
          `${API_BASE_URL}pokemon?limit=${limit || 151}&offset=${offset || 0}`
        );
        console.log("have no cache");
        localStorage.setItem("genCache", nameGen);
        localStorage.setItem("cacheData", JSON.stringify(response));
        return handleResponse.success(response);
      }
    } catch (error: any) {
      return handleResponse.error(error);
    }
  },
};

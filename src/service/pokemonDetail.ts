import axios from "axios";
import { API_BASE_URL } from "@/utils/constant";
import { IPokemonDetailResponse } from "@/interface/pokemonDetail";
import { IRespose, handleResponse } from "@/utils/handleResponse";

interface IGetPokemonDetailResponse extends IRespose {
  status: number | undefined;
  data?: IPokemonDetailResponse;
}

export const pokemonDetailService = {
  getPokemonDetail: async (
    name: string
  ): Promise<IGetPokemonDetailResponse> => {
    try {
      const response = await axios.get(`${API_BASE_URL}pokemon/${name}`);
      return handleResponse.success(response);
    } catch (error: any) {
      return handleResponse.error(error);
    }
  },
};

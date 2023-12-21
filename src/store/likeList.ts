import { create } from "zustand";

const initStore: Array<string> = [];

type UseLikePokemonType = {
  likedPokemon: string[];
  setLikedPokemon: (value: string) => void;
  clearLikedPokemon: (value: string) => void;
};

export const useLikePokemon = create<UseLikePokemonType>((set) => ({
  likedPokemon: [...initStore],
  setLikedPokemon: (value: string) =>
    set((state) => ({ likedPokemon: [...state.likedPokemon, value] })),
  clearLikedPokemon: (value: string) =>
    set((state) => ({
      likedPokemon: state.likedPokemon.filter((item) => item !== value),
    })),
}));

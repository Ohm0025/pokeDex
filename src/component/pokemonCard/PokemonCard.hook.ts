import React, { useEffect } from "react";
import { pokemonDetailService, pokemonListService } from "@/service";
import { useForm, SubmitHandler } from "react-hook-form";
import { usePokemonListStore } from "@/store/pokemonList";

const usePokemonCard = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return {};
};

export { usePokemonCard };

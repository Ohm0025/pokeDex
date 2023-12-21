import SearchForm from "@/component/searchForm";
import { usePokemonListStore } from "@/store/pokemonList";
import PokemonCard from "@/component/pokemonCard";
import ReactLoading from "react-loading";

const HomePage = () => {
  const { pokemon, fetchPokemon } = usePokemonListStore();

  return (
    <div className="w-[90%] m-[auto] max-w-[1100px]">
      <div className="flex justify-center">
        <img
          src="/image/logo.webp"
          className="max-h-[80px] mt-[20px]"
          alt="app_logo"
        />
      </div>
      <SearchForm />

      {fetchPokemon.loading && (
        <div className="h-[800px] flex justify-center items-center">
          <ReactLoading type={"spin"} color="white" />
        </div>
      )}

      {!fetchPokemon.loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] mt-[40px]">
          {pokemon.data.map((item, index) => {
            return (
              <PokemonCard
                image={item.image || ""}
                name={item.name}
                id={item.id}
                types={item.types}
                key={`poke-card-${index}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;

import "./App.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

/*type Pokemon = {
  name: string;
  numberPokedex: number;
  img: string;
};type api pokedex
 .get<Pokemon[]>
*/
type PokeApiResponse = {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
};

type Pokemon = {
  name: string;
  url: string;
};

function App() {
  const [page, setPage] = useState(0);

  function handlePageIncrement() {
    setPage(page + 1);
  }
  function handlePageDecrement() {
    setPage(Math.max(page - 1, 0));
  }

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: async () => {
      const offset = page * 10;
      const data = await axios
        .get<PokeApiResponse>(
          `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
        )
        .then((response) => response.data);
      return data.results;
    },
  });
  if (isLoading) {
    return <h1>Carregando...</h1>;
  }

  if (isError) {
    return (
      <>
        <h1>falha ao consultar pokeapi!</h1>
        <code>{JSON.stringify(error)}</code>
      </>
    );
  }

  return (
    <ul>
      <h1>PokeList whith UseQuery</h1>
      {data.map((pokemon: Pokemon) => {
        return (
          <li key={pokemon.name}>
            nome: {pokemon.name}.<br />
          </li>
        );
      })}
      <button onClick={handlePageDecrement} disabled={page === 0}>
        previus page
      </button>
      <button onClick={handlePageIncrement}>Next Page</button>
      <h2>{page + 1}</h2>
    </ul>
  );
}

export default App;

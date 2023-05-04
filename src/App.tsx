import "./App.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["pokemons"],
    queryFn: async () => {
      const data = await axios
        .get<PokeApiResponse>("https://pokeapi.co/api/v2/pokemon?limit=20")
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
      <button>Next Page</button>
    </ul>
  );
}

export default App;
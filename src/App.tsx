import "./App.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from 'react';

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
 
  const[page, setPage] = useState(0);
  const [cont, setCont] = useState(1)
 
  function handlePage(){
    setPage(page + 10)
 
  if (page >= 0){
   setCont(cont + 1)
  }
  console.log(page) 
  }
  function handlePageDecrement(){
    setPage(Math.max(page - 10, 0))
   setCont(cont - 1)
  }
  
 const { isLoading, isError, data, error } = useQuery({
  queryKey: ["pokemons"],
  queryFn: async () => {
    const data = await axios
      .get<PokeApiResponse>(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page}`)
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
      <button onClick={handlePageDecrement} disabled={page === 0}>previus page</button>
      <button onClick={handlePage}>Next Page</button>
      <h2>{cont}</h2>
    </ul>
  );
}

export default App;
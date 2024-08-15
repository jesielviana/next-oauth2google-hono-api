import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Movies() {
  const { data: session } = useSession();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (session) {
      // Fazendo uma chamada para a API Express, passando o accessToken no cabeçalho
      console.log("session.accessToken", session);
      fetch("http://localhost:4000/api/movies", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
        .then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            setMovies(data);
          } else {
            console.error("Erro ao buscar filmes", response);
          }
        })
        .catch((error) => console.error("Erro ao buscar filmes", error));
    }
  }, [session]);

  return (
    <div>
      <h1>Filmes</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Movie {
  id: number;
  title: string;
}

export default function Movies() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    console.log("session", session);
    console.log("status", status);
    if(status === "unauthenticated"){
      router.push("/");
    }
    if (session) {
      // Fazendo uma chamada para a API Express, passando o accessToken no cabeçalho
      fetch("http://localhost:4000/api/movies", {
          headers: {
            //@ts-ignore
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
  }, [session, status, router]);

  return (
    <div>
      <Link href="/"> Home </Link>
      <h1>Filmes</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

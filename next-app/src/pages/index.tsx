import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Bem-vindo, {session.user?.name}</p>
        <Link href="/movies"> Filmes </Link>
        <button onClick={() => signOut()}>Sair</button>
      </div>
    );
  }

  return (
    <div>
      <p>Você não está autenticado.</p>
      <button onClick={() => signIn("google")}>Login com Google</button>
    </div>
  );
}

import { signIn, signOut, useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Bem-vindo, {session.user?.name}</p>
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

import { Suspense } from "react";
import Image from "next/image";
import Confetti from "./confetti";

const TABNEWS_URL = "https://www.tabnews.com.br";
const FETCH_TIMEOUT_MS = 5000;

async function fetchTotalContents() {
  try {
    const response = await fetch(
      `${TABNEWS_URL}/api/v1/contents?strategy=new&per_page=1`,
      { cache: "no-store", signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) },
    );

    if (!response.ok) return null;

    const total = Number(response.headers.get("x-pagination-total-rows"));
    return Number.isFinite(total) ? total : null;
  } catch {
    return null;
  }
}

async function TotalContents() {
  const totalContents = await fetchTotalContents();

  return (
    <p className="total">
      {totalContents === null
        ? "Não foi possível carregar o total de conteúdos publicados no TabNews."
        : `${totalContents.toLocaleString("pt-BR")} conteúdos publicados no TabNews`}
    </p>
  );
}

export default function Home() {
  return (
    <main>
      <Confetti />
      <Image
        src="/obra.svg"
        alt="Ilustração de uma obra com guindaste, tijolos e cone de sinalização"
        width={320}
        height={240}
        priority
      />
      <h1>Em Construção</h1>
      <p className="description">
        Estamos neste exato momento reconstruindo o TabNews, um lugar na
        internet para quem trabalha com tecnologia e precisa consumir conteúdos
        com valor concreto
      </p>
      <Suspense
        fallback={
          <p className="total" aria-busy="true">
            Carregando total de conteúdos publicados no TabNews…
          </p>
        }
      >
        <TotalContents />
      </Suspense>
      <a href={TABNEWS_URL} target="_blank" rel="noopener noreferrer">
        Acesse o TabNews oficial
      </a>
    </main>
  );
}

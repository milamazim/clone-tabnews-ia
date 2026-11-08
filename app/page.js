import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Image
        src="/obra.svg"
        alt="Ilustração de uma obra com guindaste, tijolos e cone de sinalização"
        width={320}
        height={240}
      />
      <h1>Página em construção</h1>
    </main>
  );
}

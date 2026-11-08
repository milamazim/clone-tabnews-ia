import "./globals.css";

export const metadata = {
  title: "Página em construção",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "./ApolloWrapper";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import type { NavCatalogCategory } from "./constants";
import { fetchCatalog } from "./utils/graphql/fetchers";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Онлайн магазин за омекотители и аксесоари | omekotitel.bg",
  description: "Онлайн магазин за омекотители и аксесоари",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const catalog = await fetchCatalog();
  const categoryList = (catalog?.categoryList ?? []) as NavCatalogCategory[];

  return (
    <html lang="bg">
      <body
        className={`${roboto.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ApolloWrapper>
          <Header />
          <Navigation categoryList={categoryList} />
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}

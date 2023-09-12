import Billboard from "@/components/billboard";
import MovieList from "@/components/movie-list";
import Navbar from "@/components/navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useMovies from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const {data: movies = []} = useMovies()
  const {data: favorites = []} = useFavorites()
  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList data={movies} title="Trending Now"/>
        <MovieList data={favorites} title="Favorites" />
      </div>
    </>
  );
}

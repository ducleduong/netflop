import { PrismaClient } from "@prisma/client";
import movieData from "./movies.json" assert { type: "json" };

const seedData = async () => {
    const prismadb = new PrismaClient();
  try {
    console.log("starting seeding...");

    await prismadb.movie.createMany({
      data: movieData,
    });

    console.log("Done...");
  } catch (err) {
    console.log(err);
  } finally {
    await prismadb.$disconnect();
  }
};

seedData();

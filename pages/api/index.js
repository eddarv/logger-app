import NextCors from "nextjs-cors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

let name = [];
let auxObj = { projectId: false };

async function save(log) {
  const post = await prisma.log.create({
    data: {
      logId: log.id,
      message: log.message,
      timestamp: log.timestamp,
      type: log.type,
      source: log.source,
      host: log.host,
      entrypoint: log.entrypoint,
    },
  });
}

async function read(log) {
  const post = await prisma.log.findMany();
  return post;
}

export default async function handler(req, res) {
  try {
    await NextCors(req, res, {
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: "*",
      optionsSuccessStatus: 200,
    });

    if (req.method === "GET") {
      name = await read()
        .catch((e) => {
          return res.status(500).send("error en respuestas");
        })
        .finally(async () => {
          await prisma.$disconnect();
        });

      if (name.length === 0) return res.status(200).json([1]);
      return res.status(200).json(name);
    }

    if (req.method === "POST") {
      auxObj = { ...req.body[0] };

      if (auxObj.projectId !== "prj_Uneqt4CLqAh6YprTsAUfBqhfuHLs") return;

      await save(req.body[0])
        .catch((e) => {
          console.log(e.message);
        })
        .finally(async () => {
          await prisma.$disconnect();
        });

      name = [...name, req.body[0]];

      res.status(200).json(name);
    }

    return;
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}

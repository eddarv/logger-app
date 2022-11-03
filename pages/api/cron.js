import NextCors from "nextjs-cors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

require('dotenv').config()

async function deleteAll(log) {
    await prisma.log.deleteMany();
}

export default async function handler(req, res) {

            
    if (req.method === 'POST') {
        try {
            const { authorization } = req.headers;


            if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
                await deleteAll()
                    .catch((e) => {
                        return res.status(500).send("error eliminando");
                    })
                    .finally(async () => {
                        await prisma.$disconnect();
                    });
                res.status(200).json({ success: true });
            } else {
                res.status(401).json({ success: false });
            }
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    } 
    
}
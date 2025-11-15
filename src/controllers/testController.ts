import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTest = async (req: Request, res: Response) => {
  try {
    const { shots, made, startTime, playerId } = req.body;

    const test = await prisma.test.create({
      data: {
        shots,
        made,
        startTime: new Date(startTime),
        playerId,
      },
    });

    res.status(201).json(test);
  } catch (error) {
    console.error("Error creating test:", error);
    res.status(500).json({ error: "Failed to create test" });
  }
};

export const getTests = async (req: Request, res: Response) => {
  try {
    const tests = await prisma.test.findMany({
      include: {
        player: true,
      },
      orderBy: {
        startTime: "desc",
      },
    });
    res.status(200).json(tests);
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ error: "Failed to fetch tests" });
  }
};

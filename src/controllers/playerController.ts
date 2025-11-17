import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all players (active by default, or all if query param set)
export const getPlayers = async (req: Request, res: Response) => {
  try {
    const { includeArchived } = req.query;

    const players = await prisma.player.findMany({
      where: includeArchived === "true" ? {} : { active: true },
      orderBy: { lastName: "asc" },
    });

    res.status(200).json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Failed to fetch players" });
  }
};

// Create new player
export const createPlayer = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, jerseyNumber, position } = req.body;

    const player = await prisma.player.create({
      data: { firstName, lastName, jerseyNumber, position },
    });

    res.status(201).json(player);
  } catch (error) {
    console.error("Error creating player:", error);
    res.status(500).json({ error: "Failed to create player" });
  }
};

// Update player
export const updatePlayer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, jerseyNumber, position, active } = req.body;

    const player = await prisma.player.update({
      where: { id: parseInt(id) },
      data: { firstName, lastName, jerseyNumber, position, active },
    });

    res.status(200).json(player);
  } catch (error) {
    console.error("Error updated player:", error);
    res.status(500).json({ error: "Failed toupdate player" });
  }
};

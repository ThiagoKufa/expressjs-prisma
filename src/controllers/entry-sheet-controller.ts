import { EntrySheet} from "@prisma/client";
import { prisma } from "../server";
import { Request, Response } from "express";

export class EntrySheetController {
  public create = async (req: Request, res: Response) => {
    const { userId, stimuli, numAttempts } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const entrySheet = await prisma.entrySheet.create({
        data: {
          user: { connect: { id: userId } },
          stimuli,
          numAttempts,
        },
      });
      res.json(entrySheet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public findMany = async (req: Request, res: Response) => {
    try {
      const entrySheets: EntrySheet[] = await prisma.entrySheet.findMany();
      const cont: number = entrySheets.length;
      res.json({ entrySheets, cont });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { stimuli, numAttempts } = req.body;

    try {
      const entrySheet = await prisma.entrySheet.update({
        where: { id },
        data: {
          stimuli,
          numAttempts,
        },
      });
      res.json(entrySheet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const entrySheet = await prisma.entrySheet.delete({
        where: {
          id,
        },
      });
      res.json(entrySheet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const entrySheet = await prisma.entrySheet.findUnique({
        where: { id },
      });
      res.json(entrySheet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public findAllByUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const entrySheets: EntrySheet[] = await prisma.entrySheet.findMany({
        where: { userId },
      });
      const cont: number = entrySheets.length;
      res.json({ entrySheets, cont });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

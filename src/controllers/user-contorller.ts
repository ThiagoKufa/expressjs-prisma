import { User } from "@prisma/client";
import { prisma } from "../server";
import { Request, Response } from "express";

export class UserContoller {
  public findMany = async (req: Request, res: Response) => {
    try {
      const users: User[] = await prisma.user.findMany();
      const cont: number = users.length;
      res.json({ users, cont });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public create = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
      }
      const user = await prisma.user.create({
        data: {
          name,
          email,
        },
      });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
      const user = await prisma.user.update({
        where: { id },
        data: {
          name,
          email,
        },
      });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.entrySheet.deleteMany({
        where: {
          userId: id,
        },
      });
      const user = await prisma.user.delete({
        where: {
          id,
        },
      });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

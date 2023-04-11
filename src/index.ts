import express, { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import { UserContoller } from "./controllers/user-contorller";
import { EntrySheetController } from "./controllers/entry-sheet-controller";

export const prisma = new PrismaClient();

const app = express();
const PORT = 3000;
const user = new UserContoller()
const entrySheet = new EntrySheetController();

app.use(express.json());
app.get("/", (res : Response) => { 
  res.json("Hello World!")
});
app.get("/user", user.findMany);
app.post("/user", user.create);
app.put("/user/:id", user.update);
app.delete("/user/:id", user.delete);
app.get("/user/:id", user.findById);

app.get("/entry-sheet", entrySheet.findMany);
app.post("/entry-sheet", entrySheet.create);
app.put("/entry-sheet/:id", entrySheet.update);
app.delete("/entry-sheet/:id", entrySheet.delete);
app.get("/entry-sheet/:id", entrySheet.findById);
app.get("/entry-sheet/user/:id", entrySheet.findAllByUser);

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});

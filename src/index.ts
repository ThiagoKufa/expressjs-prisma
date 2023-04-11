import { PrismaClient } from "@prisma/client";
import express from "express";
import { UserContoller } from "./controllers/user-contorller";

export const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

const users = new UserContoller()

app.get("/user", users.findMany);
app.post("/user", users.create);
app.get("/user/:id", users.findById);
app.put("/user/:id", users.update);
app.delete("/user/:id", users.delete);

app.get("/", async (req, res) => {
  res.send(
    `
    <h1>AbaApp</h1>
    <p>API Documentation</p>
    <ul>
      <li><a href="/user">/user</a></li>
      <li><a href="/user/1">/user/1</a></li>
    </ul>
    
    
  `.trim(),
  );
});

app.listen(Number(port), "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

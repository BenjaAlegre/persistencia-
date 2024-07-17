import express from "express";
import fs from "fs/promises";
import path from "path";
 
const app = express();
const PORT = 3000;
const filePath = path.join(process.cwd(), "data.json");
 
app.use(express.json());
 
app.get("/", async (req, res) => {
  const file = JSON.parse(await fs.readFile(filePath));
  console.log(file);
 
  res.json(file);
});
 
app.post("/", async (req, res) => {
  const { body } = req;
 
  await fs.writeFile(filePath, JSON.stringify(body));
 
  res.sendStatus(200);
});
 
app.listen(PORT, () => console.log("running!"));
import express from "express";
import path from "path";
import fs from "fs/promises";

interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get("/cells", async (req, res) => {
    try {
      console.log("Reading file");
      // Read the file
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });

      res.send(JSON.parse(result));
    } catch (error: any) {
      if (error.code === "ENOENT") {
        console.log("Creating file");
        // Add code to create a file and add default cells
        await fs.writeFile(fullPath, "[]", "utf-8");
        res.send([]);
      } else {
        throw error;
      }
    }

    // If we get an error from this operation
    // Inspect the error and see if the file doesn't exist
    // Create the file if it doesn;t exisit
    // Parse a list of cells out of it
    // Send list of cells back to browser
  });

  router.post("/cells", async (req, res) => {
    // Take the list of cells from the request object and serialize them

    const { cells }: { cells: Cell[] } = req.body;

    // Write the cells into the file

    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

    res.send({ status: "ok" });
  });

  return router;
};

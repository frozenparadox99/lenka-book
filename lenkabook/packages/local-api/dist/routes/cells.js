"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCellsRouter = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const createCellsRouter = (filename, dir) => {
    const router = express_1.default.Router();
    router.use(express_1.default.json());
    const fullPath = path_1.default.join(dir, filename);
    router.get("/cells", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("Reading file");
            // Read the file
            const result = yield promises_1.default.readFile(fullPath, { encoding: "utf-8" });
            res.send(JSON.parse(result));
        }
        catch (error) {
            if (error.code === "ENOENT") {
                console.log("Creating file");
                // Add code to create a file and add default cells
                yield promises_1.default.writeFile(fullPath, "[]", "utf-8");
                res.send([]);
            }
            else {
                throw error;
            }
        }
        // If we get an error from this operation
        // Inspect the error and see if the file doesn't exist
        // Create the file if it doesn;t exisit
        // Parse a list of cells out of it
        // Send list of cells back to browser
    }));
    router.post("/cells", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Take the list of cells from the request object and serialize them
        const { cells } = req.body;
        // Write the cells into the file
        yield promises_1.default.writeFile(fullPath, JSON.stringify(cells), "utf-8");
        res.send({ status: "ok" });
    }));
    return router;
};
exports.createCellsRouter = createCellsRouter;

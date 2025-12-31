import express from "express"
import { CreatePaste, ViewPaste} from "../controllers/pasteController.js"

const PasteRouter = express.Router();
PasteRouter.post('/pastes', CreatePaste);
PasteRouter.get("/pastes/:id",ViewPaste);

export default PasteRouter;
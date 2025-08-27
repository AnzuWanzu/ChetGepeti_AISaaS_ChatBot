import express from "express";
import { config } from "dotenv";
config();
const app = express();
const PORT = process.env.PORT;
//middleware
app.use(express.json());
//Listener
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
//# sourceMappingURL=index.js.map
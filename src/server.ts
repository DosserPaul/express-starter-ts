import App from "./App";
import * as dotenv from "dotenv";
dotenv.config();

const port = Number(process.env.PORT) || 3000;

const app = new App(port);

app.listen();

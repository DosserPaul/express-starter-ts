import express, {Express} from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import expressRateLimit from "express-rate-limit";
import * as dotenv from "dotenv";
import IndexRouter from "./routes/IndexRouter";

// Routes

dotenv.config();

/**
 * The App class is the main entry point into the application.
 * @class App
 * @export App
 */
class App {
  public express: Express;
  public port: number;

  constructor(port: number) {
    this.express = express();
    this.port = port;

    this.initMiddlewares();
    this.initRoutes();
  }

  private initMiddlewares() {
    const limiter = expressRateLimit({
      windowMs: 60 * 1000, // 1 minute
      max: 1000, // limit each IP to 1000 requests per windowMs
      standardHeaders: true, // Send standard rate limit headers
      legacyHeaders: false, // Send legacy rate limit headers
    });

    this.express.use(limiter);
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan('dev')); // Log requests to API using morgan when in development mode
    this.express.use(express.json());
    this.express.use(express.urlencoded({extended: false}));
    this.express.use(compression());
  }

  private initRoutes() {
    this.express.use("/api", IndexRouter);
  }

  public listen() {
    this.express.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}. App running at http://localhost:${this.port}`);
    });
  }
}

export default App;

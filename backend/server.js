import express from "express";
import { PORT } from "./config/config.js";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import error from "./middlewares/error.js";
import routesUsers from "./routes/user.r.js";
import routesHome from "./routes/home.r.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.use(helmet());
app.use(
  morgan("dev", {
    skip: (req, res) => {
      return req.url.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg)$/);
    },
  })
);

//* Configuración del motor de vistas
app.set("views", path.join(__dirname, "../frontend/views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "../frontend/public")));

app.use(express.urlencoded({ extended: true }));

app.use(routesUsers);
app.use(routesHome);

app.use(error.e404);

//* Iniciar servidor
app.listen(PORT, () => {
  console.log(`🌎🌐 Server running → http://localhost:${PORT}`);
});

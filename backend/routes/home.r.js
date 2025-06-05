import { Router } from "express";
import cUser from "../controllers/user.c.js";
import cHome from "../controllers/home.c.js";
import authorization from "../middlewares/authorization.js";

const routes = Router();

routes.get("/", authorization.soloAdmin, cHome.indexHome);
routes.get("/logout", cUser.logout);

export default routes;

import { Router } from "express";
import cUser from "../controllers/user.c.js";
import authorization from "../middlewares/authorization.js";

const routes = Router();

routes.get("/login", authorization.soloPublic, cUser.login);
routes.post("/login", cUser.loginAuth);
routes.get("/signin", authorization.soloPublic, cUser.signin);
routes.post("/signin", cUser.signinAuth);

export default routes;

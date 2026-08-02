import { login, register } from "../Controller/user.controller.js";

export function userRoutes(app) {
    app.post("/register",register);
    app.post("/login",login);
}
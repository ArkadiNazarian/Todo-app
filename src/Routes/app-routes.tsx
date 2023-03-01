import { route_names } from "./route-name";
import { SignUp } from "../Modules/Auth/Signup";
import { Login } from "../Modules/Auth/Login";
import { NavBar } from "../Modules/App/NavBar";

export const routes = () => {
    const app_routes = route_names();

    const public_routes = [
        {
            path: app_routes.signup_path,
            component: <SignUp />
        },
        {
            path: app_routes.login_path,
            component: <Login />
        }

    ];

    const private_routes = [
        {
            path: app_routes.dashboard,
            component: <NavBar />
        },
        {
            path: app_routes.default_path,
            component: <NavBar />
        },
    ];

    return {
        public_routes,
        private_routes
    }
}
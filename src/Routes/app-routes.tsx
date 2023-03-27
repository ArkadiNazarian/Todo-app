import { route_names } from "./route-name";
import { SignUp } from "../Modules/Auth/Signup";
import { Login } from "../Modules/Auth/Login";
import { Today } from "../Modules/App/Today";
import { ForgotPassword } from "../Modules/Auth/Forgot-Password";
import { Inbox } from "../Modules/App/Inbox";
import { Project } from "../Modules/App/Project";
import { Done } from "../Modules/App/Done";

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
        },
        {
            path: app_routes.forgot_password_path,
            component: <ForgotPassword />
        }

    ];

    const private_routes = [
        {
            path: app_routes.default_path,
            component: <Today />
        },
        {
            path: app_routes.today_path,
            component: <Today />
        },
        {
            path: app_routes.inbox_path,
            component: <Inbox />
        },
        {
            path: app_routes.project_path,
            component: <Project />
        },
        {
            path: app_routes.done_path,
            component: <Done />
        }
    ];

    return {
        public_routes,
        private_routes
    }
}
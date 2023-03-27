export const route_names = () => {

    const default_path = "*";
    const login_path = "/auth/login";
    const signup_path = "/auth/signup";
    const forgot_password_path = "/auth/forgot-password";
    const today_path = "/app/today";
    const inbox_path = "/app/inbox";
    const done_path = "/app/done";
    const project_path = "/app/project/:project_id";
    const calendar_path = "/app/calendar";

    return {
        login_path,
        signup_path,
        today_path,
        default_path,
        inbox_path,
        forgot_password_path,
        project_path,
        done_path,
        calendar_path
    }
};
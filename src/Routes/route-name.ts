export const route_names = () => {

    const default_path = "*";
    const login_path = "/auth/login";
    const signup_path = "/auth/signup";
    const forgot_password_path = "/auth/forgot-password";
    const today_path = "/app/today";
    const inbox_path = "/app/inbox";

    return {
        login_path,
        signup_path,
        today_path,
        default_path,
        inbox_path,
        forgot_password_path
    }
};
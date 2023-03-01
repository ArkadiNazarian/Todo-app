export const route_names = () => {
    const login_path = "/auth/login";
    const signup_path = "/auth/signup";
    const dashboard = "/dashboard";
    const default_path="*"

    return {
        login_path,
        signup_path,
        dashboard,
        default_path
    }
};
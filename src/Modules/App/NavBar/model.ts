export interface IFormModel {
    name?: string;
    toggle_menu: () => void;
    handler_onView_account: () => void;
    action_signout: () => void;
    view_account: boolean;
    user_info: {
        full_name?: string;
        email?: string;
    }
}
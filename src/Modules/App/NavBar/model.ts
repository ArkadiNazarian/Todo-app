export interface IFormModel {
    name?: string;
    toggle_menu: () => void;
    handler_onView_account: () => void;
    handler_open_profile_modal: () => void;
    handler_close_profile_modal: () => void;
    open_profile_modal: boolean;
    action_signout: () => void;
    view_account: boolean;
    handleChange: (e: any) => void;
    handleBlur: (e: any) => void;
    form_data: IAccountModel;
    action_edit: () => void;
    user_info: {
        full_name?: string;
        email?: string;
    }
    reauthenticate: {
        open_reauthenticate_modal: boolean;
        handler_close_reauthenticate_modal: () => void;
        action_submit: () => void;
        handleChange: (e: any) => void;
        handleBlur: (e: any) => void;
        reauthenticate_form_data: IReauthenticateModal;
    }
}

export interface IReauthenticateModal {
    current_email: string;
    password: string;
}

export interface IAccountModel {
    user_name: string;
    email: string;
}
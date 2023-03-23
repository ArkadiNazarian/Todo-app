import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAccountSelector, get_identity, set_token, sign_out } from "../../Auth/redux";
import { IAccountModel, IFormModel, IPasswordModel, IReauthenticateModal } from "./model";
import { auth } from "../../../Firebase/firbase-config";
import { useAppDispatch } from "../../../Redux/redux-hooks";
import { toast } from "react-toastify";
import *as yup from 'yup';
import { useFormik } from "formik";
import { deleteUser, signInWithEmailAndPassword, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { route_names } from "../../../Routes/route-name";
import { getUISelector, sidebar } from "../redux";
export const useContainer = (): IFormModel => {

    const user_data = useSelector(getAccountSelector);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const app_routes = route_names();
    const ui_data = useSelector(getUISelector);

    const [avatar_name, set_avatar_name] = useState("");
    const [view_account, set_view_account] = useState<boolean>(false);
    const [user_info, set_user_info] = useState({})
    const [open_profile_modal, set_open_profile_modal] = useState(false);
    const [open_reauthenticate_modal, set_open_reauthenticate_modal] = useState<boolean>(false);
    const [open_password_modal, set_open_password_modal] = useState<boolean>(false);

    useEffect(() => {
        const first_name = user_data.user?.name?.charAt(0);
        const last_name = user_data.user?.name?.search(" ");
        const second_letter = user_data.user?.name?.charAt(1);

        if (last_name) {
            if (last_name === -1) {
                set_avatar_name(first_name?.concat(second_letter!)!)
            } else {
                set_avatar_name(first_name?.concat(user_data.user!.name!.charAt(last_name + 1))!)
            }
        }

        set_user_info({
            full_name: user_data.user?.name,
            email: user_data.user?.email
        })
    }, [user_data])

    const toggle_menu = () => {
        dispatch(sidebar({
            sidebar_is_on: !ui_data.sidebar_is_on
        }))
    }

    const home = () => {
        navigate(app_routes.today_path);
    }

    const handler_onView_account = () => {
        set_view_account(view_account => !view_account);
    }

    const action_signout = () => {
        auth.signOut()
            .then(() => {
                dispatch(sign_out())
                navigate(app_routes.login_path)
            })
            .catch((command_result) => {
                toast.error(command_result.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
    }

    const handler_open_profile_modal = () => {
        set_open_profile_modal(true);
    }

    const handler_close_profile_modal = () => {
        set_open_profile_modal(false);
    }

    const profile_initial_values: IAccountModel = {
        user_name: "",
        email: ""
    };

    const reauthentication_initial_values: IReauthenticateModal = {
        current_email: "",
        password: ""
    };

    const password_initial_values: IPasswordModel = {
        confirm_new_password: "",
        new_password: ""
    };

    const profile_validation_schema = yup.object().shape({
        user_name: yup.string().required("This field is required"),
        email: yup.string().email("Invalid email format").required("This field is required")
    });

    const reauthentication_validation_schema = yup.object().shape({
        password: yup.string().min(6).required("This field is required"),
        current_email: yup.string().email("Invalid email format").required("This field is required")
    });

    const password_validation_schema = yup.object().shape({
        new_password: yup.string().min(6).required("This field is required"),
        confirm_new_password: yup.string().oneOf([yup.ref('new_password')], 'Passwords must match')
    });

    const action_edit_profile = (values: IAccountModel) => {
        updateProfile(auth.currentUser!, {
            displayName: values.user_name
        })
            .then(() => {
                dispatch(get_identity())
            })
            .catch((command_result) => {
                toast.error(command_result.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })

        updateEmail(auth.currentUser!, values.email)
            .then(() => {
                dispatch(get_identity())
            })
            .catch(() => {
                set_open_reauthenticate_modal(true)
            })
    }

    const action_edit_password = (values: IPasswordModel) => {
        updatePassword(auth.currentUser!, values.new_password)
            .then(() => {
                toast.success("Password changed", {
                    position: toast.POSITION.TOP_RIGHT
                })
                set_open_password_modal(false)
            })
            .catch(() => {
                set_open_reauthenticate_modal(true)
            })
    }

    const action_submit = (values: IReauthenticateModal) => {
        signInWithEmailAndPassword(auth, values.current_email, values.password)
            .then((command_result) => {
                dispatch(set_token({
                    token: command_result.user.uid
                }))
                set_open_reauthenticate_modal(false);
            })
            .catch((command_result) => {
                toast.error(command_result.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
    }

    const reauthentication_formik = useFormik({
        initialValues: reauthentication_initial_values,
        validationSchema: reauthentication_validation_schema,
        onSubmit: action_submit
    });

    const profile_formik = useFormik({
        initialValues: profile_initial_values,
        validationSchema: profile_validation_schema,
        onSubmit: action_edit_profile
    });

    const password_formik = useFormik({
        initialValues: password_initial_values,
        validationSchema: password_validation_schema,
        onSubmit: action_edit_password
    });

    const handler_close_reauthenticate_modal = () => {
        set_open_reauthenticate_modal(false)
    }

    const handler_close_password_modal = () => {
        set_open_password_modal(false)
    }

    const handler_open_password_modal = () => {
        set_open_password_modal(true)
    }

    useEffect(() => {

        const user_obj = {
            user_name: user_data.user?.name!,
            email: user_data.user?.email!
        }

        profile_formik.setValues(user_obj);
        reauthentication_formik.setFieldValue("current_email", user_data.user?.email)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user_data.user?.name])

    const action_delete_user = () => {
        deleteUser(auth.currentUser!)
            .then(() => {
                dispatch(set_token({
                    token: ""
                }))
            })
            .catch(() => {
                set_open_reauthenticate_modal(true)
            })
    }

    return {
        avatar_name,
        toggle_menu,
        home,
        handler_onView_account,
        action_signout,
        view_account,
        user_info,
        handler_open_profile_modal,
        handler_close_profile_modal,
        open_profile_modal,
        action_edit: profile_formik.handleSubmit,
        form_data: profile_formik.values,
        handleBlur: profile_formik.handleBlur,
        handleChange: profile_formik.handleChange,
        reauthenticate: {
            handler_close_reauthenticate_modal,
            action_submit: reauthentication_formik.handleSubmit,
            open_reauthenticate_modal,
            handleBlur: reauthentication_formik.handleBlur,
            handleChange: reauthentication_formik.handleChange,
            reauthenticate_form_data: reauthentication_formik.values
        },
        password: {
            action_submit: password_formik.handleSubmit,
            handleBlur: password_formik.handleBlur,
            handleChange: password_formik.handleChange,
            handler_close_password_modal,
            handler_open_password_modal,
            open_password_modal,
            password_form_data: password_formik.values
        },
        action_delete_user
    }
}
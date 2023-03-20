import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAccountSelector, get_identity, set_token, sign_out } from "../../Auth/redux";
import { IAccountModel, IFormModel, IReauthenticateModal } from "./model";
import { auth } from "../../../Firebase/firbase-config";
import { useAppDispatch } from "../../../Redux/redux-hooks";
import { toast } from "react-toastify";
import *as yup from 'yup';
import { useFormik } from "formik";
import { signInWithEmailAndPassword, updateEmail, updateProfile } from "firebase/auth";
export const useContainer = (): IFormModel => {

    const user_data = useSelector(getAccountSelector);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [name, set_name] = useState("");
    const [view_account, set_view_account] = useState<boolean>(false);
    const [user_info, set_user_info] = useState({})
    const [open_profile_modal, set_open_profile_modal] = useState(false);
    const [open_reauthenticate_modal, set_open_reauthenticate_modal] = useState<boolean>(false);

    useEffect(() => {
        const first_name = user_data.user?.name?.charAt(0);
        const last_name = user_data.user?.name?.search(" ");
        const second_letter = user_data.user?.name?.charAt(1);

        if (last_name) {
            if (last_name === -1) {
                set_name(first_name?.concat(second_letter!)!)
            } else {
                set_name(first_name?.concat(user_data.user!.name!.charAt(last_name + 1))!)
            }
        }

        set_user_info({
            full_name: user_data.user?.name,
            email: user_data.user?.email
        })
    }, [user_data])

    const toggle_menu = () => {
        navigate("/")
    }

    const handler_onView_account = () => {
        set_view_account(view_account => !view_account);
    }

    const action_signout = () => {
        auth.signOut()
            .then(() => {
                dispatch(sign_out())
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

    const profile_validation_schema = yup.object().shape({
        user_name: yup.string().required("This field is required"),
        email:yup.string().email("Invalid email format").required("This field is required")
    });

    const reauthentication_validation_schema = yup.object().shape({
        password: yup.string().min(4).required("This field is required"),
        current_email: yup.string().email("Invalid email format").required("This field is required"),
    });

    const action_edit_profile = (values: IAccountModel) => {
        console.log("g")
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
            .catch((command_result) => {
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

    const handler_close_reauthenticate_modal = () => {
        set_open_reauthenticate_modal(false)
    }

    useEffect(() => {

        const user_obj = {
            user_name: user_data.user?.name!,
            email: user_data.user?.email!
        }

        profile_formik.setValues(user_obj);
        reauthentication_formik.setFieldValue("current_email",user_data.user?.email)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user_data.user?.name])

    return {
        name,
        toggle_menu,
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
            handleBlur:reauthentication_formik.handleBlur,
            handleChange:reauthentication_formik.handleChange,
            reauthenticate_form_data:reauthentication_formik.values
        }
    }
}
import { FormikErrors, useFormik } from "formik";
import { IFormModel, IModel } from "./model";
import *as yup from 'yup';
import { route_names } from "../../../Routes/route-name";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase/firbase-config";
import { useAppDispatch } from "../../../Redux/redux-hooks";
import { set_token } from "../redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useContainer = (): IFormModel => {

    const app_routes = route_names();
    const dispatch = useAppDispatch();
    const navigate= useNavigate()

    const initial_values: IModel = {
        email: "",
        password: ""
    };

    const validation_schema = yup.object().shape({
        email: yup.string().email("Invalid email format").required("This field is required"),
        password: yup.string().min(4).required("This field is required")
    });

    const action_submit = (values: IModel) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((command_result) => {
                dispatch(set_token({
                    token: command_result.user.uid
                }))
                navigate(app_routes.today_path)
            })
            .catch((command_result) => {
                toast.error(command_result.message,{
                    position:toast.POSITION.TOP_RIGHT
                })
            })
    }

    const formik = useFormik({
        initialValues: initial_values,
        validationSchema: validation_schema,
        onSubmit: action_submit
    });

    const form_errors: FormikErrors<IModel> = {
        email: formik.submitCount || formik.touched.email ? formik.errors.email : "",
        password: formik.submitCount || formik.touched.password ? formik.errors.password : ""
    };

    return {
        path:{
            signup: app_routes.signup_path,
            forgot_password:app_routes.forgot_password_path
        },
        action_submit: formik.handleSubmit,
        form_data: formik.values,
        form_errors: form_errors,
        handleChange: formik.handleChange,
        handleBlur: formik.handleBlur
    }
}
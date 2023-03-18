import { FormikErrors, useFormik } from "formik";
import { IFormModel, IModel } from "./model";
import *as yup from 'yup';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../Firebase/firbase-config";
import { route_names } from "../../../Routes/route-name";
import { toast } from "react-toastify";

export const useContainer = (): IFormModel => {

    const app_routes = route_names();

    const initial_values: IModel = {
        email: "",
    };

    const validation_schema = yup.object().shape({
        email: yup.string().email("Invalid email format").required("This field is required")
    });

    const action_submit = (values: IModel) => {
        sendPasswordResetEmail(auth, values.email)
            .then(() => {
                toast.success("Password reset email sent", {
                    position: toast.POSITION.TOP_RIGHT
                })

            })
            .catch((command_result) => {
                toast.error(command_result.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
    }

    const formik = useFormik({
        initialValues: initial_values,
        validationSchema: validation_schema,
        onSubmit: action_submit
    });

    const form_errors: FormikErrors<IModel> = {
        email: formik.submitCount || formik.touched.email ? formik.errors.email : ""
    };

    return {
        login_path: app_routes.login_path,
        action_submit: formik.handleSubmit,
        form_data: formik.values,
        form_errors: form_errors,
        handleChange: formik.handleChange,
        handleBlur: formik.handleBlur
    }
}
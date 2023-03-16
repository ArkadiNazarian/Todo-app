import { FormikErrors, useFormik } from "formik";
import { IFormModel, IModel } from "./model";
import *as yup from 'yup';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../../Firebase/firbase-config";
import { route_names } from "../../../Routes/route-name";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";

export const useContainer = (): IFormModel => {

    const app_routes = route_names();
    const navigate = useNavigate();
    
    const add_project_collection = collection(db, "project");

    const initial_values: IModel = {
        email: "",
        password: "",
        name: ""
    };

    const validation_schema = yup.object().shape({
        email: yup.string().email("Invalid email format").required("This field is required"),
        password: yup.string().min(6).required("This field is required"),
        name: yup.string().min(4).required("This field is required")
    });

    const action_submit = (values: IModel) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((command_result) => {
                const user = command_result.user;
                console.log(user.uid)
                updateProfile(user, {
                    displayName: values.name
                })
                    .then(() => {
                        addDoc(add_project_collection, {
                            project_title: "🏠Home",
                            color: "",
                            user_id: user.uid
                        })
                            .then(() => { 
                                navigate(app_routes.login_path);  
                            })
                            .catch((command_result) => { 
                                toast.error(command_result.message, {
                                    position: toast.POSITION.TOP_RIGHT
                                })
                            })
                    })
                    .catch((command_result)=>{
                        toast.error(command_result.message,{
                            position:toast.POSITION.TOP_RIGHT
                        })
                    })
            })
            .catch((command_result)=>{
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
        password: formik.submitCount || formik.touched.password ? formik.errors.password : "",
        name: formik.submitCount || formik.touched.name ? formik.errors.name : ""
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
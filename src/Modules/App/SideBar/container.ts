import { useState } from "react"
import { IFormModel, IModel } from "./model";
import *as yup from 'yup';
import { FormikErrors, useFormik } from "formik";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../Firebase/firbase-config";
import { toast } from "react-toastify";

export const useContainer = (): IFormModel => {

    const collect = collection(db, "tasks");

    const [open_modal, set_open_modal] = useState(false);

    const validation_schema = yup.object().shape({
        task_title: yup.string().required(),
        description: yup.string()
    });

    const initial_values: IModel = {
        task_title: "",
        description: "",
        due_date: null,
        priority: 4
    };

    const handler_open_modal = () => {
        set_open_modal(true);
    }

    const handler_close_modal = () => {
        set_open_modal(false);
        formik.setValues({ description: "", due_date: null, priority: 4, task_title: "" });
    }

    const action_submit = (values: IModel) => {
        addDoc(collect, {
            task_title: values.task_title,
            description: values.description,
            due_date: values.due_date?.format("DD-MM-YYYY"),
            priority: values.priority
        })
            .then(() => {
                handler_close_modal();
                toast.success("Task was added successfully", {
                    position: toast.POSITION.TOP_RIGHT
                })
                formik.setValues({ description: "", due_date: null, priority: 4, task_title: "" });
            })
            .catch((command_result) => {
                handler_close_modal();
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
        task_title: formik.submitCount || formik.touched.task_title ? formik.errors.task_title : ""
    };

    return {
        open_modal,
        handler_open_modal,
        handler_close_modal,
        action_submit: formik.handleSubmit,
        form_data: formik.values,
        form_errors: form_errors,
        handleChange: formik.handleChange,
        handleBlur: formik.handleBlur,
        setFieldValue: formik.setFieldValue
    }
}
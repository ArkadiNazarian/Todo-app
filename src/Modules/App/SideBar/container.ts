import { useState } from "react"
import { IFormModel, IModel } from "./model";
import *as yup from 'yup';
import { FormikErrors, useFormik } from "formik";

export const useContainer = (): IFormModel => {
    const [open_modal, set_open_modal] = useState(false);

    const validation_schema = yup.object().shape({
        task_title: yup.string(),
        description: yup.string()
    });

    const initial_values: IModel = {
        task_title: "",
        description: "",
        date: null
    };

    const handler_open_modal = () => {
        set_open_modal(true);
    }

    const handler_close_modal = () => {
        set_open_modal(false);
    }

    const action_submit = (values: IModel) => {
        console.log(values.date?.format("DD-MM-YYYY"))
        formik.setValues({ date: null, description: "", task_title: "" })
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
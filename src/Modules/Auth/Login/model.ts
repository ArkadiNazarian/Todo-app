import { FormikErrors } from "formik";

export interface IModel {
    email: string;
    password: string;
}

export interface IFormModel {
    signup_path: string;
    action_submit: () => void;
    form_data: IModel;
    form_errors: FormikErrors<IModel>;
    handleChange: (e: any) => void;
    handleBlur: (e: any) => void;
}
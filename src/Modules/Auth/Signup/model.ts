import { FormikErrors } from "formik";

export interface IModel {
    email: string;
    password: string;
    name: string;
}

export interface IFormModel {
    login_path: string;
    action_submit: () => void;
    form_data: IModel;
    form_errors: FormikErrors<IModel>;
    handleChange: (e: any) => void;
    handleBlur: (e: any) => void;
}
import { Dayjs } from "dayjs";
import { FormikErrors } from "formik";

export interface IModel {
    task_title: string;
    description: string;
    date: Dayjs | null;
}

export interface IFormModel {
    handler_open_modal: () => void;
    open_modal: boolean;
    handler_close_modal: () => void;
    action_submit: () => void;
    handleChange: (e: any) => void;
    handleBlur: (e: any) => void;
    form_errors: FormikErrors<IModel>;
    form_data: IModel;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<IModel>>
}
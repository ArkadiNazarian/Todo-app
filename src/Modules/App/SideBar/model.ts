import { Dayjs } from "dayjs";
import { FormikErrors } from "formik";

export interface ITaskModel {
    task_title: string;
    description: string;
    due_date: Dayjs | null;
    priority: number;
    project_id?: string;
}

export interface IProjectModel {
    project_title: string;
    color: string;
}

export interface IFormModel {
    task: {
        handler_open_task_modal: () => void;
        open_task_modal: boolean;
        handler_close_task_modal: () => void;
        action_add_task: () => void;
        handleChange: (e: any) => void;
        handleBlur: (e: any) => void;
        task_form_data: ITaskModel;
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<ITaskModel>>;
    };
    project: {
        handler_open_project_modal: () => void;
        open_project_modal: boolean;
        handler_close_project_modal: () => void;
        action_add_project: () => void;
        handleChange: (e: any) => void;
        handleBlur: (e: any) => void;
        project_form_data: IProjectModel;
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<IProjectModel>>;
    };
    project_list: Array<{ id: string; project_title: string; color: string; }>

}
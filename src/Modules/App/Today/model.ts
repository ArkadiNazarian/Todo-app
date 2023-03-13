import { Dayjs } from "dayjs";
import { FormikErrors } from "formik";
import * as enums from "../../../Enums/enums";

export interface ITaskModel {
    id: string;
    task_title: string;
    description: string;
    priority: enums.Priority;
    due_date: string;
    project_id: string;
}

export interface IFormModel {
    task_list: Array<ITaskModel>;
    task_details?: IModel;
    date?: { month: string; week_day: string; day: number };
    open_task_modal: boolean;
    handler_open_task_modal: (id: string) => void;
    handler_close_task_modal: () => void;
    handler_onEdit_title: () => void;
    handler_onEdit_priority: () => void;
    handler_onEdit_description: () => void;
    edit: { edit_title: boolean; edit_description: boolean; edit_priority: boolean; edit_due_date: boolean; };
    action_submit: () => void;
    form_data: IModel;
    handleChange: (e: any) => void;
    handleBlur: (e: any) => void;
    priority_list: Array<{ priority_color: string; priority_title: string; value: enums.Priority }>;
    handler_update_priority: (value: enums.Priority) => void;
    handler_onEdit_due_date: () => void;
    ac:()=>void;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<ITaskModel>>;
}

export interface IModel {
    task_title?: string;
    description?: string;
    priority_color?: string;
    priority_title?: string;
    due_date?: string;
    due: Dayjs | null;
    project_title?: string;
    project_color?: string;
    priority?: string
}
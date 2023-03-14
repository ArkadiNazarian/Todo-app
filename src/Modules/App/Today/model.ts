import { Dayjs } from "dayjs";
import { FormikErrors } from "formik";
import * as enums from "../../../Enums/enums";

export interface IGetTaskModel {
    id: string;
    task_title: string;
    description: string;
    priority: enums.Priority;
    due_date: string;
    project_id: string;
}

export interface ISetTaskModel {
    task_title?: string;
    description?: string;
    priority_color?: string;
    priority_title?: string;
    due_date?: string;
    edited_due_date: Dayjs | null;
    project_title?: string;
    project_color?: string;
    priority?: string;
}

export interface IFormModel {
    task_list: Array<IGetTaskModel>;
    task_details?: ISetTaskModel;
    date?: { month: string; week_day: string; day: number };
    open_task_modal: boolean;
    handler_open_task_modal: (id: string) => void;
    handler_close_task_modal: () => void;
    handler_onEdit_title: () => void;
    handler_onEdit_priority: () => void;
    handler_onEdit_description: () => void;
    edit: IEditModel;
    action_submit: () => void;
    form_data: ISetTaskModel;
    handleChange: (e: any) => void;
    handleBlur: (e: any) => void;
    priority_list: Array<{ priority_color: string; priority_title: string; value: enums.Priority }>;
    handler_update_priority: (value: enums.Priority) => void;
    handler_update_project: (project_id: string) => void;
    handler_onEdit_due_date: () => void;
    handler_onEdit_project: () => void;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<IGetTaskModel>>;
    project_list: Array<{ id: string; project_title: string; color: string; }>;
}


export interface IDateModel {
    month: string;
    week_day: string;
    day: number
}

export interface IEditModel {
    edit_title: boolean;
    edit_due_date: boolean;
    edit_description: boolean;
    edit_priority: boolean;
    edit_project: boolean;
}

export interface IPriorityLookup {
    priority_color: string;
    priority_title: string;
    value: enums.Priority;
}
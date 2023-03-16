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
    sub_task:Array<ISubTaskModel>;
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

export interface ISubTaskModel {
    sub_task_title: string;
    sub_task_description: string;
    sub_task_priority: enums.Priority;
    id:string
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
    sub_task:{
        sub_task_list:Array<ISubTaskModel>;
        handler_open_sub_task_modal: () => void;
        open_sub_task_modal: boolean;
        handler_close_sub_task_modal: () => void;
        action_add_sub_task: () => void;
        handleChange: (e: any) => void;
        handleBlur: (e: any) => void;
        task_form_data: ISubTaskModel;
    }
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
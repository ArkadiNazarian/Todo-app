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
    sub_task: Array<ISubTaskModel>;
}

export interface ISetTaskModel {
    id?: string;
    task_title?: string;
    description?: string;
    priority_color?: string;
    priority_title?: string;
    due_date?: string;
    edited_due_date: Dayjs | null;
    project_title?: string;
    project_color?: string;
    priority?: string;
    sub_task?: Array<ISubTaskModel>;
}

export interface ISubTaskModel {
    sub_task_title: string;
    sub_task_description: string;
    sub_task_priority: enums.Priority;
    id: string
}

export interface IEditSubTaskModel {
    edit_sub_task_title: string;
    edit_sub_task_description: string;
    edit_sub_task_priority: enums.Priority;
    id: string
}


export interface IFormModel {
    task_list: Array<IGetTaskModel>;
    task_details?: ISetTaskModel;
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
    action_delete_task: (id: string) => void;
    sub_task: {
        handler_open_sub_task_modal: () => void;
        open_sub_task_modal: boolean;
        handler_close_sub_task_modal: () => void;
        action_add_sub_task: () => void;
        handleChange: (e: any) => void;
        handleBlur: (e: any) => void;
        task_form_data: ISubTaskModel;
    };
    edit_sub_task: {
        open_edit_sub_task_modal: boolean;
        handler_onView_more: (id: string) => void;
        open_more_list: boolean;
        action_delete_sub_task: (id: string) => void;
        edit_list: string;
        handler_open_edit_sub_task_modal: (id: string) => void;
        handler_close_edit_sub_task_modal: () => void;
        action_edit_sub_task: () => void;
        handleChange: (e: any) => void;
        handleBlur: (e: any) => void;
        task_form_data: IEditSubTaskModel;
    };
    handler_on_mouse_over_done_icon: (id: string) => void;
    handler_on_mouse_out_done_icon: () => void;
    action_undo: (id: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    view_done_icon: boolean;
    done: string;
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
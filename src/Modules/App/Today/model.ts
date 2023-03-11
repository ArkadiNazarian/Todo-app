import { Dayjs } from "dayjs";
import * as enums from "../../../Enums/enums";

export interface ITaskModel {
    id: string;
    task_title: string;
    description: string;
    priority: enums.Priority;
    due_date: Dayjs;
    project_id: string;
}

export interface IFormModel {
    task_list: Array<ITaskModel>;
    task_details?: { task_title: string; description: string; priority: string; due_date: Dayjs; project_title: string; };
    date?: { month: string; week_day: string; day: number };
    open_task_modal: boolean;
    handler_open_task_modal: (id: string) => void;
    handler_close_task_modal: () => void;
    // task_modal: {
    //     title: string;
    // }
}
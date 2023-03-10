import { Dayjs } from "dayjs";
import * as enums from "../../../Enums/enums";

export interface IFormModel {
    task_list: Array<{ id: string, description: string, due_date: Dayjs, project_id: string, priority: enums.Priority, task_title: string }>;
    date?: { month: string; week_day: string; day: number }
}
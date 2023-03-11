import dayjs from "dayjs";
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getMonthTitle, getPriorityColor, getWeekdayTitle } from "../../../Enums/enum-parser";
import { db } from "../../../Firebase/firbase-config";
import { getAccountSelector } from "../../Auth/redux";
import { IFormModel, ITaskModel } from "./model";
import { Dayjs } from "dayjs";

export const useContainer = (): IFormModel => {

    const user_data = useSelector(getAccountSelector);

    const get_task_collection = query(collection(db, "tasks"), where("user_id", "==", user_data.token), where("due_date", "==", dayjs().format("DD-MM-YYYY")));

    const [task_list, set_task_list] = useState<Array<ITaskModel>>([]);
    const [date, set_date] = useState<{ month: string; week_day: string; day: number }>();
    const [open_task_modal, set_open_task_modal] = useState(false);
    const [task_details, set_task_details] = useState<{ task_title: string; description: string; priority: string; due_date: Dayjs;project_title:string; }>();

    useEffect(() => {
        const get_month = new Date().getMonth();
        const get_date = new Date().getDay();

        set_date({
            month: getMonthTitle(get_month)!,
            week_day: getWeekdayTitle(get_date)!,
            day: new Date().getDate()
        })

    }, [])

    onSnapshot(get_task_collection, (snapshot) => {
        set_task_list(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Array<ITaskModel>);
    })

    const handler_open_task_modal = (id: string) => {
        const task_details = doc(db, "tasks", id);

        getDoc(task_details)
            .then((command_result) => {

                const task_data = command_result.data() as ITaskModel;
                const project_title = doc(db, "project", task_data.project_id);
                getDoc(project_title)
                    .then((command_result) => {
                        const project_data = command_result.data() as { project_title: string;};
                        set_task_details({
                            task_title: task_data.task_title,
                            description: task_data.description,
                            priority: getPriorityColor(task_data.priority)!,
                            project_title: project_data.project_title,
                            due_date: task_data.due_date
                        })
                        set_open_task_modal(true);
                    })
                    .catch((command_result) => {
                        toast.error(command_result.message, {
                            position: toast.POSITION.TOP_RIGHT
                        })
                    })

            })
            .catch((command_result) => {
                toast.error(command_result.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })

        

    }

    const handler_close_task_modal = () => {
        set_open_task_modal(false);
    }


    return {
        task_list,
        date,
        open_task_modal,
        handler_open_task_modal,
        handler_close_task_modal,
        task_details
    }

}
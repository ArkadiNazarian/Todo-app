import { Dayjs } from "dayjs";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMonthTitle, getWeekdayTitle } from "../../../Enums/enum-parser";
import { db } from "../../../Firebase/firbase-config";
import { getAccountSelector } from "../../Auth/redux";
import { IFormModel } from "./model";

export const useContainer = (): IFormModel => {

    const user_data = useSelector(getAccountSelector);

    const get_task_collection = query(collection(db, "tasks"), where("user_id", "==", user_data.token));

    const [task_list, set_task_list] = useState<Array<{ id: string, description: string, due_date: Dayjs, project_id: string, priority: number, task_title: string }>>([])
    const [date, set_date] = useState<{ month: string; week_day: string; day: number }>();

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
        set_task_list(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Array<{ id: string, description: string, due_date: Dayjs, project_id: string, priority: number, task_title: string }>);
    })
   

    return {
        task_list,
        date
    }

}
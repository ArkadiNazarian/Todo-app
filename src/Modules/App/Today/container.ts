import dayjs from "dayjs";
import { collection, doc, getDoc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getMonthTitle, getPriorityColor, getPriorityTitle, getWeekdayTitle } from "../../../Enums/enum-parser";
import { db } from "../../../Firebase/firbase-config";
import { getAccountSelector } from "../../Auth/redux";
import { IFormModel, IModel, ITaskModel } from "./model";
import *as yup from 'yup';
import { useFormik } from "formik";
import * as enums from "../../../Enums/enums";

export const useContainer = (): IFormModel => {

    const user_data = useSelector(getAccountSelector);

    const get_task_collection = query(collection(db, "tasks"), where("user_id", "==", user_data.token), where("due_date", "==", dayjs().format("DD-MM-YYYY")));

    const [task_list, set_task_list] = useState<Array<ITaskModel>>([]);
    const [date, set_date] = useState<{ month: string; week_day: string; day: number }>();
    const [open_task_modal, set_open_task_modal] = useState(false);
    const [task_details, set_task_details] = useState<IModel>();
    const [edit, set_edit] = useState<{ edit_title: boolean; edit_description: boolean; edit_priority: boolean }>({ edit_title: false, edit_description: false, edit_priority: false });
    const [task_id, set_task_id] = useState("");
    const [priority_list, set_priority_list] = useState<Array<{ priority_color: string; priority_title: string; value: enums.Priority }>>([]);


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
        const get_task_details = doc(db, "tasks", id);
        set_task_id(id);
        getDoc(get_task_details)
            .then((command_result) => {

                const task_data = command_result.data() as ITaskModel;
                const project_title = doc(db, "project", task_data.project_id);
                getDoc(project_title)
                    .then((command_result) => {
                        const project_data = command_result.data() as { project_title: string; color: string; };
                        set_task_details({
                            task_title: task_data.task_title,
                            description: task_data.description,
                            priority_title: getPriorityTitle(task_data.priority)!,
                            priority_color: getPriorityColor(task_data.priority)!,
                            project_title: project_data.project_title,
                            due_date: task_data.due_date,
                            project_color: project_data.color
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

    const handler_onEdit_title = () => {
        set_edit({
            edit_description: false,
            edit_priority: false,
            edit_title: !edit.edit_title
        });
    }

    const handler_onEdit_priority = () => {
        set_edit({
            edit_description: false,
            edit_priority: !edit.edit_priority,
            edit_title: false
        });
    }

    const handler_onEdit_description = () => {
        set_edit({
            edit_description: !edit.edit_description,
            edit_priority: false,
            edit_title: false
        });
    }

    const initial_values: IModel = {
        task_title: "",
        description: ""
    };

    const validation_schema = yup.object().shape({
        task_title: yup.string().required("This field is required")
    });

    const action_submit = (values: IModel) => {
        const get_task_details = doc(db, "tasks", task_id);

        updateDoc(get_task_details, { task_title: values.task_title, description: values.description, priority: values.priority })
            .then(() => {
                set_task_details({ ...task_details, task_title: values.task_title, description: values.description });
                set_edit({
                    edit_description: false,
                    edit_priority: false,
                    edit_title: false
                });
            })
            .catch((command_result) => {
                console.log(command_result)
            })
    }

    const handler_update_priority = (value: enums.Priority) => {
        const get_task_details = doc(db, "tasks", task_id);

        updateDoc(get_task_details, { priority: value })
            .then(() => {
                set_task_details({ ...task_details, priority_color: getPriorityColor(value), priority_title: getPriorityTitle(value) });
                set_edit({
                    edit_description: false,
                    edit_priority: false,
                    edit_title: false
                });
            })
            .catch((command_result) => {
                console.log(command_result)
            })

    }

    const formik = useFormik({
        initialValues: initial_values,
        validationSchema: validation_schema,
        onSubmit: action_submit
    });

    useEffect(() => {
        formik.setValues(task_details!);

        set_priority_list([
            {
                priority_color: "#bd0416",
                priority_title: "Priority 1",
                value: enums.Priority.Red
            },
            {
                priority_color: "#f57c02",
                priority_title: "Priority 2",
                value: enums.Priority.Orange
            },
            {
                priority_color: "#0356fc",
                priority_title: "Priority 3",
                value: enums.Priority.Blue
            },
            {
                priority_color: "#cfcfcf",
                priority_title: "Priority 4",
                value: enums.Priority.White
            },
        ])

    }, [task_details])



    return {
        task_list,
        date,
        open_task_modal,
        handler_open_task_modal,
        handler_close_task_modal,
        task_details,
        handler_onEdit_title,
        edit,
        action_submit: formik.handleSubmit,
        form_data: formik.values,
        handleChange: formik.handleChange,
        handleBlur: formik.handleBlur,
        handler_onEdit_description,
        handler_onEdit_priority,
        priority_list,
        handler_update_priority
    }

}
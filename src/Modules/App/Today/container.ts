import dayjs from "dayjs";
import { arrayRemove, arrayUnion, collection, doc, getDoc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getMonthTitle, getPriorityColor, getPriorityTitle, getWeekdayTitle } from "../../../Enums/enum-parser";
import { db } from "../../../Firebase/firbase-config";
import { getAccountSelector } from "../../Auth/redux";
import { IDateModel, IEditModel, IFormModel, ISetTaskModel, IPriorityLookup, IGetTaskModel, ISubTaskModel } from "./model";
import *as yup from 'yup';
import { useFormik } from "formik";
import * as enums from "../../../Enums/enums";

export const useContainer = (): IFormModel => {

    const user_data = useSelector(getAccountSelector);

    const get_tasks_collection = query(collection(db, "tasks"), where("user_id", "==", user_data.token), where("due_date", "==", dayjs().format("DD-MM-YYYY")));
    const get_projects_collection = query(collection(db, "project"), where("user_id", "==", user_data.token));

    const [task_list, set_task_list] = useState<Array<IGetTaskModel>>([]);
    const [date, set_date] = useState<IDateModel>();
    const [open_task_modal, set_open_task_modal] = useState<boolean>(false);
    const [task_details, set_task_details] = useState<ISetTaskModel>();
    const [edit, set_edit] = useState<IEditModel>({ edit_title: false, edit_description: false, edit_priority: false, edit_due_date: false, edit_project: false });
    const [task_id, set_task_id] = useState<string>("");
    const [priority_list, set_priority_list] = useState<Array<IPriorityLookup>>([]);
    const [project_list, set_project_list] = useState<Array<{ id: string; project_title: string; color: string; }>>([])
    const [open_sub_task_modal, set_open_sub_task_modal] = useState(false);
    const [sub_task_list, set_sub_task_list] = useState<Array<ISubTaskModel>>([]);

    useEffect(() => {
        const get_month = new Date().getMonth();
        const get_date = new Date().getDay();

        set_date({
            month: getMonthTitle(get_month)!,
            week_day: getWeekdayTitle(get_date)!,
            day: new Date().getDate()
        })

    }, [])

    onSnapshot(get_tasks_collection, (snapshot) => {

        const task_lists = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Array<IGetTaskModel>;
        set_task_list(task_lists)

        const task_obj=task_list.find((value)=>value)
        set_sub_task_list(task_obj?.sub_task!)
    })

    const handler_open_sub_task_modal = () => {
        set_open_sub_task_modal(true);
    }

    const handler_close_sub_task_modal = () => {
        set_open_sub_task_modal(false);
        sub_task_formik.setValues({ sub_task_description: "", sub_task_priority: enums.Priority.White, sub_task_title: "",id:"" });
    }


    const handler_open_task_modal = (id: string) => {
        const get_task_details = doc(db, "tasks", id);
        set_task_id(id);
        getDoc(get_task_details)
            .then((command_result) => {

                const task_data = command_result.data() as IGetTaskModel;
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
                            project_color: project_data.color,
                            edited_due_date: dayjs()
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
        set_edit({
            edit_description: false,
            edit_due_date: false,
            edit_priority: false,
            edit_title: false,
            edit_project: false
        });
    }

    const handler_onEdit_title = () => {
        set_edit({
            edit_description: false,
            edit_due_date: false,
            edit_priority: false,
            edit_project: false,
            edit_title: !edit.edit_title
        });
    }

    const handler_onEdit_priority = () => {
        set_edit({
            edit_description: false,
            edit_priority: !edit.edit_priority,
            edit_title: false,
            edit_due_date: false,
            edit_project: false
        });
    }

    const handler_onEdit_description = () => {
        set_edit({
            edit_description: !edit.edit_description,
            edit_priority: false,
            edit_due_date: false,
            edit_title: false,
            edit_project: false
        });
    }

    const initial_values: ISetTaskModel = {
        task_title: "",
        description: "",
        due_date: "",
        priority: "",
        priority_color: "",
        priority_title: "",
        project_color: "",
        project_title: "",
        edited_due_date: null
    };

    const validation_schema = yup.object().shape({
        task_title: yup.string().required("This field is required")
    });

    const handler_onEdit_due_date = () => {
        set_edit({
            edit_description: false,
            edit_priority: false,
            edit_due_date: !edit.edit_due_date,
            edit_title: false,
            edit_project: false
        });
    }

    const handler_onEdit_project = () => {
        set_edit({
            edit_description: false,
            edit_priority: false,
            edit_due_date: false,
            edit_title: false,
            edit_project: !edit.edit_project
        });
    }

    const action_submit = (values: ISetTaskModel) => {
        const get_task_details = doc(db, "tasks", task_id);

        updateDoc(get_task_details, { task_title: values.task_title, description: values.description, due_date: values.edited_due_date?.format("DD-MM-YYYY") ?? dayjs().format("DD-MM-YYYY") })
            .then(() => {
                set_task_details({ ...task_details, task_title: values.task_title, description: values.description, edited_due_date: dayjs() });
                set_edit({
                    edit_description: false,
                    edit_priority: false,
                    edit_due_date: false,
                    edit_title: false,
                    edit_project: false
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
                set_task_details({ ...task_details, priority_color: getPriorityColor(value), priority_title: getPriorityTitle(value), edited_due_date: dayjs() });
                set_edit({
                    edit_description: false,
                    edit_priority: false,
                    edit_due_date: false,
                    edit_title: false,
                    edit_project: false
                });
            })
            .catch((command_result) => {
                console.log(command_result)
            })
    }

    const handler_update_project = (project_id: string) => {
        const get_task_details = doc(db, "tasks", task_id);

        updateDoc(get_task_details, { project_id: project_id })
            .then(() => {
                const project_title = doc(db, "project", project_id);
                getDoc(project_title)
                    .then((command_result) => {
                        const project_details = command_result.data() as { project_title: string; color: string; };
                        set_task_details({ ...task_details, project_title: project_details.project_title, project_color: project_details.color, edited_due_date: dayjs() });
                        set_edit({
                            edit_description: false,
                            edit_priority: false,
                            edit_due_date: false,
                            edit_title: false,
                            edit_project: false
                        });
                    })

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [task_details])

    onSnapshot(get_projects_collection, (snapshot) => {
        const array = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Array<{ id: string, color: string, project_title: string }>;
        set_project_list(array);

    })

    const sub_task_initial_values: ISubTaskModel = {
        sub_task_title: "",
        sub_task_description: "",
        id:"",
        sub_task_priority: enums.Priority.White,
    };

    const random = () => {
        // Declare all characters
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        // Pick characers randomly
        let str = '';
        for (let i = 0; i < 20; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return str;

    };

    const action_add_sub_task = (values: ISubTaskModel) => {
        const get_task_details = doc(db, "tasks", task_id);

        updateDoc(get_task_details, {

            // sub_task: arrayRemove({
            //     id: "VHRRD0h4lD26Juz7zq8W",
            //     sub_task_title: "2",
            //     sub_task_description: "3",
            //     sub_task_priority: 0,
            // })

            sub_task: arrayUnion({
                sub_task_title: values.sub_task_title,
                sub_task_description: values.sub_task_description,
                sub_task_priority: values.sub_task_priority,
                id: random()
            })

        })
            .then(() => {
                handler_close_task_modal();
                toast.success("Task was added successfully", {
                    position: toast.POSITION.TOP_RIGHT
                })
                sub_task_formik.setValues({ sub_task_description: "", sub_task_priority: enums.Priority.White, sub_task_title: "",id:"" });
            })
            .catch((command_result) => {
                handler_close_sub_task_modal();
                toast.error(command_result.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
    }

    const sub_task_validation_schema = yup.object().shape({
        sub_task_title: yup.string().required(),
        sub_task_description: yup.string()
    });

    const sub_task_formik = useFormik({
        initialValues: sub_task_initial_values,
        validationSchema: sub_task_validation_schema,
        onSubmit: action_add_sub_task
    });

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
        handler_update_priority,
        handler_update_project,
        handler_onEdit_due_date,
        setFieldValue: formik.setFieldValue,
        project_list,
        handler_onEdit_project,
        sub_task: {
            sub_task_list,
            open_sub_task_modal,
            handler_open_sub_task_modal,
            handler_close_sub_task_modal,
            action_add_sub_task: sub_task_formik.handleSubmit,
            task_form_data: sub_task_formik.values,
            handleChange: sub_task_formik.handleChange,
            handleBlur: sub_task_formik.handleBlur
        }
    }

}
import { useEffect, useState } from "react"
import { IFormModel, IProjectModel, ITaskModel } from "./model";
import *as yup from 'yup';
import { useFormik } from "formik";
import { addDoc, collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../Firebase/firbase-config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getAccountSelector } from "../../Auth/redux";
import { useLocation, useNavigate } from "react-router-dom";
import { route_names } from "../../../Routes/route-name";
import * as enums from "../../../Enums/enums";
import dayjs from "dayjs";

export const useContainer = (): IFormModel => {

    const user_data = useSelector(getAccountSelector);
    const navigate = useNavigate();
    const app_routes = route_names();
    const location = useLocation();
    const [on_today, set_on_today] = useState(false);
    const [on_inbox, set_on_inbox] = useState(false);
    const [tasks_inbox_number, set_tasks_inbox_number] = useState<number>();
    const [tasks_today_number, set_tasks_today_number] = useState<number>();

    const get_tasks_today_collection = query(collection(db, "tasks"), where("user_id", "==", user_data.token), where("due_date", "==", dayjs().format("DD-MM-YYYY")));
    const get_tasks_inbox_collection = query(collection(db, "tasks"), where("user_id", "==", user_data.token));

    useEffect(() => {
        switch (location.pathname) {
            case app_routes.inbox_path:
                set_on_inbox(true);
                set_on_today(false);
                break;
            case app_routes.today_path:
                set_on_inbox(false);
                set_on_today(true);
                break;
            default:
                set_on_inbox(false);
                set_on_today(true);
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    const add_task_collection = collection(db, "tasks");
    const get_project_collection = query(collection(db, "project"), where("user_id", "==", user_data.token));
    const add_project_collection = collection(db, "project");

    const [open_task_modal, set_open_task_modal] = useState(false);
    const [open_project_modal, set_open_project_modal] = useState(false);
    const [project_list, set_project_list] = useState<Array<{ id: string, color: string, project_title: string }>>([]);

    const task_validation_schema = yup.object().shape({
        task_title: yup.string().required(),
        description: yup.string()
    });

    const project_validation_schema = yup.object().shape({
        project_title: yup.string().required(),
        color: yup.string()
    });

    const project_initial_values: IProjectModel = {
        project_title: "",
        color: "#808080"
    };

    const task_initial_values: ITaskModel = {
        task_title: "",
        description: "",
        due_date: null,
        priority: enums.Priority.White,
        project_id: ""
    };

    const handler_open_task_modal = () => {
        task_formik.setValues({ description: "", due_date: null, priority: enums.Priority.White, task_title: "", project_id: project_list[0].id });
        set_open_task_modal(true);
    }

    const handler_open_project_modal = () => {
        set_open_project_modal(true);
    }

    const handler_close_task_modal = () => {
        set_open_task_modal(false);
        task_formik.setValues({ description: "", due_date: null, priority: enums.Priority.White, task_title: "", project_id: project_list[0].id });
    }

    const handler_close_project_modal = () => {
        set_open_project_modal(false);
        project_formik.setValues({ project_title: "", color: "#808080" });
    }

    const action_add_task = (values: ITaskModel) => {
        addDoc(add_task_collection, {
            task_title: values.task_title,
            description: values.description,
            due_date: values.due_date?.format("DD-MM-YYYY"),
            priority: values.priority,
            user_id: user_data.token,
            project_id: values.project_id
        })
            .then(() => {
                handler_close_task_modal();
                toast.success("Task was added successfully", {
                    position: toast.POSITION.TOP_RIGHT
                })
                task_formik.setValues({ description: "", due_date: null, priority: enums.Priority.White, task_title: "", project_id: project_list[0].id });
            })
            .catch((command_result) => {
                handler_close_task_modal();
                toast.error(command_result.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
    }

    const action_add_project = (values: IProjectModel) => {
        addDoc(add_project_collection, {
            project_title: values.project_title,
            color: values.color,
            user_id: user_data.token
        })
            .then(() => {
                handler_close_project_modal();
                toast.success("Project was added successfully", {
                    position: toast.POSITION.TOP_RIGHT
                })
                project_formik.setValues({ project_title: "", color: "#808080" });
            })
            .catch((command_result) => {
                handler_close_project_modal();
                toast.error(command_result.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
    }

    const task_formik = useFormik({
        initialValues: task_initial_values,
        validationSchema: task_validation_schema,
        onSubmit: action_add_task
    });

    const project_formik = useFormik({
        initialValues: project_initial_values,
        validationSchema: project_validation_schema,
        onSubmit: action_add_project
    });

    const goto_today = () => {
        navigate(app_routes.today_path);
    }

    const goto_inbox = () => {
        navigate(app_routes.inbox_path);
    }


    onSnapshot(get_project_collection, (snapshot) => {
        const array = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Array<{ id: string, color: string, project_title: string }>;
        set_project_list(array);
    })

    onSnapshot(get_tasks_today_collection, (snapshot) => {
        const task_lists = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        set_tasks_today_number(task_lists.length)
    })

    onSnapshot(get_tasks_inbox_collection, (snapshot) => {
        const task_lists = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        set_tasks_inbox_number(task_lists.length)
    })

    return {
        task: {
            open_task_modal,
            handler_open_task_modal,
            handler_close_task_modal,
            action_add_task: task_formik.handleSubmit,
            task_form_data: task_formik.values,
            handleChange: task_formik.handleChange,
            handleBlur: task_formik.handleBlur,
            setFieldValue: task_formik.setFieldValue
        },
        project: {
            open_project_modal,
            handler_open_project_modal,
            handler_close_project_modal,
            action_add_project: project_formik.handleSubmit,
            project_form_data: project_formik.values,
            handleChange: project_formik.handleChange,
            handleBlur: project_formik.handleBlur,
            setFieldValue: project_formik.setFieldValue
        },
        project_list,
        goto_today,
        goto_inbox,
        on_today,
        on_inbox,
        tasks_inbox_number,
        tasks_today_number
    }
}
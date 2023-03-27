import { useEffect, useState } from "react"
import { IEditProjectModel, IFormModel, IProjectModel, ITaskModel } from "./model";
import *as yup from 'yup';
import { useFormik } from "formik";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../Firebase/firbase-config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getAccountSelector } from "../../Auth/redux";
import { generatePath, useLocation, useNavigate } from "react-router-dom";
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
    const [on_done, set_on_done] = useState(false);
    const [on_project, set_on_project] = useState(false);
    const [project_id, set_project_id] = useState<string>();
    const [selected_project_id, set_selected_project_id] = useState<string>();
    const [edit_project_id, set_edit_project_id] = useState<string>();
    const [tasks_inbox_number, set_tasks_inbox_number] = useState<number>();
    const [tasks_today_number, set_tasks_today_number] = useState<number>();
    const [done_number, set_done_number] = useState<number>();
    const [view_projects, set_view_projects] = useState<boolean>(true)
    const [open_project_menu, set_open_project_menu] = useState<boolean>(false);

    const get_tasks_today_collection = query(collection(db, "tasks"), where("user_id", "==", user_data.token), where("due_date", "==", dayjs().format("DD-MM-YYYY")), where("is_done", "==", false));
    const get_tasks_inbox_collection = query(collection(db, "tasks"), where("user_id", "==", user_data.token), where("is_done", "==", false));
    const get_tasks_done_collection = query(collection(db, "tasks"), where("user_id", "==", user_data.token), where("is_done", "==", true));

    useEffect(() => {
        switch (location.pathname) {
            case app_routes.inbox_path:
                set_on_inbox(true);
                set_on_today(false);
                set_on_project(false);
                set_on_done(false);
                break;
            case app_routes.today_path:
                set_on_inbox(false);
                set_on_today(true);
                set_on_project(false);
                set_on_done(false);
                break;
            case app_routes.done_path:
                set_on_inbox(false);
                set_on_today(false);
                set_on_project(false);
                set_on_done(true);
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    const add_task_collection = collection(db, "tasks");
    const get_project_collection = query(collection(db, "project"), where("user_id", "==", user_data.token), orderBy("date"));
    const add_project_collection = collection(db, "project");

    const [open_task_modal, set_open_task_modal] = useState(false);
    const [open_project_modal, set_open_project_modal] = useState(false);
    const [open_edit_project_modal, set_open_edit_project_modal] = useState(false);
    const [project_list, set_project_list] = useState<Array<{ id: string, color: string, project_title: string }>>([]);

    const task_validation_schema = yup.object().shape({
        task_title: yup.string().required(),
        description: yup.string()
    });

    const project_validation_schema = yup.object().shape({
        project_title: yup.string().required(),
        color: yup.string()
    });

    const edit_project_validation_schema = yup.object().shape({
        edit_project_title: yup.string().required(),
        edit_color: yup.string()
    });

    const project_initial_values: IProjectModel = {
        project_title: "",
        color: "#808080"
    };

    const edit_project_initial_values: IEditProjectModel = {
        edit_project_title: "",
        edit_color: ""
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

    const handler_open_edit_project_modal = (id: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
        const get_project_details = doc(db, "project", id);
        getDoc(get_project_details)
            .then((command_result) => {
                const project_data = command_result.data() as IProjectModel;
                const converted_obj: IEditProjectModel = {
                    edit_project_title: project_data.project_title,
                    edit_color: project_data.color
                }
                edit_project_formik.setValues(converted_obj)
            })
            .catch((command_result) => {
                toast.error(command_result.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })

        set_open_edit_project_modal(true);
        set_edit_project_id(id)
    }

    const handler_close_edit_project_modal = () => {
        set_open_edit_project_modal(false);
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
            project_id: values.project_id,
            is_done: false
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
            date: new Date(),
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

    const action_edit_project = (values: IEditProjectModel) => {
        const get_project_details = doc(db, "project", edit_project_id!);

        updateDoc(get_project_details, {
            project_title: values.edit_project_title,
            color: values.edit_color
        })
            .then(() => {
                set_open_edit_project_modal(false);
            })
            .catch((command_result) => {
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

    const edit_project_formik = useFormik({
        initialValues: edit_project_initial_values,
        validationSchema: edit_project_validation_schema,
        onSubmit: action_edit_project
    });

    const goto_today = () => {
        navigate(app_routes.today_path);
    }

    const goto_inbox = () => {
        navigate(app_routes.inbox_path);
    }

    const goto_done = () => {
        navigate(app_routes.done_path);
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

    onSnapshot(get_tasks_done_collection, (snapshot) => {
        const task_lists = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        set_done_number(task_lists.length)
    })

    const handler_project = (project_id: string) => {
        const path = generatePath(app_routes.project_path, { project_id });
        navigate(path);
        set_project_id(project_id);
        set_on_project(true);
        set_on_inbox(false);
        set_on_today(false);
        set_on_done(false);
    }


    const toggle_projects = () => {
        set_view_projects(!view_projects)
    }

    const project_menu = (id: string, e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation()
        set_open_project_menu(!open_project_menu);
        set_selected_project_id(id);
    }

    const handler_delete_project = async (project_id: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
        const tasks = query(collection(db, "tasks"), where("project_id", "==", project_id));
        const querySnapshot = await getDocs(tasks);
        querySnapshot.forEach((d) => {
            deleteDoc(doc(db, "tasks", d.id))
                .then(() => {
                    set_open_task_modal(false);
                })
                .catch((command_result) => {
                    toast.error(command_result.message, {
                        position: toast.POSITION.TOP_RIGHT
                    })
                })
        });
        deleteDoc(doc(db, "project", project_id))
            .then(() => {
                set_open_task_modal(false);
            })
            .catch((command_result) => {
                toast.error(command_result.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
    }


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
        edit_project: {
            open_edit_project_modal,
            handler_open_edit_project_modal,
            handler_close_edit_project_modal,
            action_edit_project: edit_project_formik.handleSubmit,
            edit_project_form_data: edit_project_formik.values,
            handleChange: edit_project_formik.handleChange,
            handleBlur: edit_project_formik.handleBlur,
            setFieldValue: edit_project_formik.setFieldValue
        },
        project_list,
        goto_today,
        goto_inbox,
        goto_done,
        on_today,
        on_inbox,
        on_done,
        tasks_inbox_number,
        tasks_today_number,
        handler_project,
        project_id: project_id!,
        on_project,
        toggle_projects,
        view_projects,
        open_project_menu,
        project_menu,
        selected_project_id: selected_project_id!,
        handler_delete_project,
        done_number: done_number!
    }
}
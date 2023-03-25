import dayjs from "dayjs";
import { arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getPriorityColor, getPriorityTitle } from "../../../Enums/enum-parser";
import { db } from "../../../Firebase/firbase-config";
import { getAccountSelector } from "../../Auth/redux";
import { IEditModel, IFormModel, ISetTaskModel, IPriorityLookup, IGetTaskModel, ISubTaskModel, IEditSubTaskModel, IGetProjectModel } from "./model";
import *as yup from 'yup';
import { useFormik } from "formik";
import * as enums from "../../../Enums/enums";
import { random } from "../../../SideFunctions/random_id_maker";
import { useParams } from "react-router-dom";

export const useContainer = (): IFormModel => {

    const { project_id } = useParams();
    const user_data = useSelector(getAccountSelector);

    const get_tasks_collection = query(collection(db, "tasks"), where("user_id", "==", user_data.token), where("project_id", "==", project_id));
    const get_projects_collection = query(collection(db, "project"), where("user_id", "==", user_data.token));
    const get_project_details = doc(db, "project", project_id!);

    const [task_list, set_task_list] = useState<Array<IGetTaskModel>>([]);
    const [open_task_modal, set_open_task_modal] = useState<boolean>(false);
    const [task_details, set_task_details] = useState<ISetTaskModel>();
    const [edit, set_edit] = useState<IEditModel>({ edit_title: false, edit_description: false, edit_priority: false, edit_due_date: false, edit_project: false });
    const [task_id, set_task_id] = useState<string>("");
    const [priority_list, set_priority_list] = useState<Array<IPriorityLookup>>([]);
    const [project_list, set_project_list] = useState<Array<{ id: string; project_title: string; color: string; }>>([])
    const [open_sub_task_modal, set_open_sub_task_modal] = useState<boolean>(false);
    const [open_more_list, set_open_more_list] = useState<boolean>(false);
    const [edit_list, set_edit_list] = useState<string>("");
    const [done, set_done] = useState<string>("");
    const [open_edit_sub_task_modal, set_open_edit_sub_task_modal] = useState<boolean>(false);
    const [view_done_icon, set_view_done_icon] = useState<boolean>(false);
    const [project_details, set_project_details] = useState<IGetProjectModel>();

    onSnapshot(get_tasks_collection, (snapshot) => {
        const task_lists = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Array<IGetTaskModel>;
        set_task_list(task_lists)
    })

    const handler_open_sub_task_modal = () => {
        set_open_sub_task_modal(true);
    }

    const handler_close_sub_task_modal = () => {
        set_open_sub_task_modal(false);
        sub_task_formik.setValues({ sub_task_description: "", sub_task_priority: enums.Priority.White, sub_task_title: "", id: "" });
    }

    useEffect(() => {
        getDoc(get_project_details)
            .then((command_result) => {
                const project_data = command_result.data() as IGetProjectModel;
                set_project_details({
                    ...project_data
                })
            })
            .catch((command_result) => {
                toast.error(command_result.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
    }, [project_id])

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
                            id: id,
                            task_title: task_data.task_title,
                            description: task_data.description,
                            priority_title: getPriorityTitle(task_data.priority)!,
                            priority_color: getPriorityColor(task_data.priority)!,
                            project_title: project_data.project_title,
                            due_date: task_data.due_date,
                            project_color: project_data.color,
                            edited_due_date: dayjs(),
                            sub_task: task_data.sub_task
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
                set_task_details({ ...task_details, task_title: values.task_title, description: values.description, edited_due_date: dayjs(), due_date: values.edited_due_date?.format("DD-MM-YYYY") });
                set_edit({
                    edit_description: false,
                    edit_priority: false,
                    edit_due_date: false,
                    edit_title: false,
                    edit_project: false
                });
            })
            .catch((command_result) => {
                toast.error(command_result.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
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
                toast.error(command_result.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
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
                toast.error(command_result.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
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
        id: "",
        sub_task_priority: enums.Priority.White,
    };

    const action_add_sub_task = (values: ISubTaskModel) => {
        const get_task_details = doc(db, "tasks", task_id);

        updateDoc(get_task_details, {
            sub_task: arrayUnion({
                sub_task_title: values.sub_task_title,
                sub_task_description: values.sub_task_description,
                sub_task_priority: values.sub_task_priority,
                id: random()
            })
        })
            .then(() => {
                handler_close_sub_task_modal();
                handler_open_task_modal(task_id)
                toast.success("Sub-task was added successfully", {
                    position: toast.POSITION.TOP_RIGHT
                })
                sub_task_formik.setValues({ sub_task_description: "", sub_task_priority: enums.Priority.White, sub_task_title: "", id: "" });
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

    const handler_onView_more = (id: string) => {
        set_open_more_list(open_more_list => !open_more_list);
        set_edit_list(id)
    }

    const action_delete_sub_task = (id: string) => {
        const get_task_details = doc(db, "tasks", task_id);
        const modified_sub_task = task_details?.sub_task?.find((value, index) => value.id === id);

        updateDoc(get_task_details, {

            sub_task: arrayRemove({
                sub_task_title: modified_sub_task?.sub_task_title,
                sub_task_description: modified_sub_task?.sub_task_description,
                sub_task_priority: modified_sub_task?.sub_task_priority,
                id: id
            })

        })
            .then(() => {
                handler_open_task_modal(task_id);
                set_open_more_list(false);
            })
            .catch((command_result) => {
                handler_close_sub_task_modal();
                toast.error(command_result.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////

    const edit_sub_task_initial_values: IEditSubTaskModel = {
        edit_sub_task_title: "",
        edit_sub_task_description: "",
        id: "",
        edit_sub_task_priority: enums.Priority.White,
    };

    const action_edit_sub_task = (values: IEditSubTaskModel) => {
        const get_task_details = doc(db, "tasks", task_id);

        const modified_sub_task = task_details?.sub_task?.find((value, index) => value.id === values.id);

        const converted_onject: IEditSubTaskModel = {
            edit_sub_task_title: modified_sub_task?.sub_task_title!,
            edit_sub_task_description: modified_sub_task?.sub_task_description!,
            edit_sub_task_priority: modified_sub_task?.sub_task_priority!,
            id: modified_sub_task?.id!
        }

        updateDoc(get_task_details, {
            sub_task: arrayRemove({
                id: converted_onject.id,
                sub_task_title: converted_onject.edit_sub_task_title,
                sub_task_description: converted_onject.edit_sub_task_description,
                sub_task_priority: converted_onject.edit_sub_task_priority,
            })
        })
            .then(() => {
                updateDoc(get_task_details, {
                    sub_task: arrayUnion({
                        sub_task_title: values.edit_sub_task_title,
                        sub_task_description: values.edit_sub_task_description,
                        sub_task_priority: values.edit_sub_task_priority,
                        id: random()
                    })
                })
                    .then(() => {
                        set_open_edit_sub_task_modal(false)
                        handler_open_task_modal(task_id);
                        set_open_more_list(false);
                    })
                    .catch((command_result) => {
                        handler_close_sub_task_modal();
                        set_open_more_list(false);
                        toast.error(command_result.message, {
                            position: toast.POSITION.TOP_RIGHT
                        })
                    })
            })
            .catch((command_result) => {
                handler_close_sub_task_modal();
                set_open_more_list(false);
                toast.error(command_result.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
    }

    const edit_sub_task_validation_schema = yup.object().shape({
        edit_sub_task_title: yup.string().required(),
        edit_sub_task_description: yup.string()
    });

    const edit_sub_task_formik = useFormik({
        initialValues: edit_sub_task_initial_values,
        validationSchema: edit_sub_task_validation_schema,
        onSubmit: action_edit_sub_task
    });

    const handler_open_edit_sub_task_modal = (id: string) => {
        const modified_sub_task = task_details?.sub_task?.find((value, index) => value.id === id);

        const converted_onject: IEditSubTaskModel = {
            edit_sub_task_title: modified_sub_task?.sub_task_title!,
            edit_sub_task_description: modified_sub_task?.sub_task_description!,
            edit_sub_task_priority: modified_sub_task?.sub_task_priority!,
            id: id
        }

        edit_sub_task_formik.setValues(converted_onject)
        set_open_edit_sub_task_modal(true);
    }

    const handler_close_edit_sub_task_modal = () => {
        set_open_edit_sub_task_modal(false);
    }

    const handler_on_mouse_over_done_icon = (id: string) => {
        set_done(id)
        set_view_done_icon(true)
    }

    const handler_on_mouse_out_done_icon = () => {
        set_view_done_icon(false)
    }

    const action_done = (id: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        deleteDoc(doc(db, "tasks", id))
            .catch((command_result) => {
                toast.error(command_result.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
    }

    const action_delete_task = (id: string) => {
        deleteDoc(doc(db, "tasks", id))
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
        task_list,
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
            open_sub_task_modal,
            handler_open_sub_task_modal,
            handler_close_sub_task_modal,
            action_add_sub_task: sub_task_formik.handleSubmit,
            task_form_data: sub_task_formik.values,
            handleChange: sub_task_formik.handleChange,
            handleBlur: sub_task_formik.handleBlur
        },
        edit_sub_task: {
            handler_onView_more,
            open_more_list,
            action_delete_sub_task,
            edit_list,
            handler_open_edit_sub_task_modal,
            handler_close_edit_sub_task_modal,
            open_edit_sub_task_modal,
            action_edit_sub_task: edit_sub_task_formik.handleSubmit,
            task_form_data: edit_sub_task_formik.values,
            handleChange: edit_sub_task_formik.handleChange,
            handleBlur: edit_sub_task_formik.handleBlur
        },
        handler_on_mouse_over_done_icon,
        done,
        handler_on_mouse_out_done_icon,
        action_done,
        view_done_icon,
        action_delete_task,
        project_details
    }

}
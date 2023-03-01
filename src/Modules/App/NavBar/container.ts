import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAccountSelector } from "../../Auth/redux";
import { IFormModel } from "./model";

export const useContainer = (): IFormModel => {

    const user_data = useSelector(getAccountSelector);
    const navigate = useNavigate()
    const [name, set_name] = useState("")


    useEffect(() => {
        const first_name = user_data.user?.name?.charAt(0);
        const last_name = user_data.user?.name?.search(" ");
        const second_letter = user_data.user?.name?.charAt(1);

        if (last_name) {
            if (last_name === -1) {
                set_name(first_name?.concat(second_letter!)!)
            } else {
                set_name(first_name?.concat(user_data.user!.name!.charAt(last_name + 1))!)
            }
        }
    }, [user_data])

    const toggle_menu = () => {
        navigate("/")
    }
    return {
        name,
        toggle_menu
    }
}
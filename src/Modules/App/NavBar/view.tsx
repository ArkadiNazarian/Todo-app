import { Box } from "@mui/system";
import { HiOutlineMenu } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import { Avatar, Paper, Typography } from "@mui/material";
import { IFormModel } from "./model";

export const View = (props: IFormModel) => (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "#0372ad", paddingTop: 1, paddingBottom: 1, alignItems: 'center' }}>
        <Box sx={{ fontSize: "1.5rem", color: "#ffffff", paddingLeft: 2 }}>
            <HiOutlineMenu onClick={() => props.toggle_menu()} />
            <AiOutlineHome style={{ paddingLeft: "1rem" }} />
        </Box>
        <Box sx={{ paddingRight: 3, position: "relative" }}>
            <Avatar onClick={() => props.handler_onView_account()} sx={{ width: 34, height: 34, cursor: "pointer" }}>{props.name}</Avatar>
            {
                props.view_account && <Paper elevation={7} sx={{ position: "absolute", background: "#ffffff", borderRadius: 3, width: "17rem", height: "30rem", right: 25, top: 40, padding: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Avatar sx={{ width: 44, height: 44 }}>{props.name}</Avatar>
                        <Box sx={{ marginLeft: 1 }}>
                            <Typography>{props.user_info.full_name}</Typography>
                            <Typography color={"#00000055"}>{props.user_info.email}</Typography>
                        </Box>
                    </Box>
                </Paper>
            }
        </Box>
    </Box>
)
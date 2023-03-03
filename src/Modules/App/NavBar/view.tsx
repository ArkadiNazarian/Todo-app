import { Box } from "@mui/system";
import { HiOutlineMenu } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import { Avatar } from "@mui/material";
import { IFormModel } from "./model";

export const View = (props: IFormModel) => (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "#0372ad", paddingTop: 1, paddingBottom: 1, alignItems: 'center' }}>
        <Box sx={{ fontSize: "1.5rem", color: "#ffffff", paddingLeft: 2 }}>
            <HiOutlineMenu onClick={() => props.toggle_menu()} />
            <AiOutlineHome style={{ paddingLeft: "1rem" }} />
        </Box>
        <Box sx={{ paddingRight: 3 }}>
            <Avatar sx={{ width: 34, height: 34 }}>{props.name}</Avatar>
        </Box>
    </Box>
)
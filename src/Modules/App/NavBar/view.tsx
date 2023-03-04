import { Box } from "@mui/system";
import { Avatar, Paper, Typography } from "@mui/material";
import { IFormModel } from "./model";
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export const View = (props: IFormModel) => (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "#0372ad", paddingTop: 1, paddingBottom: 1, alignItems: 'center' }}>
        <Box sx={{ fontSize: "1.5rem", color: "#ffffff", paddingLeft: 2 }}>
            <MenuIcon onClick={() => props.toggle_menu()} />
            <HomeOutlinedIcon sx={{ paddingLeft: "1rem" }} />
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
                    <Box onClick={()=>props.action_signout()} sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 40,cursor:"pointer" }} >
                        <LogoutOutlinedIcon />
                        <Typography fontSize={15}>Log out</Typography>
                    </Box>
                </Paper>
            }
        </Box>
    </Box>
)
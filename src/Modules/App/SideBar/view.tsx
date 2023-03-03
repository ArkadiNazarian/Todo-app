import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FiInbox } from "react-icons/fi";
import { BsCalendar2Date } from "react-icons/bs";

export const View = () => (
    <Box sx={{ background: "#0000001a", width: "16rem", paddingLeft: 3, paddingTop: 5 }}>
        <Typography sx={{':hover':{background:"#00000033",cursor:"pointer"}}}><FiInbox />Inbox</Typography>
        <Typography><BsCalendar2Date />Today</Typography>
    </Box>
)
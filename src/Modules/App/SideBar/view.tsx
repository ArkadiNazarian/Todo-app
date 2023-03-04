import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export const View = () => (
    <Box sx={{ background: "#0000001a", width: "16rem", paddingLeft: 3, paddingRight: 3, paddingTop: 5, minHeight: "50vh" }}>
        <Typography sx={{ ':hover': { background: "#00000033", cursor: "pointer" }, fontWeight: 'light', paddingLeft: 1, marginBottom: 1, borderRadius: 1, height: 1, display: "flex", alignItems: "center" }}><InboxOutlinedIcon sx={{ color: "#0372ad", marginRight: "8px", fontSize: 20 }} />Inbox</Typography>
        <Typography sx={{ ':hover': { background: "#00000033", cursor: "pointer" }, fontWeight: 'light', paddingLeft: 1, marginBottom: 1, borderRadius: 1, height: 1, display: "flex", alignItems: "center" }}><CalendarMonthOutlinedIcon sx={{ color: "#058527", marginRight: "8px", fontSize: 20 }} />Today</Typography>
        <Typography sx={{ ':hover': { background: "#00000033", cursor: "pointer" }, fontWeight: 'bold', paddingLeft: 1, paddingRight: 1, marginBottom: 1, marginTop: 4, borderRadius: 1, height: 1, display: "flex", justifyContent: "space-between", alignItems: "center", color: "#00000080" }}>Projects<AddOutlinedIcon sx={{}} /></Typography>
    </Box>
)
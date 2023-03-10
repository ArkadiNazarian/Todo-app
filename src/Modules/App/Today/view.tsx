import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NavBar } from "../NavBar";
import { SideBar } from "../SideBar";
import { IFormModel } from "./model";
import { getPriorityColor } from "../../../Enums/enum-parser";

export const View = (props: IFormModel) => (
    <Box>
        <NavBar />
        <Box sx={{ display: "flex" }}>
            <Box>
                <SideBar />
            </Box>
            <Box sx={{ width: "100%", marginTop: 7, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box sx={{ marginBottom: 4, display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Typography variant="h5" fontWeight="bold">Today</Typography>
                    <Typography sx={{ marginLeft: 1 }} fontSize={14}>{props.date?.week_day}</Typography>
                    <Typography sx={{ marginLeft: 1 }} fontSize={14}>{props.date?.day}</Typography>
                    <Typography sx={{ marginLeft: 1 }} fontSize={14}>{props.date?.month}</Typography>
                </Box>
                <Box>
                    {
                        props.task_list.map((value, index) => (
                            <Box key={index} sx={{ width: 200, marginBottom: 4 }}>
                                <Box sx={{display: "flex", alignItems: "center", }}>
                                    <Box sx={{ width: "15px", height: "15px", borderRadius: 4, marginRight: 2, background: getPriorityColor(value.priority) }}></Box>
                                    <Typography fontSize={20}>{value.task_title}</Typography>
                                </Box>
                                <Typography fontSize={16} sx={{marginLeft:5}} color="#00000099">{value.description}</Typography>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
        </Box>
    </Box>
)
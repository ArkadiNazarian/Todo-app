import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NavBar } from "../NavBar";
import { SideBar } from "../SideBar";
import { IFormModel } from "./model";
import { getPriorityColor } from "../../../Enums/enum-parser";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CloseIcon from '@mui/icons-material/Close';
import SortIcon from '@mui/icons-material/Sort';

export const View = (props: IFormModel) => (
    <Box>
        <NavBar />
        <Box sx={{ display: "flex" }}>
            <Box>
                <SideBar />
            </Box>
            <Box sx={{ width: "100%", marginTop: 7, display: "flex", flexDirection: "column", alignItems: "center", paddingRight: 30 }}>
                <Box sx={{ marginBottom: 4, display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Typography variant="h5" fontWeight="bold">Today</Typography>
                    <Typography sx={{ marginLeft: 1 }} fontSize={14}>{props.date?.week_day}</Typography>
                    <Typography sx={{ marginLeft: 1 }} fontSize={14}>{props.date?.day}</Typography>
                    <Typography sx={{ marginLeft: 1 }} fontSize={14}>{props.date?.month}</Typography>
                </Box>
                <Box>
                    {
                        props.task_list.map((value, index) => (
                            <Box onClick={() => props.handler_open_task_modal(value.id)} key={index} sx={{ ':hover': { cursor: "pointer", boxShadow: `1px 1px ${getPriorityColor(value.priority)}` }, minWidth: 600, marginBottom: 4, borderBottom: 1, paddingBottom: 1, borderColor: getPriorityColor(value.priority) }}>
                                <Box sx={{ display: "flex", alignItems: "center", }}>
                                    <Box sx={{ width: "15px", height: "15px", borderRadius: 4, marginRight: 2, background: getPriorityColor(value.priority) }}></Box>
                                    <Typography fontSize={20}>{value.task_title}</Typography>
                                </Box>
                                <Typography fontSize={16} sx={{ marginLeft: 5 }} color="#00000099">{value.description}</Typography>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
        </Box>
        <Modal open={props.open_task_modal} onClose={() => props.handler_close_task_modal()}>
            <Box sx={{ position: "absolute", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: "80%", borderRadius: 2, boxShadow: 24, p: 4, background: "#ffffff" }}>
                <Box sx={{ borderBottom: 1, paddingBottom: 2, borderColor: "#00000033", display: "flex", justifyContent: "space-between" }}>
                    <Typography fontSize={15} color="#00000099" sx={{ display: "flex", alignItems: "center", }}><CalendarMonthOutlinedIcon sx={{ color: "#058527", marginRight: "8px", fontSize: 20 }} />Today</Typography>
                    <CloseIcon onClick={() => props.handler_close_task_modal()} sx={{ ':hover': { cursor: "pointer", background: "#00000022", borderRadius: 1 } }} />
                </Box>

                <Box sx={{ display: "flex" }}>
                    <Box sx={{ marginTop: 4, width: 600 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ width: "25px", height: "25px", borderRadius: 4, marginRight: 2, background: props.task_details?.priority }}></Box>
                            <Typography fontSize={20}>{props.task_details?.task_title}</Typography>
                        </Box>
                        {
                            props.task_details?.description === "" ? (
                                <Box sx={{ display: "flex", alignItems: "center", marginTop: 2, marginLeft: 4 }} color="#00000044"><SortIcon sx={{ color: "#00000044" }} /><Typography>Description</Typography></Box>
                            ) : (
                                <Typography fontSize={15}>{props.task_details?.description}</Typography>
                            )
                        }

                    </Box>
                    <Box sx={{ background: "#00000011", height: "60vh", width: 200, borderRadius: 2, marginTop: 4, padding: 2 }}>
                        <Typography fontSize={13} color="#00000099" fontWeight="bold">Project</Typography>
                        <Box sx={{display:"flex",alignItems:"center"}}>
                            <Box sx={{ width: "10px", height: "10px", borderRadius: 4, background: props.task_details?.priority }}></Box>
                            <Typography>{props.task_details?.project_title}</Typography>
                        </Box>
                    </Box>
                </Box>

                {/* <form onSubmit={props.task.action_add_task}>
                    <FormGroup>
                        <TextField type="text" placeholder="Task name" variant="standard" name="task_title" value={props.task.task_form_data.task_title} onChange={props.task.handleChange} onBlur={props.task.handleBlur} />
                        <TextField type="text" sx={{ marginTop: 2 }} placeholder="Description" variant="standard" name="description" value={props.task.task_form_data.description} onChange={props.task.handleChange} onBlur={props.task.handleBlur} />
                        <DatePicker label="Due date" sx={{ marginTop: 5, width: 200 }} value={props.task.task_form_data.due_date} onChange={(value) => props.task.setFieldValue('due_date', value)} />
                    </FormGroup>
                    <FormControl sx={{ marginTop: 3, minWidth: 120 }}>
                        <InputLabel>Priority</InputLabel>
                        <Select value={props.task.task_form_data.priority} label="Priority" onChange={props.task.handleChange} name="priority" >
                            <MenuItem value={enums.Priority.Red}><FlagIcon sx={{ color: "#bd0416" }} />Priority 1</MenuItem>
                            <MenuItem value={enums.Priority.Orange}><FlagIcon sx={{ color: "#f57c02" }} />Priority 2</MenuItem>
                            <MenuItem value={enums.Priority.Blue}><FlagIcon sx={{ color: "#0356fc" }} />Priority 3</MenuItem>
                            <MenuItem value={enums.Priority.White}><FlagIcon sx={{ color: "#cfcfcf" }} />Priority 4</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ marginTop: 3, minWidth: 120 }}>
                        <InputLabel>Project</InputLabel>
                        <Select value={props.task.task_form_data.project_id} label="Project" onChange={props.task.handleChange} name="project_id" >
                            {
                                props.project_list.map((values, index) => (
                                    <MenuItem key={index} value={values.id} sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 1 }}><Box sx={{ width: "12px", height: "12px", background: values.color, borderRadius: 4, marginRight: 1 }}></Box>{values.project_title}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <Box sx={{ marginTop: 3, marginLeft: 25 }}>
                        <Button variant="outlined" onClick={() => props.task.handler_close_task_modal()}>Cancel</Button>
                        <Button type="submit" variant="contained" sx={{ marginLeft: 2 }}>Submit</Button>
                    </Box>
                </form>*/}
            </Box>
        </Modal>
    </Box>
)
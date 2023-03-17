import { Button, FormControl, FormGroup, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NavBar } from "../NavBar";
import { SideBar } from "../SideBar";
import { IFormModel } from "./model";
import { getPriorityColor } from "../../../Enums/enum-parser";
import * as enums from "../../../Enums/enums";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CloseIcon from '@mui/icons-material/Close';
import SortIcon from '@mui/icons-material/Sort';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import FlagIcon from '@mui/icons-material/Flag';
import { StaticDatePicker } from "@mui/x-date-pickers";

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
            <Box sx={{ position: "absolute", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, minHeight: "60%", borderRadius: 2, boxShadow: 24, p: 4, background: "#ffffff" }}>
                <Box sx={{ borderBottom: 1, paddingBottom: 2, borderColor: "#00000033", display: "flex", justifyContent: "space-between" }} >
                    <Typography fontSize={15} color="#00000099" sx={{ display: "flex", alignItems: "center", }}><CalendarMonthOutlinedIcon sx={{ color: "#058527", marginRight: "8px", fontSize: 20 }} />Today</Typography>
                    <CloseIcon onClick={() => props.handler_close_task_modal()} sx={{ ':hover': { cursor: "pointer", background: "#00000022", borderRadius: 1 } }} />
                </Box>

                <Box sx={{ display: "flex" }}>
                    <Box sx={{ marginTop: 4, width: 600 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ width: "25px", height: "25px", borderRadius: 4, marginRight: 2, background: props.task_details?.priority_color }}></Box>
                            {
                                props.edit.edit_title ?
                                    <form onSubmit={props.action_submit}>
                                        <FormControl >
                                            <TextField label="Task name" variant="standard" name="task_title" value={props.form_data.task_title} onChange={props.handleChange} onBlur={() => props.action_submit()}></TextField>
                                        </FormControl>
                                    </form> :
                                    <Typography fontSize={20} onClick={() => props.handler_onEdit_title()}>{props.task_details?.task_title}</Typography>
                            }

                        </Box>

                        {
                            props.edit.edit_description ?
                                <form onSubmit={props.action_submit}>
                                    <FormControl >
                                        <TextField sx={{ marginTop: 4, marginLeft: 4 }} label="Description" variant="standard" name="description" value={props.form_data.description} onChange={props.handleChange} onBlur={() => props.action_submit()}></TextField>
                                    </FormControl>
                                </form> :
                                props.task_details?.description === "" ? (
                                    <Box sx={{ display: "flex", alignItems: "center", marginTop: 2, marginLeft: 4 }} color="#00000044" onClick={() => props.handler_onEdit_description()}><SortIcon sx={{ color: "#00000044" }} /><Typography>Description</Typography></Box>
                                ) : (
                                    <Typography fontSize={15} sx={{ marginTop: 2, marginLeft: 4 }} onClick={() => props.handler_onEdit_description()}>{props.task_details?.description}</Typography>
                                )
                        }
                        <Box sx={{marginLeft:4}}>
                            {
                                props.task_details?.sub_task?.length !== undefined && <Typography fontSize={15} sx={{ marginTop: 4,marginBottom:2 }}>Sub-tasks</Typography>
                            }
                            {
                                props.task_details?.sub_task?.map((value, index) => (
                                    <Box key={index} sx={{ ':hover': { cursor: "pointer"}, width: 400, marginBottom: 4, borderBottom: 1, paddingBottom: 1, borderColor: "#00000022"}}>
                                        <Box sx={{ display: "flex", alignItems: "center", }}>
                                            <Box sx={{ width: "15px", height: "15px", borderRadius: 4, marginRight: 2, background: getPriorityColor(value.sub_task_priority) }}></Box>
                                            <Typography fontSize={15}>{value.sub_task_title}</Typography>
                                        </Box>
                                        <Typography fontSize={12} sx={{ marginLeft: 5 }} color="#00000099">{value.sub_task_description}</Typography>
                                    </Box>
                                ))
                            }
                            <Button onClick={() => props.sub_task.handler_open_sub_task_modal()}>+ Add sub-task</Button>
                        </Box>
                    </Box>
                    <Box sx={{ background: "#00000011", height: "50vh", width: 200, borderRadius: 2, marginTop: 4, padding: 2, position: "relative" }}>
                        <Typography fontSize={13} color="#00000099" fontWeight="bold">Project</Typography>
                        {
                            props.edit.edit_project &&
                            <Box sx={{ position: "absolute", zIndex: 1, background: "#ffffff", padding: 1, borderRadius: 2, left: 1, top: 70, boxShadow: "10px 3px 5px -1px rgb(0 0 0 / 20%),0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)" }}>
                                {
                                    props.project_list.map((value, index) => (
                                        <Box onClick={() => props.handler_update_project(value.id)} sx={{ ':hover': { background: "#00000099" }, cursor: "pointer", display: "flex", alignItems: "center", marginBottom: 1, padding: 1, borderRadius: 2 }} key={index}><Box sx={{ width: "12px", height: "12px", background: value.color, borderRadius: 4, marginRight: 1 }}></Box>{value.project_title}</Box>
                                    ))
                                }
                            </Box>
                        }
                        <Box onClick={() => props.handler_onEdit_project()} sx={{ display: "flex", alignItems: "center", marginTop: 1, borderBottom: 1, paddingBottom: 1, borderColor: "#00000022" }}>
                            <Box sx={{ width: "10px", height: "10px", borderRadius: 4, background: props.task_details?.project_color, marginRight: 1 }}></Box>
                            <Typography fontSize={12} color="#00000099">{props.task_details?.project_title}</Typography>
                        </Box>
                        <Typography fontSize={13} color="#00000099" fontWeight="bold" sx={{ marginTop: 1 }}>Due Date</Typography>
                        <Box sx={{ borderBottom: 1, paddingBottom: 1, borderColor: "#00000022", marginTop: 1, }}>
                            {
                                props.edit.edit_due_date ?
                                    <form>
                                        <FormControl sx={{ position: "relative" }}>
                                            <StaticDatePicker sx={{ position: "absolute", zIndex: 1, left: -110, boxShadow: 6 }} onClose={() => props.handler_onEdit_due_date()} orientation="portrait" value={props.form_data.edited_due_date} onChange={(value) => props.setFieldValue('edited_due_date', value)} onAccept={props.action_submit} />
                                        </FormControl>
                                    </form>
                                    :
                                    <Typography onClick={() => props.handler_onEdit_due_date()} fontSize={12} color="#00000099" sx={{ display: "flex", alignItems: "center" }}><InsertInvitationOutlinedIcon fontSize="small" sx={{ color: "#058527", marginRight: 1 }} />Today</Typography>
                            }

                        </Box>
                        <Box onClick={() => props.handler_onEdit_priority()}>
                            <Typography fontSize={13} color="#00000099" fontWeight="bold" sx={{ marginTop: 1 }}>Priority</Typography>
                            <Box sx={{ borderBottom: 1, paddingBottom: 1, borderColor: "#00000022", marginTop: 1, position: "relative" }}>
                                <Typography fontSize={12} color="#00000099" sx={{ display: "flex", alignItems: "center" }}><FlagIcon fontSize="small" sx={{ color: props.task_details?.priority_color, marginRight: 1 }} />{props.task_details?.priority_title}</Typography>
                                {
                                    props.edit.edit_priority &&
                                    <Box sx={{ position: "absolute", background: "#ffffff", padding: 1, borderRadius: 2, left: 1, top: 30, boxShadow: "10px 3px 5px -1px rgb(0 0 0 / 20%),0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)" }}>
                                        {
                                            props.priority_list.map((value, index) => (
                                                <Typography onClick={() => props.handler_update_priority(value.value)} sx={{ ':hover': { background: "#00000099" }, cursor: "pointer", display: "flex", alignItems: "center", marginBottom: 1, padding: 1, borderRadius: 2 }} key={index}><FlagIcon sx={{ color: value.priority_color }} />{value.priority_title}</Typography>
                                            ))
                                        }

                                    </Box>
                                }
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
        <Modal open={props.sub_task.open_sub_task_modal} onClose={() => props.sub_task.handler_close_sub_task_modal()}>
            <Box sx={{ position: "absolute", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, borderRadius: 2, boxShadow: 24, p: 4, background: "#ffffff" }}>
                <form onSubmit={props.sub_task.action_add_sub_task}>
                    <FormGroup>
                        <TextField type="text" placeholder="Task name" variant="standard" name="sub_task_title" value={props.sub_task.task_form_data.sub_task_title} onChange={props.sub_task.handleChange} onBlur={props.sub_task.handleBlur} />
                        <TextField type="text" sx={{ marginTop: 2 }} placeholder="Description" variant="standard" name="sub_task_description" value={props.sub_task.task_form_data.sub_task_description} onChange={props.sub_task.handleChange} onBlur={props.sub_task.handleBlur} />
                    </FormGroup>
                    <FormControl sx={{ marginTop: 3, minWidth: 120 }}>
                        <InputLabel>Priority</InputLabel>
                        <Select value={props.sub_task.task_form_data.sub_task_priority} label="Priority" onChange={props.sub_task.handleChange} name="sub_task_priority" >
                            <MenuItem value={enums.Priority.Red}><FlagIcon sx={{ color: "#bd0416" }} />Priority 1</MenuItem>
                            <MenuItem value={enums.Priority.Orange}><FlagIcon sx={{ color: "#f57c02" }} />Priority 2</MenuItem>
                            <MenuItem value={enums.Priority.Blue}><FlagIcon sx={{ color: "#0356fc" }} />Priority 3</MenuItem>
                            <MenuItem value={enums.Priority.White}><FlagIcon sx={{ color: "#cfcfcf" }} />Priority 4</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ marginTop: 3, marginLeft: 25 }}>
                        <Button variant="outlined" onClick={() => props.sub_task.handler_close_sub_task_modal()}>Cancel</Button>
                        <Button type="submit" variant="contained" sx={{ marginLeft: 2 }}>Submit</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    </Box>
)
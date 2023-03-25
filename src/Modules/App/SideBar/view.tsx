import { Button, Modal, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Paper } from "@mui/material";
import { Box } from "@mui/system";
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { IFormModel } from "./model";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormGroup from "@mui/material/FormGroup";
import FlagIcon from '@mui/icons-material/Flag';
import * as enums from "../../../Enums/enums";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const View = (props: IFormModel) => (
    <Box sx={{ background: "#0000001a", width: "16rem", paddingLeft: 3, paddingRight: 3, paddingTop: 5, paddingBottom: 2, minHeight: "50vh", borderRadius: "0px 0px 6px 0px" }}>
        <Box onClick={() => props.goto_inbox()} sx={{ ':hover': { background: "#00000033", cursor: "pointer" }, background: props.on_inbox ? "#00000033" : "", fontWeight: 'light', padding: 1, marginBottom: 1, borderRadius: 1, height: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}><Typography sx={{ display: "flex", alignItems: "center" }}><InboxOutlinedIcon sx={{ color: "#0372ad", marginRight: "8px", fontSize: 20 }} />Inbox</Typography><Typography color="#0372ad">{props.tasks_inbox_number}</Typography></Box>
        <Box onClick={() => props.goto_today()} sx={{ ':hover': { background: "#00000033", cursor: "pointer" }, background: props.on_today ? "#00000033" : "", fontWeight: 'light', padding: 1, marginBottom: 1, borderRadius: 1, height: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}><Typography sx={{ display: "flex", alignItems: "center" }}><CalendarMonthOutlinedIcon sx={{ color: "#058527", marginRight: "8px", fontSize: 20 }} />Today</Typography><Typography color="#dd4b39">{props.tasks_today_number}</Typography></Box>
        <Button onClick={() => props.task.handler_open_task_modal()}>Add task</Button>

        <Modal open={props.task.open_task_modal} onClose={() => props.task.handler_close_task_modal()}>
            <Box sx={{ position: "absolute", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, borderRadius: 2, boxShadow: 24, p: 4, background: "#ffffff" }}>
                <form onSubmit={props.task.action_add_task}>
                    <FormGroup>
                        <TextField type="text" placeholder="Task name*" variant="standard" name="task_title" value={props.task.task_form_data.task_title} onChange={props.task.handleChange} onBlur={props.task.handleBlur} />
                        <TextField type="text" sx={{ marginTop: 2 }} placeholder="Description" variant="standard" name="description" value={props.task.task_form_data.description} onChange={props.task.handleChange} onBlur={props.task.handleBlur} />
                        <DatePicker label="Due date*" sx={{ marginTop: 5, width: 200 }} value={props.task.task_form_data.due_date} onChange={(value) => props.task.setFieldValue('due_date', value)} />
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
                </form>
            </Box>
        </Modal>
        <Box sx={{ ':hover': { background: "#00000011", cursor: "pointer" }, fontWeight: 'bold', paddingLeft: 1, paddingRight: 1, marginBottom: 1, marginTop: 4, borderRadius: 1, height: 1, display: "flex", justifyContent: "space-between", alignItems: "center", color: "#00000080" }}>Projects <Typography><KeyboardArrowDownOutlinedIcon onClick={() => props.toggle_projects()} sx={{ transition: 'all 0.3s', transform: `${props.view_projects ? "rotate(0deg)" : "rotate(90deg)"}` }} /><AddOutlinedIcon onClick={() => props.project.handler_open_project_modal()} /></Typography></Box>
        <Box sx={{ transition: 'all 0.3s', opacity: props.view_projects ? 1 : 0 }}>
            {
                props.project_list.map((value, index) => (
                    <Box key={index} onClick={() => props.handler_project(value.id)} fontSize={17} fontWeight={400} position="relative">
                        <Box sx={{ ':hover': { background: "#00000033", cursor: "pointer" }, padding: 1, borderRadius: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 1, background: (props.project_id === value.id && props.on_project) ? "#00000033" : "" }}><Box sx={{ display: "flex", alignItems: "center" }}><Typography sx={{ width: "12px", height: "12px", background: value.color, borderRadius: 4, marginRight: 1 }}></Typography>{value.project_title}</Box><MoreHorizIcon onClick={() => props.project_menu(value.id)} /></Box>
                        {
                            (props.open_project_menu && props.selected_project_id === value.id) && <Paper sx={{ position: "absolute", right: -1, top: 30, padding: 1, zIndex: 1, boxShadow: "10px 3px 5px -1px rgb(0 0 0 / 20%),0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)", }}>
                                <Typography sx={{ ':hover': { background: "#00000099" }, cursor: "pointer", marginBottom: 1, padding: 1, borderRadius: 2 }} onClick={() => props.edit_project.handler_open_edit_project_modal(value.id)}>Edit</Typography>
                                <Typography color="#FF0000" sx={{ ':hover': { background: "#00000099" }, cursor: "pointer", marginBottom: 1, padding: 1, borderRadius: 2 }} onClick={() => props.handler_delete_project(value.id)}>Delete</Typography>
                            </Paper>
                        }
                    </Box>
                ))
            }
        </Box>
        <Modal open={props.project.open_project_modal} onClose={() => props.project.handler_close_project_modal()}>
            <Box sx={{ position: "absolute", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, borderRadius: 2, boxShadow: 24, p: 4, background: "#ffffff" }}>
                <form onSubmit={props.project.action_add_project} >
                    <Typography variant="h6" sx={{ marginBottom: 3, color: "#1976d2" }}>Add project</Typography>
                    <FormGroup>
                        <TextField type="text" placeholder="Project name*" variant="standard" name="project_title" value={props.project.project_form_data.project_title} onChange={props.project.handleChange} onBlur={props.project.handleBlur} />
                    </FormGroup>
                    <FormControl sx={{ marginTop: 3, minWidth: 220 }} id="color_dropdown">
                        <InputLabel >Color</InputLabel>
                        <Select value={props.project.project_form_data.color} label="Color" onChange={props.project.handleChange} name="color" >
                            <MenuItem value="#b8256f"><Box sx={{ width: "12px", height: "12px", background: "#b8256f", borderRadius: 4, marginRight: 1 }}></Box>Berry Red</MenuItem>
                            <MenuItem value="#db4035"><Box sx={{ width: "12px", height: "12px", background: "#db4035", borderRadius: 4, marginRight: 1 }}></Box>Red</MenuItem>
                            <MenuItem value="#ff9933"><Box sx={{ width: "12px", height: "12px", background: "#ff9933", borderRadius: 4, marginRight: 1 }}></Box>Orange</MenuItem>
                            <MenuItem value="#fad000"><Box sx={{ width: "12px", height: "12px", background: "#fad000", borderRadius: 4, marginRight: 1 }}></Box>Yellow</MenuItem>
                            <MenuItem value="#afb83b"><Box sx={{ width: "12px", height: "12px", background: "#afb83b", borderRadius: 4, marginRight: 1 }}></Box>Olive Green</MenuItem>
                            <MenuItem value="#7ecc49"><Box sx={{ width: "12px", height: "12px", background: "#7ecc49", borderRadius: 4, marginRight: 1 }}></Box>Lime Green</MenuItem>
                            <MenuItem value="#299438"><Box sx={{ width: "12px", height: "12px", background: "#299438", borderRadius: 4, marginRight: 1 }}></Box>Green</MenuItem>
                            <MenuItem value="#158fad"><Box sx={{ width: "12px", height: "12px", background: "#158fad", borderRadius: 4, marginRight: 1 }}></Box>Teal</MenuItem>
                            <MenuItem value="#6accbc"><Box sx={{ width: "12px", height: "12px", background: "#6accbc", borderRadius: 4, marginRight: 1 }}></Box>Mint Green</MenuItem>
                            <MenuItem value="#14aaf5"><Box sx={{ width: "12px", height: "12px", background: "#14aaf5", borderRadius: 4, marginRight: 1 }}></Box>Sky Blue</MenuItem>
                            <MenuItem value="#96c3eb"><Box sx={{ width: "12px", height: "12px", background: "#96c3eb", borderRadius: 4, marginRight: 1 }}></Box>Light Blue</MenuItem>
                            <MenuItem value="#4073ff"><Box sx={{ width: "12px", height: "12px", background: "#4073ff", borderRadius: 4, marginRight: 1 }}></Box>Blue</MenuItem>
                            <MenuItem value="#884dff"><Box sx={{ width: "12px", height: "12px", background: "#884dff", borderRadius: 4, marginRight: 1 }}></Box>Grape</MenuItem>
                            <MenuItem value="#af38eb"><Box sx={{ width: "12px", height: "12px", background: "#af38eb", borderRadius: 4, marginRight: 1 }}></Box>Violet</MenuItem>
                            <MenuItem value="#eb96eb"><Box sx={{ width: "12px", height: "12px", background: "#eb96eb", borderRadius: 4, marginRight: 1 }}></Box>Lavender</MenuItem>
                            <MenuItem value="#e05194"><Box sx={{ width: "12px", height: "12px", background: "#e05194", borderRadius: 4, marginRight: 1 }}></Box>Magenta</MenuItem>
                            <MenuItem value="#ff8d85"><Box sx={{ width: "12px", height: "12px", background: "#ff8d85", borderRadius: 4, marginRight: 1 }}></Box>Salmon</MenuItem>
                            <MenuItem value="#808080"><Box sx={{ width: "12px", height: "12px", background: "#808080", borderRadius: 4, marginRight: 1 }}></Box>Charcoal</MenuItem>
                            <MenuItem value="#b8b8b8"><Box sx={{ width: "12px", height: "12px", background: "#b8b8b8", borderRadius: 4, marginRight: 1 }}></Box>Grey</MenuItem>
                            <MenuItem value="#ccac93"><Box sx={{ width: "12px", height: "12px", background: "#ccac93", borderRadius: 4, marginRight: 1 }}></Box>Taupe</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ marginTop: 3, marginLeft: 25 }}>
                        <Button variant="outlined" onClick={() => props.project.handler_close_project_modal()}>Cancel</Button>
                        <Button type="submit" variant="contained" sx={{ marginLeft: 2 }} >Add</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
        <Modal open={props.edit_project.open_edit_project_modal} onClose={() => props.edit_project.handler_close_edit_project_modal()}>
            <Box sx={{ position: "absolute", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, borderRadius: 2, boxShadow: 24, p: 4, background: "#ffffff" }}>
                <form onSubmit={props.edit_project.action_edit_project} >
                    <Typography variant="h6" sx={{ marginBottom: 3, color: "#1976d2" }}>Edit project</Typography>
                    <FormGroup>
                        <TextField type="text" placeholder="Project name*" variant="standard" name="edit_project_title" value={props.edit_project.edit_project_form_data.edit_project_title} onChange={props.edit_project.handleChange} onBlur={props.edit_project.handleBlur} />
                    </FormGroup>
                    <FormControl sx={{ marginTop: 3, minWidth: 220 }} id="color_dropdown">
                        <InputLabel >Color</InputLabel>
                        <Select value={props.edit_project.edit_project_form_data.edit_color} label="Color" onChange={props.edit_project.handleChange} name="edit_color" >
                            <MenuItem value="#b8256f"><Box sx={{ width: "12px", height: "12px", background: "#b8256f", borderRadius: 4, marginRight: 1 }}></Box>Berry Red</MenuItem>
                            <MenuItem value="#db4035"><Box sx={{ width: "12px", height: "12px", background: "#db4035", borderRadius: 4, marginRight: 1 }}></Box>Red</MenuItem>
                            <MenuItem value="#ff9933"><Box sx={{ width: "12px", height: "12px", background: "#ff9933", borderRadius: 4, marginRight: 1 }}></Box>Orange</MenuItem>
                            <MenuItem value="#fad000"><Box sx={{ width: "12px", height: "12px", background: "#fad000", borderRadius: 4, marginRight: 1 }}></Box>Yellow</MenuItem>
                            <MenuItem value="#afb83b"><Box sx={{ width: "12px", height: "12px", background: "#afb83b", borderRadius: 4, marginRight: 1 }}></Box>Olive Green</MenuItem>
                            <MenuItem value="#7ecc49"><Box sx={{ width: "12px", height: "12px", background: "#7ecc49", borderRadius: 4, marginRight: 1 }}></Box>Lime Green</MenuItem>
                            <MenuItem value="#299438"><Box sx={{ width: "12px", height: "12px", background: "#299438", borderRadius: 4, marginRight: 1 }}></Box>Green</MenuItem>
                            <MenuItem value="#158fad"><Box sx={{ width: "12px", height: "12px", background: "#158fad", borderRadius: 4, marginRight: 1 }}></Box>Teal</MenuItem>
                            <MenuItem value="#6accbc"><Box sx={{ width: "12px", height: "12px", background: "#6accbc", borderRadius: 4, marginRight: 1 }}></Box>Mint Green</MenuItem>
                            <MenuItem value="#14aaf5"><Box sx={{ width: "12px", height: "12px", background: "#14aaf5", borderRadius: 4, marginRight: 1 }}></Box>Sky Blue</MenuItem>
                            <MenuItem value="#96c3eb"><Box sx={{ width: "12px", height: "12px", background: "#96c3eb", borderRadius: 4, marginRight: 1 }}></Box>Light Blue</MenuItem>
                            <MenuItem value="#4073ff"><Box sx={{ width: "12px", height: "12px", background: "#4073ff", borderRadius: 4, marginRight: 1 }}></Box>Blue</MenuItem>
                            <MenuItem value="#884dff"><Box sx={{ width: "12px", height: "12px", background: "#884dff", borderRadius: 4, marginRight: 1 }}></Box>Grape</MenuItem>
                            <MenuItem value="#af38eb"><Box sx={{ width: "12px", height: "12px", background: "#af38eb", borderRadius: 4, marginRight: 1 }}></Box>Violet</MenuItem>
                            <MenuItem value="#eb96eb"><Box sx={{ width: "12px", height: "12px", background: "#eb96eb", borderRadius: 4, marginRight: 1 }}></Box>Lavender</MenuItem>
                            <MenuItem value="#e05194"><Box sx={{ width: "12px", height: "12px", background: "#e05194", borderRadius: 4, marginRight: 1 }}></Box>Magenta</MenuItem>
                            <MenuItem value="#ff8d85"><Box sx={{ width: "12px", height: "12px", background: "#ff8d85", borderRadius: 4, marginRight: 1 }}></Box>Salmon</MenuItem>
                            <MenuItem value="#808080"><Box sx={{ width: "12px", height: "12px", background: "#808080", borderRadius: 4, marginRight: 1 }}></Box>Charcoal</MenuItem>
                            <MenuItem value="#b8b8b8"><Box sx={{ width: "12px", height: "12px", background: "#b8b8b8", borderRadius: 4, marginRight: 1 }}></Box>Grey</MenuItem>
                            <MenuItem value="#ccac93"><Box sx={{ width: "12px", height: "12px", background: "#ccac93", borderRadius: 4, marginRight: 1 }}></Box>Taupe</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ marginTop: 3, marginLeft: 25 }}>
                        <Button variant="outlined" onClick={() => props.edit_project.handler_close_edit_project_modal()}>Cancel</Button>
                        <Button type="submit" variant="contained" sx={{ marginLeft: 2 }} >Add</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    </Box>
)
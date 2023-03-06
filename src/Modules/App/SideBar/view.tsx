import { Button, Modal, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { IFormModel } from "./model";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormGroup from "@mui/material/FormGroup";
import FlagIcon from '@mui/icons-material/Flag';

export const View = (props: IFormModel) => (
    <Box sx={{ background: "#0000001a", width: "16rem", paddingLeft: 3, paddingRight: 3, paddingTop: 5, minHeight: "50vh" }}>
        <Typography sx={{ ':hover': { background: "#00000033", cursor: "pointer" }, fontWeight: 'light', paddingLeft: 1, marginBottom: 1, borderRadius: 1, height: 1, display: "flex", alignItems: "center" }}><InboxOutlinedIcon sx={{ color: "#0372ad", marginRight: "8px", fontSize: 20 }} />Inbox</Typography>
        <Typography sx={{ ':hover': { background: "#00000033", cursor: "pointer" }, fontWeight: 'light', paddingLeft: 1, marginBottom: 1, borderRadius: 1, height: 1, display: "flex", alignItems: "center" }}><CalendarMonthOutlinedIcon sx={{ color: "#058527", marginRight: "8px", fontSize: 20 }} />Today</Typography>
        <Button onClick={() => props.handler_open_modal()}>Add task</Button>
        <Modal open={props.open_modal} onClose={() => props.handler_close_modal()}>
            <Box sx={{ position: "absolute", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, borderRadius: 2, boxShadow: 24, p: 4, background: "#ffffff" }}>
                <form onSubmit={props.action_submit}>
                    <FormGroup>
                        <TextField type="text" placeholder="Task name" variant="standard" name="task_title" value={props.form_data.task_title} onChange={props.handleChange} onBlur={props.handleBlur} />
                        <TextField type="text" sx={{ marginTop: 2 }} placeholder="Description" variant="standard" name="description" value={props.form_data.description} onChange={props.handleChange} onBlur={props.handleBlur} />
                        <DatePicker label="Date" sx={{ marginTop: 5, width: 200 }} value={props.form_data.date} onChange={(value) => props.setFieldValue('date', value)} />
                    </FormGroup>
                    <FormControl sx={{ marginTop: 3, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={props.form_data.priority}
                            label="Priority"
                            onChange={props.handleChange}
                            name="priority"
                        >
                            <MenuItem value={1}><FlagIcon sx={{ color: "#bd0416" }} />Priority 1</MenuItem>
                            <MenuItem value={2}><FlagIcon sx={{ color: "#f57c02" }} />Priority 2</MenuItem>
                            <MenuItem value={3}><FlagIcon sx={{ color: "#0356fc" }} />Priority 3</MenuItem>
                            <MenuItem value={4}><FlagIcon sx={{ color: "#cfcfcf" }} />Priority 4</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ marginTop: 3, marginLeft: 25 }}>
                        <Button variant="outlined" onClick={() => props.handler_close_modal()}>Cancel</Button>
                        <Button type="submit" variant="contained" sx={{ marginLeft: 2 }}>Submit</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
        <Typography sx={{ ':hover': { background: "#00000033", cursor: "pointer" }, fontWeight: 'bold', paddingLeft: 1, paddingRight: 1, marginBottom: 1, marginTop: 4, borderRadius: 1, height: 1, display: "flex", justifyContent: "space-between", alignItems: "center", color: "#00000080" }}>Projects<AddOutlinedIcon /></Typography>
    </Box>
)
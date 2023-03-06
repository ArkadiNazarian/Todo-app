import { Button, Modal, TextField, Typography, FormControl, Stack } from "@mui/material";
import { Box } from "@mui/system";
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { IFormModel } from "./model";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextFieldProps } from "@mui/material/TextField";

export const View = (props: IFormModel) => (
    <Box sx={{ background: "#0000001a", width: "16rem", paddingLeft: 3, paddingRight: 3, paddingTop: 5, minHeight: "50vh" }}>
        <Typography sx={{ ':hover': { background: "#00000033", cursor: "pointer" }, fontWeight: 'light', paddingLeft: 1, marginBottom: 1, borderRadius: 1, height: 1, display: "flex", alignItems: "center" }}><InboxOutlinedIcon sx={{ color: "#0372ad", marginRight: "8px", fontSize: 20 }} />Inbox</Typography>
        <Typography sx={{ ':hover': { background: "#00000033", cursor: "pointer" }, fontWeight: 'light', paddingLeft: 1, marginBottom: 1, borderRadius: 1, height: 1, display: "flex", alignItems: "center" }}><CalendarMonthOutlinedIcon sx={{ color: "#058527", marginRight: "8px", fontSize: 20 }} />Today</Typography>
        <Button onClick={() => props.handler_open_modal()}>Add task</Button>
        <Modal open={props.open_modal} onClose={() => props.handler_close_modal()}>
            <Box sx={{ position: "absolute", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, borderRadius: 2, boxShadow: 24, p: 4, background: "#ffffff" }}>
                <form onSubmit={props.action_submit}>
                    <FormControl >
                        <TextField type="text" placeholder="Task name" variant="standard" name="task_title" value={props.form_data.task_title} onChange={props.handleChange} onBlur={props.handleBlur} />
                        <TextField type="text" sx={{ marginTop: 2 }} placeholder="Description" variant="standard" name="description" value={props.form_data.description} onChange={props.handleChange} onBlur={props.handleBlur} />
                        <DatePicker label="Date" value={props.form_data.date} onChange={(value) => props.setFieldValue('date', value)} />
                        <Button type="submit">Submit</Button>
                    </FormControl>
                </form>
            </Box>
        </Modal>
        <Typography sx={{ ':hover': { background: "#00000033", cursor: "pointer" }, fontWeight: 'bold', paddingLeft: 1, paddingRight: 1, marginBottom: 1, marginTop: 4, borderRadius: 1, height: 1, display: "flex", justifyContent: "space-between", alignItems: "center", color: "#00000080" }}>Projects<AddOutlinedIcon /></Typography>
    </Box>
)
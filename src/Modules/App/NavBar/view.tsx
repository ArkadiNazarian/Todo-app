import { Box } from "@mui/system";
import { Avatar, Button, FormControl, Modal, Paper, TextField, Typography } from "@mui/material";
import { IFormModel } from "./model";
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';

export const View = (props: IFormModel) => (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "#0372ad", paddingTop: 1, paddingBottom: 1, alignItems: 'center' }}>
        <Box sx={{ fontSize: "1.5rem", color: "#ffffff", paddingLeft: 1 }}>
            <MenuIcon onClick={() => props.toggle_menu()} sx={{ ':hover': { cursor: "pointer", background: "#4e9cc5" }, marginLeft: "1rem", padding: 0.5, borderRadius: 1 }} />
            <HomeOutlinedIcon sx={{ ':hover': { cursor: "pointer", background: "#4e9cc5" }, marginLeft: "0.5rem", padding: 0.5, borderRadius: 1 }} onClick={() => props.home()} />
        </Box>
        <Box sx={{ paddingRight: 3, position: "relative" }}>
            <Avatar onClick={() => props.handler_onView_account()} sx={{ width: 34, height: 34, cursor: "pointer" }}>{props.avatar_name}</Avatar>
            {
                props.view_account && <Paper onFocus={() => props.handler_onView_account()} elevation={7} sx={{ position: "absolute", background: "#ffffff", borderRadius: 3, width: "17rem", height: "7rem", right: 25, top: 40, padding: 2 }}>
                    <Box onClick={() => props.handler_open_profile_modal()} sx={{ display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer" }}>
                        <Avatar sx={{ width: 44, height: 44 }}>{props.avatar_name}</Avatar>
                        <Box sx={{ marginLeft: 1 }}>
                            <Typography>{props.user_info.full_name}</Typography>
                            <Typography color={"#00000055"}>{props.user_info.email}</Typography>
                        </Box>
                    </Box>
                    <Box onClick={() => props.action_signout()} sx={{ display: "flex", color: "#00000099", flexDirection: "row", alignItems: "center", marginTop: 5, cursor: "pointer" }} >
                        <LogoutOutlinedIcon />
                        <Typography fontSize={15}>Log out</Typography>
                    </Box>
                </Paper>
            }
        </Box>
        <Modal open={props.open_profile_modal} onClose={() => props.handler_close_profile_modal()}>
            <Box sx={{ position: "absolute", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, minHeight: "60%", borderRadius: 2, boxShadow: 24, p: 4, background: "#ffffff" }}>
                <Box sx={{ borderBottom: 1, paddingBottom: 2, borderColor: "#00000033", display: "flex", justifyContent: "space-between" }} >
                    <Typography fontSize={15} color="#00000099" sx={{ display: "flex", alignItems: "center", }}><AccountCircleOutlinedIcon sx={{ color: "#058527", marginRight: "8px", fontSize: 20 }} />Profile</Typography>
                    <CloseIcon onClick={() => props.handler_close_profile_modal()} sx={{ ':hover': { cursor: "pointer", background: "#00000022", borderRadius: 1 } }} />
                </Box>
                <Box sx={{ marginTop: 4 }}>
                    <form onSubmit={props.action_edit}>
                        <FormControl>
                            <Typography fontWeight="bold">Name</Typography>
                            <TextField size="small" variant="outlined" name="user_name" value={props.form_data.user_name} onBlur={() => props.action_edit()} onChange={props.handleChange}></TextField>
                            <Typography fontWeight="bold" sx={{ marginTop: 2 }}>Email</Typography>
                            <TextField size="small" variant="outlined" name="email" value={props.form_data.email} onBlur={() => props.action_edit()} onChange={props.handleChange}></TextField>
                            <Typography fontWeight="bold" sx={{ marginTop: 2 }}>Password</Typography>
                            <Button variant="contained" sx={{ marginTop: 2, marginRight: 1 }} onClick={() => props.password.handler_open_password_modal()}>Change</Button>
                            <Button variant="contained" sx={{ marginTop: 8, width: "180px" }} onClick={() => props.action_delete_user()} color="error">Delete account</Button>
                        </FormControl>
                    </form>
                </Box>
            </Box>
        </Modal>
        <Modal open={props.reauthenticate.open_reauthenticate_modal} onClose={() => props.reauthenticate.handler_close_reauthenticate_modal()}>
            <Box sx={{ position: "absolute", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: 2, boxShadow: 24, p: 4, background: "#ffffff" }}>
                <Box>
                    <form onSubmit={props.reauthenticate.action_submit}>
                        <FormControl>
                            <TextField variant="standard" label="Current Email" name="current_email" value={props.reauthenticate.reauthenticate_form_data.current_email} onBlur={props.reauthenticate.handleBlur} onChange={props.reauthenticate.handleChange}></TextField>
                            <TextField variant="standard" sx={{ marginTop: 2 }} label="Current Password" type="password" name="password" value={props.reauthenticate.reauthenticate_form_data.password} onBlur={props.reauthenticate.handleBlur} onChange={props.reauthenticate.handleChange}></TextField>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Button variant="contained" sx={{ marginTop: 2, marginRight: 1 }} type="submit">Submit</Button>
                                <Button variant="outlined" sx={{ marginTop: 2 }} onClick={() => props.reauthenticate.handler_close_reauthenticate_modal()}>Cancel</Button>
                            </Box>
                        </FormControl>
                    </form>
                </Box>
            </Box>
        </Modal>
        <Modal open={props.password.open_password_modal} onClose={() => props.password.handler_close_password_modal()}>
            <Box sx={{ position: "absolute", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: 2, boxShadow: 24, p: 4, background: "#ffffff" }}>
                <Box>
                    <form onSubmit={props.password.action_submit}>
                        <FormControl>
                            <TextField variant="standard" sx={{ marginTop: 2 }} label="New Password" type="password" name="new_password" value={props.password.password_form_data.new_password} onBlur={props.password.handleBlur} onChange={props.password.handleChange}></TextField>
                            <TextField variant="standard" sx={{ marginTop: 2 }} label="Confirm new Password" type="password" name="confirm_new_password" value={props.password.password_form_data.confirm_new_password} onBlur={props.password.handleBlur} onChange={props.password.handleChange}></TextField>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Button variant="contained" sx={{ marginTop: 2, marginRight: 1 }} type="submit">Submit</Button>
                                <Button variant="outlined" sx={{ marginTop: 2 }} onClick={() => props.password.handler_close_password_modal()}>Cancel</Button>
                            </Box>
                        </FormControl>
                    </form>
                </Box>
            </Box>
        </Modal>
    </Box>
)
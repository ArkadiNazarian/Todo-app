import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IFormModel } from "./model";

export const View = (props: IFormModel) => (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",background:"#03c2fc" }}>
        <Box sx={{ boxShadow: 6, padding: 4,background:"#ffffff",borderRadius:3 }}>
            <Typography variant="h4" sx={{ color: "#1976d2" }}>Forgot your password?</Typography>
            <Typography variant="h6" sx={{maxWidth:"400px",marginTop:2}}>To reset your password, please enter the email address of your Todoist account.</Typography>
            <form onSubmit={props.action_submit}>
                <FormControl >
                    <TextField label="Email" helperText={props.form_errors.email} sx={{ marginTop: 2 }} error={!!props.form_errors.email} type="email" variant="standard" name="email" value={props.form_data.email} onChange={props.handleChange} onBlur={props.handleBlur} />
                    <Button variant="contained" type="submit" sx={{ marginTop: 4 }}>Send Email</Button>
                </FormControl>
            </form>
            <Typography variant="h6" sx={{ color: "#1976d2",marginTop:2 }}><Link to={props.login_path}>Go to login</Link></Typography>
        </Box>
    </Box>
)
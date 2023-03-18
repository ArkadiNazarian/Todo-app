import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IFormModel } from "./model";

export const View = (props: IFormModel) => (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",background:"#03c2fc" }}>
        <Box sx={{ boxShadow: 6, padding: 4,background:"#ffffff",borderRadius:3 }}>
            <Typography variant="h4" sx={{ color: "#1976d2" }}>Sign up</Typography>
            <form onSubmit={props.action_submit}>
                <FormControl >
                    <TextField label="Name" sx={{ marginTop: 1 }} helperText={props.form_errors.name} error={!!props.form_errors.name} type="text" variant="standard" name="name" value={props.form_data.name} onChange={props.handleChange} onBlur={props.handleBlur} />
                    <TextField label="Email" sx={{ marginTop: 2 }} helperText={props.form_errors.email} error={!!props.form_errors.email} type="email" variant="standard" name="email" value={props.form_data.email} onChange={props.handleChange} onBlur={props.handleBlur} />
                    <TextField label="Password" sx={{ marginTop: 2 }} helperText={props.form_errors.password} error={!!props.form_errors.password} type="password" variant="standard" name="password" value={props.form_data.password} onChange={props.handleChange} onBlur={props.handleBlur} />
                    <TextField label="Confirm password" sx={{ marginTop: 2 }} helperText={props.form_errors.passwordConfirmation} error={!!props.form_errors.passwordConfirmation} type="password" variant="standard" name="passwordConfirmation" value={props.form_data.passwordConfirmation} onChange={props.handleChange} onBlur={props.handleBlur} />
                    <Button variant="contained" type="submit" sx={{ marginTop: 4 }}>Sign In</Button>
                </FormControl>
            </form>
            <Typography variant="h6" sx={{ color: "#1976d2" }}>Already signed up?<Link to={props.login_path}>Go to login</Link></Typography>
        </Box>
    </Box>
)
import React, {useReducer, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";
import {createStyles} from "@material-ui/core";
import {loginEmailPasswordUser} from "../stitch";
import {Notification} from "../common";

const styles = theme => createStyles({
    main: {
        width: "auto",
        display: "block", // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

interface Props extends WithStyles<typeof styles> {
}

const SignIn = (props: Props) => {
    const {classes} = props;
    const [showNotification, setShowNotification] = useState(false);

    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            email: "",
            password: "",
        }
    );

    const handleChange = evt => {
        const {name, value} = evt.target;
        setUserInput({[name]: value});
    };

    const handleLogin = () => {
        loginEmailPasswordUser({
            email: userInput.email,
            password: userInput.password
        }).then(() => {
            window.location.reload();
        }).catch(err => {
            console.error(`login failed with error: ${err}`);
            setShowNotification(true);
        });
    };

    return (
        <main className={classes.main}>
            <CssBaseline/>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" value={userInput.email} onChange={handleChange}
                               autoComplete="email" autoFocus/>
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input name="password" type="password" id="password" value={userInput.password}
                               onChange={handleChange} autoComplete="current-password"/>
                    </FormControl>
                    <Button
                        onClick={handleLogin}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign in
                    </Button>
                </form>
            </Paper>
            <Notification
                message="Authentication failed please try again."
                variant="error"
                show={showNotification}
                onClose={() => setShowNotification(false)}
            />
        </main>
    );
};

export const LoginPage = withStyles(styles)(SignIn);
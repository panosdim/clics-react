import * as React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {createStyles, withStyles, WithStyles} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import classNames from "classnames";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles = (theme) =>
    createStyles({
        success: {
            backgroundColor: green[600],
        },
        error: {
            backgroundColor: red[500],
        },
        info: {
            backgroundColor: blue[500],
        },
        warning: {
            backgroundColor: amber[700],
        },
        icon: {
            fontSize: 20,
        },
        iconVariant: {
            opacity: 0.9,
            marginRight: theme.spacing.unit,
        },
        message: {
            display: "flex",
            alignItems: "center",
        },
    });

interface Props extends WithStyles<typeof styles> {
    message: string;
    show: boolean;
    onClose: () => void;
    variant: "success" | "warning" | "error" | "info";
}

const NotificationComponent = (props: Props) => {
    const {classes, message, variant, show, onClose} = props;
    const Icon = variantIcon[variant];

    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}

            open={show}
            autoHideDuration={3000}
            onClose={onClose}
            ContentProps={{
                "aria-describedby": "message-id"
            }}>
            <SnackbarContent
                className={classes[variant]}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <Icon className={classNames(classes.icon, classes.iconVariant)}/>
                        {message}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={onClose}
                    >
                        <CloseIcon/>
                    </IconButton>
                ]}
            />
        </Snackbar>
    );
};

export const Notification = withStyles(styles)(NotificationComponent);

import * as React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {createStyles, withStyles, WithStyles} from "@material-ui/core";

const styles = (theme) =>
    createStyles({
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 100,
        },
    });

interface Props extends WithStyles<typeof styles> {
    message: string;
    show: boolean;
    onClose: () => void;
}

const NotificationComponent = (props: Props) => {
    const {message, show, onClose} = props;

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
            }}
            message={<span id="message-id">{message}</span>}
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
    );
};

export const Notification = withStyles(styles)(NotificationComponent);

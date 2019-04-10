import React from "react";
import {createStyles, TextField, withStyles, WithStyles} from "@material-ui/core";

const styles = (theme) =>
    createStyles({
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 100,
        },
    });

interface Props extends WithStyles<typeof styles> {
    state: clicsInputType;
    onStateChanged: (newState: clicsInputType) => void;
}

export type clicsInputType = {
    ian: { value: string, valid: boolean };
    object: { value: string, valid: boolean };
    activity: { value: string, valid: boolean };
};

const InnerClicsInput = (props: Props) => {
    const {classes, state, onStateChanged}: Props = props;
    const {ian, activity, object} = state;

    const handleChange = (e) => {
        let newState: clicsInputType;
        newState = {
            ...state,
            [e.target.id]: {value: e.target.value, valid: e.target.checkValidity()},
        };

        onStateChanged(newState);
    };

    return (
        <>
            <TextField id="ian" label="IAN" className={classes.textField} margin="normal" required
                       value={ian.value} onChange={handleChange} error={!ian.valid}
                       inputProps={{pattern: "[0-9]{2}-[0-9]{3}"}}/>
            <TextField id="activity" label="Activity" className={classes.textField} margin="normal"
                       required value={activity.value} onChange={handleChange} error={!activity.valid}
                       inputProps={{pattern: "[0-9]{4}"}}/>
            <TextField id="object" label="Object" className={classes.textField} margin="normal"
                       required value={object.value} onChange={handleChange} error={!object.valid}
                       inputProps={{pattern: "[0-9]{4}"}}/>
        </>
    );
};

export const ClicsInput = withStyles(styles)(InnerClicsInput);
import React, {useRef, useState} from "react";
import {createStyles, TextField, withStyles, WithStyles} from "@material-ui/core";
import {clicsCodesType, clicsCodesValidType} from "../../model";

const styles = (theme) =>
    createStyles({
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 100,
        },
    });

interface Props extends WithStyles<typeof styles> {
    codeValues: clicsCodesType;
    onStateChanged: (newCodeValues: clicsCodesType) => void;
}

const InnerClicsInput = (props: Props) => {
    const {classes, codeValues, onStateChanged}: Props = props;
    const {ian, activity, object} = codeValues;
    const initialInputValidation: clicsCodesValidType = {
        ian: !!ian,
        activity: !!activity,
        object: !!object,
    };
    const [inputValidation, setInputValidation] = useState(initialInputValidation);
    const ianInput = useRef(null);
    const activityInput = useRef(null);
    const objectInput = useRef(null);

    const handleChange = (e) => {
        let newCodeValues: clicsCodesType;
        newCodeValues = {
            ...codeValues,
            [e.target.id]: e.target.value,
        };

        let newInputValidation: clicsCodesValidType = {
            ...inputValidation,
            [e.target.id]: e.target.checkValidity(),
        };
        setInputValidation(newInputValidation);

        onStateChanged(newCodeValues);
    };

    React.useEffect(() => {
        let newInputValidation: clicsCodesValidType = {
            ian: ianInput.current.checkValidity(),
            activity: activityInput.current.checkValidity(),
            object: objectInput.current.checkValidity(),
        };
        setInputValidation(newInputValidation);
    }, [codeValues]);

    return (
        <>
            <TextField id="ian" label="IAN" className={classes.textField} margin="normal" required
                       value={ian} onChange={handleChange} error={!inputValidation.ian}
                       inputProps={{pattern: "[0-9]{2}-[0-9]{3}", ref: ianInput}}/>
            <TextField id="activity" label="Activity" className={classes.textField} margin="normal"
                       required value={activity} onChange={handleChange} error={!inputValidation.activity}
                       inputProps={{pattern: "[0-9]{4}", ref: activityInput}}/>
            <TextField id="object" label="Object" className={classes.textField} margin="normal"
                       required value={object} onChange={handleChange} error={!inputValidation.object}
                       inputProps={{pattern: "[0-9]{4}", ref: objectInput}}/>
        </>
    );
};

export const ClicsInput = withStyles(styles)(InnerClicsInput);
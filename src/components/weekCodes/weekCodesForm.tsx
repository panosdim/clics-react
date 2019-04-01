import React, {useState} from "react";
import {createStyles, Paper, WithStyles, withStyles,} from "@material-ui/core";
import {FormButtons} from "./formButtons";
import {DaysSelection, selectedDaysType} from "./daysSelection";
import {ClicsInput, clicsInputType} from "./clicsInput";
import db from "../appdb";

const styles = theme =>
    createStyles({
        root: {
            maxWidth: "max-content",
        },
        container: {
            [theme.breakpoints.down("sm")]: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "stretch",
            },
            [theme.breakpoints.up("md")]: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                alignItems: "stretch",
            },
        },
    });

interface Props extends WithStyles<typeof styles> {
    selectedWeek: Date;
    isNewCode: boolean;
}

const InnerWeekCodesForm = (props: Props) => {
    const initialDaysState: selectedDaysType = {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false
    };

    const initialClicsState: clicsInputType = {
        ian: {value: "", valid: false},
        activity: {value: "", valid: false},
        object: {value: "", valid: false},
    };


    const {classes, selectedWeek, isNewCode} = props;
    const [daysCheckedState, setDaysCheckedState] = useState(initialDaysState);
    const [clicsInputState, setClicsInputState] = useState(initialClicsState);
    const {monday, tuesday, wednesday, thursday, friday} = daysCheckedState;
    const {ian, activity, object} = clicsInputState;


    const isFormValid = (): boolean => {
        const isDaySelected: boolean = monday || tuesday || wednesday || thursday || friday;
        const isInputValid: boolean = ian.valid && activity.valid && object.valid;

        return isDaySelected && isInputValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isFormValid()) {
            return;
        }

        // Store it
        db.table("clics").add({
            date: selectedWeek,
            ian: ian.value,
            activity: activity.value,
            object: object.value,
            days: daysCheckedState
        }).catch(e => {
            console.log("error: " + e.stack || e);
        });

        setClicsInputState(initialClicsState);
        setDaysCheckedState(initialDaysState);
    };

    const onDaysSelectionChanged = (state) => {
        setDaysCheckedState(state);
    };

    const onClicsInputChanged = (state) => {
        setClicsInputState(state);
    };

    return (
        <Paper className={classes.root}>
            <form className={classes.container} noValidate autoComplete="on" onSubmit={handleSubmit}>
                <ClicsInput onStateChanged={onClicsInputChanged} state={clicsInputState}/>

                <DaysSelection onStateChanged={onDaysSelectionChanged} state={daysCheckedState}/>

                <FormButtons isNewCode={isNewCode}/>
            </form>
        </Paper>
    );
};

export const WeekCodesForm = withStyles(styles)(InnerWeekCodesForm);

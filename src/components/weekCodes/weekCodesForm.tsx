import React, {useState} from "react";
import {createStyles, Paper, WithStyles, withStyles,} from "@material-ui/core";
import {FormButtons} from "./formButtons";
import {DaysSelection, selectedDaysType} from "./daysSelection";
import {ClicsInput, clicsInputType} from "./clicsInput";
import db from "../appdb";
import {getISOWeek, getYear} from "date-fns";
import {clicsType} from "../weekTable";

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
    clicsId: number;
    onFinish: () => void;
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


    const {classes, selectedWeek, clicsId, onFinish} = props;
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

        let objectToStore = {};
        const week: string = String(getISOWeek(selectedWeek)) + String(getYear(selectedWeek));

        // Check if we add a new object or update an existing
        if (clicsId == 0) {
            objectToStore = {
                week: week,
                ian: ian.value,
                activity: activity.value,
                object: object.value,
                days: daysCheckedState
            };
        } else {
            objectToStore = {
                id: clicsId,
                week: week,
                ian: ian.value,
                activity: activity.value,
                object: object.value,
                days: daysCheckedState
            };
        }

        // Store it
        db.table("clics").put(objectToStore).catch(e => {
            console.log("error: " + e.stack || e);
        });

        setClicsInputState(initialClicsState);
        setDaysCheckedState(initialDaysState);
        onFinish();
    };

    const onDaysSelectionChanged = (state) => {
        setDaysCheckedState(state);
    };

    const onClicsInputChanged = (state) => {
        setClicsInputState(state);
    };

    React.useEffect(() => {
        if (clicsId != 0) {
            db.transaction("rw", db.table("clics"), async () => {
                const clicsArray: clicsType = await db.table("clics")
                    .where("id").equals(clicsId)
                    .toArray();

                const clics = clicsArray[0];
                const daysState: selectedDaysType = clics.days;

                const clicsState: clicsInputType = {
                    ian: {value: clics.ian, valid: true},
                    activity: {value: clics.activity, valid: true},
                    object: {value: clics.object, valid: true},
                };

                setClicsInputState(clicsState);
                setDaysCheckedState(daysState);
            }).catch(e => {
                console.log(e.stack || e);
            });
        } else {
            setClicsInputState(initialClicsState);
            setDaysCheckedState(initialDaysState);
        }
    }, [clicsId]);

    const onDelete = () => {
        db.transaction("rw", db.table("clics"), async () => {
            await db.table("clics").delete(clicsId);

            setClicsInputState(initialClicsState);
            setDaysCheckedState(initialDaysState);
            onFinish();
        }).catch(e => {
            console.log(e.stack || e);
        });
    };

    return (
        <Paper className={classes.root}>
            <form className={classes.container} noValidate autoComplete="on" onSubmit={handleSubmit}>
                <ClicsInput onStateChanged={onClicsInputChanged} state={clicsInputState}/>
                <DaysSelection onStateChanged={onDaysSelectionChanged} state={daysCheckedState}/>
                <FormButtons isNewEntry={clicsId == 0} onDelete={onDelete}/>
            </form>
        </Paper>
    );
};

export const WeekCodesForm = withStyles(styles)(InnerWeekCodesForm);

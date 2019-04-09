import React, {useState} from "react";
import {createStyles, Paper, WithStyles, withStyles,} from "@material-ui/core";
import {FormButtons} from "./formButtons";
import {DaysSelection, selectedDaysType} from "./daysSelection";
import {ClicsInput, clicsInputType} from "./clicsInput";
import {getISOWeek, getYear} from "date-fns";
import {Notification} from "../notification";
import {app, items} from "../../stitch";
import {clicsItemType} from "../weekTable";
import {ObjectId} from "bson";

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
    clicsItem: clicsItemType;
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

    const {classes, selectedWeek, clicsItem, onFinish} = props;
    const [daysCheckedState, setDaysCheckedState] = useState(initialDaysState);
    const [clicsInputState, setClicsInputState] = useState(initialClicsState);
    const {monday, tuesday, wednesday, thursday, friday} = daysCheckedState;
    const {ian, activity, object} = clicsInputState;
    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState("");


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
        if (clicsItem) {
            objectToStore = {
                week: week,
                ian: ian.value,
                activity: activity.value,
                object: object.value,
                days: daysCheckedState
            };
            setMessage("Code edited successfully.");

            items.updateOne({_id: new ObjectId(clicsItem._id)}, {$set: objectToStore}).then(() => {
                setShowNotification(true);

                setClicsInputState(initialClicsState);
                setDaysCheckedState(initialDaysState);
                onFinish();
            });
        } else {
            objectToStore = {
                week: week,
                ian: ian.value,
                activity: activity.value,
                object: object.value,
                days: daysCheckedState,
                owner_id: app.auth.user.id
            };
            setMessage("New Codes added successfully.");

            items.insertOne(objectToStore)
                .then(() => {
                    setShowNotification(true);

                    setClicsInputState(initialClicsState);
                    setDaysCheckedState(initialDaysState);
                    onFinish();
                });
        }
    };

    const onDaysSelectionChanged = (state) => {
        setDaysCheckedState(state);
    };

    const onClicsInputChanged = (state) => {
        setClicsInputState(state);
    };

    React.useEffect(() => {
        if (clicsItem) {
            const clics = clicsItem;
            const daysState: selectedDaysType = clics.days;

            const clicsState: clicsInputType = {
                ian: {value: clics.ian, valid: true},
                activity: {value: clics.activity, valid: true},
                object: {value: clics.object, valid: true},
            };

            setClicsInputState(clicsState);
            setDaysCheckedState(daysState);
        } else {
            setClicsInputState(initialClicsState);
            setDaysCheckedState(initialDaysState);
        }
    }, [clicsItem]);

    const onDelete = () => {
        setMessage("Code deleted successfully.");
        items.deleteOne({_id: new ObjectId(clicsItem._id)}).then(() => {
            setShowNotification(true);

            setClicsInputState(initialClicsState);
            setDaysCheckedState(initialDaysState);
            onFinish();
        });
    };

    return (
        <>
            <Paper className={classes.root}>
                <form className={classes.container} noValidate autoComplete="on" onSubmit={handleSubmit}>
                    <ClicsInput onStateChanged={onClicsInputChanged} state={clicsInputState}/>
                    <DaysSelection onStateChanged={onDaysSelectionChanged} state={daysCheckedState}/>
                    <FormButtons isNewEntry={clicsItem === null} onDelete={onDelete}/>
                </form>
            </Paper>
            <Notification
                message={message}
                variant="success"
                show={showNotification}
                onClose={() => setShowNotification(false)}
            />
        </>
    );
};

export const WeekCodesForm = withStyles(styles)(InnerWeekCodesForm);

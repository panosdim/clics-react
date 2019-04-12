import React, {useState} from "react";
import {createStyles, Paper, WithStyles, withStyles,} from "@material-ui/core";
import {FormButtons} from "./formButtons";
import {DaysSelection} from "./daysSelection";
import {ClicsInput} from "./clicsInput";
import {getISOWeek, getYear} from "date-fns";
import {Notification} from "../../common";
import {app, items} from "../../stitch";
import {ObjectId} from "bson";
import {clicsCodesType, clicsEntity, selectedDaysType} from "../../model";

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
    clicsItem: clicsEntity;
    onFinish: () => void;
    hintTableItem: clicsCodesType;
}

const InnerWeekCodesForm = (props: Props) => {
    const initialDaysState: selectedDaysType = {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false
    };

    const initialClicsState: clicsCodesType = {
        ian: "",
        activity: "",
        object: "",
    };

    const {classes, selectedWeek, clicsItem, onFinish, hintTableItem} = props;
    const [daysCheckedState, setDaysCheckedState] = useState(initialDaysState);
    const [clicsInputState, setClicsInputState] = useState(initialClicsState);
    const {monday, tuesday, wednesday, thursday, friday} = daysCheckedState;
    const {ian, activity, object} = clicsInputState;
    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState("");


    const isDaySelected = (): boolean => {
        return monday || tuesday || wednesday || thursday || friday;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isDaySelected() || !event.target.checkValidity()) {
            return;
        }

        let objectToStore = {};
        const week: string = String(getISOWeek(selectedWeek)) + String(getYear(selectedWeek));

        // Check if we add a new object or update an existing
        if (clicsItem) {
            objectToStore = {
                week: week,
                ian: ian,
                activity: activity,
                object: object,
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
                ian: ian,
                activity: activity,
                object: object,
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

    const onDaysSelectionChanged = (newDaysSelected) => {
        setDaysCheckedState(newDaysSelected);
    };

    const onClicsInputChanged = (newCodeValues) => {
        setClicsInputState(newCodeValues);
    };

    React.useEffect(() => {
        if (clicsItem) {
            const daysState: selectedDaysType = clicsItem.days;

            const clicsState: clicsCodesType = {
                ian: clicsItem.ian,
                activity: clicsItem.activity,
                object: clicsItem.object,
            };

            setClicsInputState(clicsState);
            setDaysCheckedState(daysState);
        } else {
            setClicsInputState(initialClicsState);
            setDaysCheckedState(initialDaysState);
        }

        if (hintTableItem) {
            const clicsState: clicsCodesType = {
                ian: hintTableItem.ian,
                activity: hintTableItem.activity,
                object: hintTableItem.object,
            };
            setClicsInputState(clicsState);
        }
    }, [clicsItem, hintTableItem]);

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
                    <ClicsInput onStateChanged={onClicsInputChanged} codeValues={clicsInputState}/>
                    <DaysSelection onStateChanged={onDaysSelectionChanged} selectedDays={daysCheckedState}/>
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
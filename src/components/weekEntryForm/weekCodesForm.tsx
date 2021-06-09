import React, {useState} from "react";
import {createStyles, Paper, WithStyles, withStyles,} from "@material-ui/core";
import {FormButtons} from "./formButtons";
import {DaysSelection} from "./daysSelection";
import {ClicsInput} from "./clicsInput";
import {getISOWeek, getYear} from "date-fns";
import {Notification} from "../../common";
import {app, items} from "../../stitch";
import {ObjectId} from "bson";
import {clicsCodesType, clicsEntity, dbResults, selectedDaysType} from "../../model";

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
                justifyContent: "space-evenly",
                alignItems: "stretch",
            },
            [theme.breakpoints.up("md")]: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-evenly",
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
    const [daysCheckedState, setDaysCheckedState] = useState<selectedDaysType>(initialDaysState);
    const [clicsInputState, setClicsInputState] = useState<clicsCodesType>(initialClicsState);
    const {monday, tuesday, wednesday, thursday, friday} = daysCheckedState;
    const {ian, activity, object} = clicsInputState;
    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState<"success" | "warning" | "error" | "info">("success");


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

        // Check if we have conflict in selected days
        items.find({week: week}, {limit: 1000}).asArray().then((docs: dbResults) => {
            const results = clicsItem ? docs.filter(item => item._id.toString() !== clicsItem._id.toString()) : docs;
            const conflict: boolean = results.some((item) => {
                let result: boolean = false;
                Object.entries(item.days).forEach(([key, value]) => {
                    if (value) {
                        if (daysCheckedState[key]) {
                            result = true;
                            return;
                        }
                    }
                });
                return result;
            });

            if (conflict) {
                setMessage("There is a conflict in selected days with previous entries.");
                setVariant("error");
                setShowNotification(true);
                return;
            } else {
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
                    setVariant("success");

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
                    setVariant("success");

                    items.insertOne(objectToStore)
                        .then(() => {
                            setShowNotification(true);

                            setClicsInputState(initialClicsState);
                            setDaysCheckedState(initialDaysState);
                            onFinish();
                        });
                }
            }
        });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clicsItem, hintTableItem]);

    const onDelete = () => {
        setMessage("Code deleted successfully.");
        setVariant("success");
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
                variant={variant}
                show={showNotification}
                onClose={() => setShowNotification(false)}
            />
        </>
    );
};

export const WeekCodesForm = withStyles(styles)(InnerWeekCodesForm);

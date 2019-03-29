import React, {useState} from "react";
import {
    Checkbox,
    createStyles,
    Fab,
    FormControlLabel,
    Paper,
    TextField,
    WithStyles,
    withStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import yellow from "@material-ui/core/colors/yellow";
import classNames from "classnames";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import {useInput} from "./useInput";
import FormHelperText from "@material-ui/core/FormHelperText";

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
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 100,
        },
        selections: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "flex-end",
        },
        fab: {
            margin: theme.spacing.unit,
        },
        greenColor: {
            color: theme.palette.getContrastText(green[500]),
            backgroundColor: green[500],
            "&:hover": {
                backgroundColor: green[700],
            },
        },
        redColor: {
            color: theme.palette.getContrastText(red[500]),
            backgroundColor: red[500],
            "&:hover": {
                backgroundColor: red[700],
            },
        },
        yellowColor: {
            color: theme.palette.getContrastText(yellow[500]),
            backgroundColor: yellow[500],
            "&:hover": {
                backgroundColor: yellow[700],
            },
        },
    });

interface Props extends WithStyles<typeof styles> {
    selectedWeek: Date;
    isNewCode: boolean;
}

const AddEditCodesForm = (props: Props) => {
    const {classes, selectedWeek, isNewCode} = props;
    const [monday, setMonday] = useState(false);
    const [tuesday, setTuesday] = useState(false);
    const [wednesday, setWednesday] = useState(false);
    const [thursday, setThursday] = useState(false);
    const [friday, setFriday] = useState(false);
    const [allDays, setAllDays] = useState(false);
    const {value: ian, bind: bindIan, reset: resetIan} = useInput("", false);
    const {value: activity, bind: bindActivity, reset: resetActivity} = useInput("", false);
    const {value: object, bind: bindObject, reset: resetObject} = useInput("", false);

    React.useEffect(() => {
        if (allDays) {
            setMonday(true);
            setTuesday(true);
            setWednesday(true);
            setThursday(true);
            setFriday(true);
        } else {
            setMonday(false);
            setTuesday(false);
            setWednesday(false);
            setThursday(false);
            setFriday(false);
        }
    }, [allDays]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!event.target.checkValidity() || error) {
            return;
        }

        console.log(ian);
        console.log(object);
        console.log(activity);
        resetIan();
        resetActivity();
        resetObject();
        setMonday(false);
        setTuesday(false);
        setWednesday(false);
        setThursday(false);
        setFriday(false);
        setAllDays(false);
    };

    let error = !(monday || tuesday || wednesday || thursday || friday);
    let errorText = error ? "Please select a day" : "";

    return (
        <Paper className={classes.root}>
            <form className={classes.container} noValidate autoComplete="on" onSubmit={handleSubmit}>
                <TextField id="ian" label="IAN" className={classes.textField} margin="normal" required
                           {...bindIan}/>
                <TextField id="activity" label="Activity" className={classes.textField} margin="normal"
                           required {...bindActivity}/>
                <TextField id="object" label="Object" className={classes.textField} margin="normal"
                           required {...bindObject}/>

                <FormControl required error={error}>
                    <FormGroup className={classes.selections}>
                        <FormControlLabel control={<Checkbox checked={allDays} value="All"
                                                             onChange={() => setAllDays(prevState => !prevState)}/>}
                                          label="All"
                                          labelPlacement="top"/>
                        <FormControlLabel control={<Checkbox checked={monday} value="Monday"
                                                             onChange={() => setMonday(prevState => !prevState)}/>}
                                          label="Monday"
                                          labelPlacement="top"/>
                        <FormControlLabel
                            control={<Checkbox checked={tuesday} value="Tuesday"
                                               onChange={() => setTuesday(prevState => !prevState)}/>}
                            label="Tuesday"
                            labelPlacement="top"/>
                        <FormControlLabel
                            control={<Checkbox checked={wednesday} value="Wednesday"
                                               onChange={() => setWednesday(prevState => !prevState)}/>}
                            label="Wednesday"
                            labelPlacement="top"/>
                        <FormControlLabel
                            control={<Checkbox checked={thursday} value="Thursday"
                                               onChange={() => setThursday(prevState => !prevState)}/>}
                            label="Thursday"
                            labelPlacement="top"/>
                        <FormControlLabel control={<Checkbox checked={friday} value="Friday"
                                                             onChange={() => setFriday(prevState => !prevState)}/>}
                                          label="Friday"
                                          labelPlacement="top"/>
                    </FormGroup>
                    <FormHelperText hidden={!error}>{errorText}</FormHelperText>
                </FormControl>

                {isNewCode ? (
                    <Fab color="primary" className={classNames(classes.greenColor, classes.fab)} aria-label="Add"
                         type="submit">
                        <AddIcon/>
                    </Fab>
                ) : (
                    <>
                        <Fab color="primary" aria-label="Edit" className={classNames(classes.yellowColor, classes.fab)}>
                            <EditIcon/>
                        </Fab>
                        <Fab color="primary" aria-label="Delete" className={classNames(classes.redColor, classes.fab)}>
                            <DeleteIcon/>
                        </Fab>
                    </>
                )}
            </form>
        </Paper>
    );
};

export const WeekCodesForm = withStyles(styles)(AddEditCodesForm);

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
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import FormGroup from "@material-ui/core/es/FormGroup/FormGroup";

const styles = theme =>
    createStyles({
        root: {
            maxWidth: "max-content",
        },
        container: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-end",
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 100,
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
    const [wendesday, setWendesday] = useState(false);
    const [thursay, setThursday] = useState(false);
    const [friday, setFriday] = useState(false);
    const [allDays, setAllDays] = useState(false);

    React.useEffect(() => {
        if (allDays) {
            setMonday(true);
            setTuesday(true);
            setWendesday(true);
            setThursday(true);
            setFriday(true);
        } else {
            setMonday(false);
            setTuesday(false);
            setWendesday(false);
            setThursday(false);
            setFriday(false);
        }
    }, [allDays]);

    const selectAll = () => {
        setAllDays(prevState => !prevState);
    };

    const selectMonday = () => {
        setMonday(prevState => !prevState);
    };

    const selectTuesday = () => {
        setTuesday(prevState => !prevState);
    };

    const selectWendesday = () => {
        setWendesday(prevState => !prevState);
    };

    const selectThursday = () => {
        setThursday(prevState => !prevState);
    };

    const selectFriday = () => {
        setFriday(prevState => !prevState);
    };

    return (
        <Paper className={classes.root}>
            <form className={classes.container} autoComplete="on">
                <TextField id="ian" label="IAN" className={classes.textField} margin="normal" required/>
                <TextField id="activity" label="Activity" className={classes.textField} margin="normal" required/>
                <TextField id="object" label="Object" className={classes.textField} margin="normal" required/>

                <FormControl required>
                    <FormGroup className={classes.container}>
                        <FormControlLabel control={<Checkbox checked={allDays} value="All" onChange={selectAll}/>}
                                          label="All"
                                          labelPlacement="top"/>
                        <FormControlLabel control={<Checkbox checked={monday} value="Monday" onChange={selectMonday}/>}
                                          label="Monday"
                                          labelPlacement="top"/>
                        <FormControlLabel
                            control={<Checkbox checked={tuesday} value="Tuesday" onChange={selectTuesday}/>}
                            label="Tuesday"
                            labelPlacement="top"/>
                        <FormControlLabel
                            control={<Checkbox checked={wendesday} value="Wendesday" onChange={selectWendesday}/>}
                            label="Wendesday"
                            labelPlacement="top"/>
                        <FormControlLabel
                            control={<Checkbox checked={thursay} value="Thursday" onChange={selectThursday}/>}
                            label="Thursday"
                            labelPlacement="top"/>
                        <FormControlLabel control={<Checkbox checked={friday} value="Friday" onChange={selectFriday}/>}
                                          label="Friday"
                                          labelPlacement="top"/>
                    </FormGroup>
                </FormControl>

                {isNewCode ? (
                    <Fab color="primary" className={classNames(classes.greenColor, classes.fab)} aria-label="Add">
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

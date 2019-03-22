import React from 'react';
import { Paper, createStyles, WithStyles, withStyles, TextField, FormControlLabel, Checkbox, Button, Fab, Icon } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import classNames from 'classnames';

const styles = theme =>
    createStyles({
        root: {
            margin: '10px'
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 200,
        },
        fab: {
            margin: theme.spacing.unit,
        },
        greenColor: {
            color: theme.palette.getContrastText(green[500]),
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },
        redColor: {
            color: theme.palette.getContrastText(red[500]),
            backgroundColor: red[500],
            '&:hover': {
                backgroundColor: red[700],
            },
        },
        yellowColor: {
            color: theme.palette.getContrastText(yellow[500]),
            backgroundColor: yellow[500],
            '&:hover': {
                backgroundColor: yellow[700],
            },
        },
    });


interface Props extends WithStyles<typeof styles> {
    selectedWeek: Date;
}

const WeekCodesForm = (props: Props) => {
    const { classes } = props;

    return (
        <Paper className={classes.root}>
            <form className={classes.container} noValidate autoComplete="on">
                <TextField
                    id="ian"
                    label="IAN"
                    className={classes.textField}
                    margin="normal"
                />

                <TextField
                    id="activity"
                    label="Activity"
                    className={classes.textField}
                    margin="normal"
                />

                <TextField
                    id="object"
                    label="Object"
                    className={classes.textField}
                    margin="normal"
                />

                <FormControlLabel control={<Checkbox value="All" />} label="All" labelPlacement="top" />
                <FormControlLabel control={<Checkbox value="Monday" />} label="Monday" labelPlacement="top" />
                <FormControlLabel control={<Checkbox value="Tuesday" />} label="Tuesday" labelPlacement="top" />
                <FormControlLabel control={<Checkbox value="Wendesday" />} label="Wendesday" labelPlacement="top" />
                <FormControlLabel control={<Checkbox value="Thursday" />} label="Thursday" labelPlacement="top" />
                <FormControlLabel control={<Checkbox value="Friday" />} label="Friday" labelPlacement="top" />

                <Fab color="primary" className={classNames(classes.greenColor, classes.fab)} aria-label="Add">
                    <AddIcon />
                </Fab>
                <Fab color="primary" aria-label="Edit" className={classNames(classes.yellowColor, classes.fab)}>
                    <EditIcon />
                </Fab>
                <Fab color="primary" aria-label="Delete" className={classNames(classes.redColor, classes.fab)}>
                    <DeleteIcon />
                </Fab>
            </form>
        </Paper>
    );
}

export const AddEditWeekCodes = withStyles(styles)(WeekCodesForm);
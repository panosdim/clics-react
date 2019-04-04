import React from "react";
import {createStyles, Fab, withStyles, WithStyles} from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import yellow from "@material-ui/core/colors/yellow";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import classNames from "classnames";


const styles = theme =>
    createStyles({
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
    isNewEntry: boolean;
    onDelete: () => void;
}

const InnerFormButtons = (props: Props) => {
    const {classes, isNewEntry, onDelete} = props;

    return (
        <>
            {isNewEntry ? (
                <Fab color="primary" className={classNames(classes.greenColor, classes.fab)} aria-label="Add"
                     type="submit">
                    <AddIcon/>
                </Fab>
            ) : (
                <>
                    <Fab color="primary" aria-label="Edit" className={classNames(classes.yellowColor, classes.fab)}
                         type="submit">
                        <EditIcon/>
                    </Fab>
                    <Fab color="primary" aria-label="Delete" className={classNames(classes.redColor, classes.fab)}
                         onClick={onDelete}>
                        <DeleteIcon/>
                    </Fab>
                </>
            )}
        </>
    );
};

export const FormButtons = withStyles(styles)(InnerFormButtons);
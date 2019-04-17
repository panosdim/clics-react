import React, {useState} from "react";
import {ClicsCalendar, HintTable, WeekCodesForm, WeekTable} from ".";
import Grid from "@material-ui/core/es/Grid/Grid";
import {createStyles, withStyles, WithStyles} from "@material-ui/core";
import {clicsCodesType, clicsEntity} from "../model";
import red from "@material-ui/core/colors/red";
import classNames from "classnames";
import Fab from "@material-ui/core/Fab";
import ExitToApp from "@material-ui/icons/ExitToApp";
import {app} from "../stitch";


const styles = theme =>
    createStyles({
        root: {
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "fit-content",
        },
        flexEnd: {
            [theme.breakpoints.down("md")]: {
                display: "flex",
                justifyContent: "center"
            },
            [theme.breakpoints.up("lg")]: {
                display: "flex",
                justifyContent: "flex-end"
            },
        },
        flexStart: {
            [theme.breakpoints.down("md")]: {
                display: "flex",
                justifyContent: "center"
            },
            [theme.breakpoints.up("lg")]: {
                display: "flex",
                justifyContent: "flex-start"
            },
        },
        fab: {
            position: "absolute",
            bottom: theme.spacing.unit * 2,
            right: theme.spacing.unit * 2,
        },
        fabParent: {
            position: "relative",
        },
        redColor: {
            color: theme.palette.getContrastText(red[500]),
            backgroundColor: red[500],
            "&:hover": {
                backgroundColor: red[700],
            },
        },
    });


interface Props extends WithStyles<typeof styles> {
}

const Clics = (props: Props) => {
    const {classes} = props;
    const [selectedWeek, setSelectedWeek] = useState(new Date());
    const [selectedItem, setSelectedItem] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [selectedHintItem, setSelectedHintItem] = useState(null);

    const onSelectedWeekChanged = (selectedWeek: Date) => {
        setSelectedWeek(selectedWeek);
        setSelectedItem(null);
    };

    const onSelectedRowChanged = (item: clicsEntity) => {
        setSelectedItem(item);
    };

    const triggerRefresh = () => {
        setRefresh(!refresh);
        setSelectedItem(null);
        setSelectedHintItem(null);
    };

    const onHintTableClick = (ian, activity, object) => {
        const item: clicsCodesType = {ian: ian, activity: activity, object: object};
        setSelectedHintItem(item);
    };

    const handleLogout = () => {
        app.auth.logout().then(() => {
            window.location.reload();
        }).catch(err => {
            console.error(`logout failed with error: ${err}`);
        });
    };

    return (
        <div className={classes.root}>
            <Grid container justify="center" spacing={16}>
                <Grid item lg={4}>
                    <div className={classes.flexEnd}>
                        <ClicsCalendar
                            selectedWeek={selectedWeek}
                            onSelectionChange={onSelectedWeekChanged}/>
                    </div>
                </Grid>
                <Grid item lg={8}>
                    <div className={classes.flexStart}>
                        <WeekTable selectedWeek={selectedWeek} refresh={refresh}
                                   onSelectionChange={onSelectedRowChanged}/>
                    </div>
                </Grid>
            </Grid>
            <Grid container justify="center" spacing={16}>
                <Grid item lg={4}>
                    <div className={classes.flexEnd}>
                        <HintTable handleClick={onHintTableClick}/>
                    </div>
                </Grid>
                <Grid item lg={8}>
                    <div className={classes.flexStart}>
                        <WeekCodesForm selectedWeek={selectedWeek} clicsItem={selectedItem}
                                       hintTableItem={selectedHintItem} onFinish={triggerRefresh}/>
                    </div>
                </Grid>
            </Grid>
            <div className={classes.fabParent}>
                <Fab aria-label="Exit" className={classNames(classes.redColor, classes.fab)} onClick={handleLogout}>
                    <ExitToApp/>
                </Fab>
            </div>
        </div>
    );
};

export const ClicsApp = withStyles(styles)(Clics);
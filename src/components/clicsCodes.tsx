import React, {useState} from "react";
import {ClicsCalendar, clicsItemType, HintTable, WeekCodesForm, WeekTable} from ".";
import Grid from "@material-ui/core/es/Grid/Grid";
import {createStyles, withStyles, WithStyles} from "@material-ui/core";


const styles = theme =>
    createStyles({
        flexEnd: {
            [theme.breakpoints.down("sm")]: {
                display: "flex",
                justifyContent: "center"
            },
            [theme.breakpoints.up("md")]: {
                display: "flex",
                justifyContent: "flex-end"
            },
        },
        flexStart: {
            [theme.breakpoints.down("sm")]: {
                display: "flex",
                justifyContent: "center"
            },
            [theme.breakpoints.up("md")]: {
                display: "flex",
                justifyContent: "flex-start"
            },
        },
    });

export type hintTableItemType = {
    ian: string;
    activity: string;
    object: string;
}

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

    const onSelectedClicsChanged = (item: clicsItemType) => {
        setSelectedItem(item);
    };

    const triggerRefresh = () => {
        setRefresh(!refresh);
        setSelectedItem(null);
    };

    const onHintTableClick = (ian, activity, object) => {
        const item: hintTableItemType = {ian: ian, activity: activity, object: object};
        setSelectedHintItem(item);
    };

    return (
        <>
            <Grid container justify="center" spacing={16}>
                <Grid item xs>
                    <div className={classes.flexEnd}>
                        <ClicsCalendar
                            selectedWeek={selectedWeek}
                            onSelectionChange={onSelectedWeekChanged}/>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div className={classes.flexStart}>
                        <WeekTable selectedWeek={selectedWeek} refresh={refresh}
                                   onSelectionChange={onSelectedClicsChanged}/>
                    </div>
                </Grid>
            </Grid>
            <Grid container justify="center" spacing={16}>
                <Grid item xs>
                    <div className={classes.flexEnd}>
                        <HintTable handleClick={onHintTableClick}/>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div className={classes.flexStart}>
                        <WeekCodesForm selectedWeek={selectedWeek} clicsItem={selectedItem}
                                       hintTableItem={selectedHintItem} onFinish={triggerRefresh}/>
                    </div>
                </Grid>
            </Grid>
        </>
    );
};

export const ClicsCodes = withStyles(styles)(Clics);
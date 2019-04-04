import React, {useState} from "react";
import {ClicsCalendar, HintTable, WeekCodesForm, WeekTable} from ".";
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

interface Props extends WithStyles<typeof styles> {
}

const Clics = (props: Props) => {
    const {classes} = props;
    const [selectedWeek, setSelectedWeek] = useState(new Date());
    const [clicsId, setClicsId] = useState(0);
    const [refresh, setRefresh] = useState(false);

    const onSelectedWeekChanged = (selectedWeek: Date) => {
        setSelectedWeek(selectedWeek);
        setClicsId(0);
    };

    const onSelectedClicsChanged = (id: number) => {
        setClicsId(id);
    };

    const triggerRefresh = () => {
        setRefresh(!refresh);
        setClicsId(0);
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
                        <HintTable/>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div className={classes.flexStart}>
                        <WeekCodesForm selectedWeek={selectedWeek} clicsId={clicsId} onFinish={triggerRefresh}/>
                    </div>
                </Grid>
            </Grid>
        </>
    );
};

export const ClicsCodes = withStyles(styles)(Clics);
import React, { useState } from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import { StaticCalendar, WeekTable, AddEditWeekCodes } from '.';

const styles = theme =>
    createStyles({
        viewCodes: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap"
        }
    });

interface Props extends WithStyles<typeof styles> { }

const ViewClics = (props: Props) => {
    const [selectedWeek, handleWeekChange] = useState(new Date());
    const { classes } = props;

    const onSelectedWeekChanged = (selectedWeek: Date) => {
        handleWeekChange(selectedWeek);
    };

    return (
        <>
            <div className={classes.viewCodes}>
                <StaticCalendar selectedWeek={selectedWeek} onSelectionChange={onSelectedWeekChanged} />
                <WeekTable selectedWeek={selectedWeek} />
                <AddEditWeekCodes selectedWeek={selectedWeek} />
            </div>

        </>
    );
};

export const ViewCodes = withStyles(styles)(ViewClics);
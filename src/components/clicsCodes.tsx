import React, {useState} from "react";
import {ClicsCalendar, HintTable, WeekCodesForm, WeekTable} from ".";
import Grid from "@material-ui/core/es/Grid/Grid";

export const ClicsCodes = () => {
    const [selectedWeek, handleWeekChange] = useState(new Date());
    const [newCode, setNewCode] = useState(true);

    const onSelectedWeekChanged = (selectedWeek: Date) => {
        handleWeekChange(selectedWeek);
    };

    return (
        <Grid container direction="column" spacing={16}>
            <Grid item xs container justify="center" spacing={16}>
                <Grid item xs style={{flexGrow: 0}}>
                    <ClicsCalendar selectedWeek={selectedWeek} onSelectionChange={onSelectedWeekChanged}/>
                </Grid>
                <Grid item xs style={{flexGrow: 0}}>
                    <WeekTable selectedWeek={selectedWeek}/>
                </Grid>
            </Grid>
            <Grid item xs container justify="center" spacing={16}>
                <Grid item xs style={{flexGrow: 0, flexBasis: "auto"}}>
                    <WeekCodesForm selectedWeek={selectedWeek} isNewCode={newCode}/>
                </Grid>
                <Grid item xs style={{flexGrow: 0, flexBasis: "auto"}}>
                    <HintTable/>
                </Grid>
            </Grid>
        </Grid>
    );
};
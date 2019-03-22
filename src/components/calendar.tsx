import React, { useState } from "react";
import { Paper } from "@material-ui/core/";

import DateFnsUtils from "@date-io/date-fns";
import { BasePicker, MuiPickersUtilsProvider, Calendar } from "material-ui-pickers";
import IconButton from "@material-ui/core/IconButton/IconButton";
import { endOfWeek, format, isSameDay, isWithinInterval, startOfWeek } from "date-fns";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";

const cloneDate = (date: Date) => {
    return new Date(date.getTime());
};

const styles = theme =>
    createStyles({
        calendar: {
            margin: "10px",
        },
        dayWrapper: {
            position: "relative",
        },
        day: {
            width: 36,
            height: 36,
            fontSize: theme.typography.caption.fontSize,
            margin: "0 2px",
            color: "inherit",
        },
        customDayHighlight: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "2px",
            right: "2px",
            border: `1px solid ${theme.palette.secondary.main}`,
            borderRadius: "50%",
        },
        nonCurrentMonthDay: {
            color: theme.palette.text.disabled,
        },
        highlightNonCurrentMonthDay: {
            color: "#676767",
        },
        highlight: {
            background: theme.palette.primary.main,
            color: theme.palette.common.white,
        },
        firstHighlight: {
            extend: "highlight",
            borderTopLeftRadius: "50%",
            borderBottomLeftRadius: "50%",
        },
        endHighlight: {
            extend: "highlight",
            borderTopRightRadius: "50%",
            borderBottomRightRadius: "50%",
        },
    });

interface Props extends WithStyles<typeof styles> {
    selectedWeek: Date;
    onSelectionChange: (week: Date) => void;
}

const StaticPicker = (props: Props) => {
    const { classes, selectedWeek, onSelectionChange } = props;
    const [selectedDate, handleDateChange] = useState(selectedWeek);

    const handleWeekChange = (date: Date) => {
        onSelectionChange(startOfWeek(cloneDate(date)));
        handleDateChange(startOfWeek(cloneDate(date)));
    };

    const renderWrappedWeekDay = (date: Date, selectedDate: Date, dayInCurrentMonth: boolean) => {
        let dateClone = cloneDate(date);
        let selectedDateClone = cloneDate(selectedDate);

        const start = startOfWeek(selectedDateClone);
        const end = endOfWeek(selectedDateClone);

        const dayIsBetween = isWithinInterval(dateClone, { start, end });
        const isFirstDay = isSameDay(dateClone, start);
        const isLastDay = isSameDay(dateClone, end);

        const wrapperClassName = clsx({
            [classes.highlight]: dayIsBetween,
            [classes.firstHighlight]: isFirstDay,
            [classes.endHighlight]: isLastDay,
        });

        const dayClassName = clsx(classes.day, {
            [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
            [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
        });

        return (
            <div className={wrapperClassName}>
                <IconButton className={dayClassName}>
                    <span> {format(dateClone, "d")} </span>
                </IconButton>
            </div>
        );
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <BasePicker value={selectedDate} onChange={handleWeekChange}>
                {() => (
                    <div className={classes.calendar}>
                        <div className="picker">
                            <Paper style={{ overflow: "hidden" }}>
                                <Calendar
                                    date={selectedDate}
                                    onChange={handleWeekChange}
                                    maxDate='2100-01-01'
                                    minDate='1900-01-01'
                                    renderDay={renderWrappedWeekDay}
                                />
                            </Paper>
                        </div>
                    </div>
                )}
            </BasePicker>
        </MuiPickersUtilsProvider>
    );
};

export const StaticCalendar = withStyles(styles)(StaticPicker);

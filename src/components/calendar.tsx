import React, {useState} from "react";
import {Paper} from "@material-ui/core/";

import DateFnsUtils from "@date-io/date-fns";
import {BasePicker, Calendar, MuiPickersUtilsProvider} from "material-ui-pickers";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {
    endOfWeek,
    format,
    getYear,
    isEqual,
    isSameDay,
    isSaturday,
    isSunday,
    isWithinInterval,
    startOfWeek
} from "date-fns";
import clsx from "clsx";
import {createStyles, withStyles, WithStyles} from "@material-ui/core/styles";
import enLocale from "date-fns/locale/en-US";
import {red} from "@material-ui/core/colors";
import {getHolidays} from "../common";

const cloneDate = (date: Date) => {
    return new Date(date.getTime());
};

const styles = theme =>
    createStyles({
        calendar: {
            maxWidth: "max-content",
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
        weekend: {
            color: theme.palette.text.disabled,
        },
        holiday: {
            color: red[500],
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
    const {classes, selectedWeek, onSelectionChange} = props;
    const [selectedDate, handleDateChange] = useState(selectedWeek);

    const handleWeekChange = (date: Date) => {
        onSelectionChange(startOfWeek(cloneDate(date), {weekStartsOn: 1}));
        handleDateChange(startOfWeek(cloneDate(date), {weekStartsOn: 1}));
    };

    enLocale.options.weekStartsOn = 1;

    const renderWrappedWeekDay = (date: Date, selectedDate: Date, dayInCurrentMonth: boolean) => {
        let dateClone = cloneDate(date);
        let selectedDateClone = cloneDate(selectedDate);

        const start = startOfWeek(selectedDateClone, {weekStartsOn: 1});
        const end = endOfWeek(selectedDateClone, {weekStartsOn: 1});

        const holidays = getHolidays(getYear(date));

        const dayIsBetween = isWithinInterval(dateClone, {start, end});
        const isFirstDay = isSameDay(dateClone, start);
        const isLastDay = isSameDay(dateClone, end);

        const isWeekend = isSaturday(dateClone) || isSunday(dateClone);


        const wrapperClassName = clsx({
            [classes.highlight]: dayIsBetween,
            [classes.firstHighlight]: isFirstDay,
            [classes.endHighlight]: isLastDay,
        });

        const dayClassName = clsx(classes.day, {
            [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
            [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
            [classes.holiday]: holidays.some(holiday => isEqual(holiday, dateClone)),
        });

        return (
            <div className={wrapperClassName}>
                <IconButton disabled={isWeekend} className={dayClassName}>
                    <span> {format(dateClone, "d")} </span>
                </IconButton>
            </div>
        );
    };

    const disableWeekend = (date: Date): boolean => {
        return isSaturday(date) || isSunday(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
            <BasePicker value={selectedDate} onChange={handleWeekChange}>
                {() => (
                    <div className={classes.calendar}>
                        <div className="picker">
                            <Paper style={{overflow: "hidden"}}>
                                <Calendar
                                    date={selectedDate}
                                    onChange={handleWeekChange}
                                    maxDate="2100-01-01"
                                    minDate="1900-01-01"
                                    renderDay={renderWrappedWeekDay}
                                    shouldDisableDate={disableWeekend}
                                />
                            </Paper>
                        </div>
                    </div>
                )}
            </BasePicker>
        </MuiPickersUtilsProvider>
    );
};

export const ClicsCalendar = withStyles(styles)(StaticPicker);

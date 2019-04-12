import React, {useState} from "react";
import {Checkbox, createStyles, FormControlLabel, withStyles, WithStyles} from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import {selectedDaysType} from "../../model";

const styles = () =>
    createStyles({
        checkboxes: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "flex-end",
        },
    });

interface Props extends WithStyles<typeof styles> {
    selectedDays: selectedDaysType;
    onStateChanged: (newDaysSelected: selectedDaysType) => void;
}

const InnerDaysSelection = (props: Props) => {
    const {classes, selectedDays, onStateChanged} = props;
    const {monday, tuesday, wednesday, thursday, friday} = selectedDays;
    const [allDays, setAllDays] = useState(false);

    const error: boolean = !(monday || tuesday || wednesday || thursday || friday);
    const errorText: string = error ? "Please select a day" : "";

    React.useEffect(() => {
        setAllDays(monday && tuesday && wednesday && thursday && friday);
    }, [selectedDays]);

    const handleChange = (e) => {
        let newSelectedDays: selectedDaysType;

        if (e.target.value === "all") {
            setAllDays(e.target.checked);
            if (e.target.checked) {
                newSelectedDays = {
                    monday: true,
                    tuesday: true,
                    wednesday: true,
                    thursday: true,
                    friday: true
                };
            } else {
                newSelectedDays = {
                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false
                };
            }
        } else {
            newSelectedDays = {
                ...selectedDays,
                [e.target.value]: e.target.checked,
            };
        }

        onStateChanged(newSelectedDays);
    };

    return (
        <FormControl required error={error}>
            <FormGroup className={classes.checkboxes}>
                <FormControlLabel control={<Checkbox checked={allDays} value="all"
                                                     onChange={handleChange}/>}
                                  label="All"
                                  labelPlacement="top"/>
                <FormControlLabel control={<Checkbox checked={monday} value="monday"
                                                     onChange={handleChange}/>}
                                  label="Monday"
                                  labelPlacement="top"/>
                <FormControlLabel
                    control={<Checkbox checked={tuesday} value="tuesday"
                                       onChange={handleChange}/>}
                    label="Tuesday"
                    labelPlacement="top"/>
                <FormControlLabel
                    control={<Checkbox checked={wednesday} value="wednesday"
                                       onChange={handleChange}/>}
                    label="Wednesday"
                    labelPlacement="top"/>
                <FormControlLabel
                    control={<Checkbox checked={thursday} value="thursday"
                                       onChange={handleChange}/>}
                    label="Thursday"
                    labelPlacement="top"/>
                <FormControlLabel control={<Checkbox checked={friday} value="friday"
                                                     onChange={handleChange}/>}
                                  label="Friday"
                                  labelPlacement="top"/>
            </FormGroup>
            <FormHelperText hidden={!error}>{errorText}</FormHelperText>
        </FormControl>
    );
};

export const DaysSelection = withStyles(styles)(InnerDaysSelection);
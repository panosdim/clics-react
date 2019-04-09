import React, {useState} from "react";
import {createStyles, WithStyles, withStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {getISOWeek, getYear} from "date-fns";
import DoneIcon from "@material-ui/icons/Done";
import {items} from "../stitch";

const styles = () =>
    createStyles({
        root: {
            maxWidth: "max-content",
        },
    });

interface Props extends WithStyles<typeof styles> {
    selectedWeek: Date;
    onSelectionChange: (item: clicsItemType) => void;
    refresh: boolean;
}

export type clicsArrayType = clicsItemType[];

export type clicsItemType = {
    week: string;
    object: string;
    activity: string;
    ian: string;
    _id: string;
    owner_id: string;
    days: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
    }
};

const SimpleTable = (props: Props) => {
    const {classes, selectedWeek, onSelectionChange, refresh} = props;
    const [clicsState, setClicsState] = useState();
    const [selectedRow, setSelectedRow] = useState("");
    const week: string = String(getISOWeek(selectedWeek)) + String(getYear(selectedWeek));

    React.useEffect(() => {
        setSelectedRow("");

        items.find({week: week}, {limit: 1000}).asArray().then((docs: clicsArrayType) => {
            setClicsState(docs);
        });

    }, [selectedWeek, refresh]);

    const handleClick = (e, id) => {
        setSelectedRow(id);
        onSelectionChange(clicsState.find(item => item._id.toString() === id));
    };

    return <Paper className={classes.root}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>IAN</TableCell>
                    <TableCell>Activity</TableCell>
                    <TableCell>Object</TableCell>
                    <TableCell align="right">Monday</TableCell>
                    <TableCell align="right">Tuesday</TableCell>
                    <TableCell align="right">Wednesday</TableCell>
                    <TableCell align="right">Thursday</TableCell>
                    <TableCell align="right">Friday</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {clicsState && clicsState.map(row => {
                    const isSelected = selectedRow == row._id.toString();
                    return (
                        <TableRow hover selected={isSelected} onClick={e => handleClick(e, row._id.toString())}
                                  key={row._id.toString()}>
                            <TableCell>{row.ian}</TableCell>
                            <TableCell>{row.activity}</TableCell>
                            <TableCell>{row.object}</TableCell>
                            <TableCell align="right">{row.days.monday ? <DoneIcon/> : ""}</TableCell>
                            <TableCell align="right">{row.days.tuesday ? <DoneIcon/> : ""}</TableCell>
                            <TableCell align="right">{row.days.wednesday ? <DoneIcon/> : ""}</TableCell>
                            <TableCell align="right">{row.days.thursday ? <DoneIcon/> : ""}</TableCell>
                            <TableCell align="right">{row.days.friday ? <DoneIcon/> : ""}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    </Paper>;
};

export const WeekTable = withStyles(styles)(SimpleTable);

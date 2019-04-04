import React, {useState} from "react";
import {createStyles, WithStyles, withStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import db from "./appdb";
import {getISOWeek, getYear} from "date-fns";
import DoneIcon from "@material-ui/icons/Done";

const styles = () =>
    createStyles({
        root: {
            maxWidth: "max-content",
        },
    });

interface Props extends WithStyles<typeof styles> {
    selectedWeek: Date;
    onSelectionChange: (id: number) => void;
    refresh: boolean;
}

export type clicsType = {
    week: string;
    object: string;
    activity: string;
    ian: string;
    id: number;
    days: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
    }
}[];

const SimpleTable = (props: Props) => {
    const {classes, selectedWeek, onSelectionChange, refresh} = props;
    const [clicsState, setClicsState] = useState();
    const [selectedRow, setSelectedRow] = useState();
    const week: string = String(getISOWeek(selectedWeek)) + String(getYear(selectedWeek));

    React.useEffect(() => {
        setSelectedRow(0);
        db.transaction("rw", db.table("clics"), async () => {
            const clics: clicsType = await db.table("clics")
                .where("week").equals(week)
                .toArray();
            setClicsState(clics);
        }).catch(e => {
            // log any errors
            console.log(e.stack || e);
        });
    }, [selectedWeek, refresh]);

    const handleClick = (e, id) => {
        setSelectedRow(id);
        onSelectionChange(id);
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
                    const isSelected = selectedRow == row.id;
                    return (
                        <TableRow hover selected={isSelected} onClick={e => handleClick(e, row.id)} key={row.id}>
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

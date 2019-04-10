import React from "react";
import {createStyles, WithStyles, withStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {Tooltip} from "@material-ui/core";

const styles = () =>
    createStyles({
        root: {
            maxWidth: "max-content",
        },
    });

interface Props extends WithStyles<typeof styles> {
    handleClick: (ian: string, activity: string, object: string) => void;
}

const SimpleTable = (props: Props) => {
    const {classes, handleClick} = props;

    return (
        <Paper className={classes.root}>
            <Tooltip title="Click a row to transfer to edit form">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>IAN</TableCell>
                            <TableCell>Activity</TableCell>
                            <TableCell>Object</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow onClick={() => handleClick("16-041", "7901", "0001")}>
                            <TableCell>16-041</TableCell>
                            <TableCell>7901</TableCell>
                            <TableCell>0001</TableCell>
                            <TableCell>NPT</TableCell>
                        </TableRow>
                        <TableRow onClick={() => handleClick("04-001", "9007", "0007")}>
                            <TableCell>04-001</TableCell>
                            <TableCell>9007</TableCell>
                            <TableCell>0007</TableCell>
                            <TableCell>Annual Leave</TableCell>
                        </TableRow>
                        <TableRow onClick={() => handleClick("04-001", "9008", "0008")}>
                            <TableCell>04-001</TableCell>
                            <TableCell>9008</TableCell>
                            <TableCell>0008</TableCell>
                            <TableCell>Sick Leave</TableCell>
                        </TableRow>
                        <TableRow onClick={() => handleClick("04-001", "9010", "0010")}>
                            <TableCell>04-001</TableCell>
                            <TableCell>9010</TableCell>
                            <TableCell>0010</TableCell>
                            <TableCell>Bank Holiday</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Tooltip>
        </Paper>
    );
};

export const HintTable = withStyles(styles)(SimpleTable);

import React from "react";
import {createStyles, WithStyles, withStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = () =>
    createStyles({
        root: {
            maxWidth: "max-content",
        },
    });

interface Props extends WithStyles<typeof styles> {
}

const SimpleTable = (props: Props) => {
    const {classes} = props;

    return (
        <Paper className={classes.root}>
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
                    <TableRow>
                        <TableCell>16-041</TableCell>
                        <TableCell>7901</TableCell>
                        <TableCell>0001</TableCell>
                        <TableCell>NPT</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>04-001</TableCell>
                        <TableCell>9007</TableCell>
                        <TableCell>0007</TableCell>
                        <TableCell>Annual Leave</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>04-001</TableCell>
                        <TableCell>9008</TableCell>
                        <TableCell>0008</TableCell>
                        <TableCell>Sick Leave</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>04-001</TableCell>
                        <TableCell>9010</TableCell>
                        <TableCell>0010</TableCell>
                        <TableCell>Bank Holiday</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
};

export const HintTable = withStyles(styles)(SimpleTable);

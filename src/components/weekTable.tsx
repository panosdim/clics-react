import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = () =>
    createStyles({
        root: {
            margin: '10px'
        },
    });

interface Props extends WithStyles<typeof styles> {
    selectedWeek: Date;
}

const SimpleTable = (props: Props) => {
    const { classes, selectedWeek } = props;

    React.useEffect(() => {
        console.log(selectedWeek);
    }, [selectedWeek])

    return (
        <Paper className={classes.root}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>IAN</TableCell>
                        <TableCell>Activity</TableCell>
                        <TableCell>Object</TableCell>
                        <TableCell align="right">Monday</TableCell>
                        <TableCell align="right">Tuesday</TableCell>
                        <TableCell align="right">Wendesday</TableCell>
                        <TableCell align="right">Thursday</TableCell>
                        <TableCell align="right">Friday</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                </TableBody>
            </Table>
        </Paper>
    );
};

export const WeekTable = withStyles(styles)(SimpleTable);
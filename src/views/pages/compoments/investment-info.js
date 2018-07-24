import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'


const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
        textAlign: 'center',
    },
    body: {
        fontSize: 16,
        textAlign: 'center',
    },
}))(TableCell)


const styles = theme => ({
    row: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
        },
    },
    cell: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
    },
})

const createData = (name, BCST10001, BCST50001, BCST300000, BCST500000, BCST800000, BCST1000000) => {
    return { name, BCST10001, BCST50001, BCST300000, BCST500000, BCST800000, BCST1000000 }
}

const data = [
    createData('30 Days', '0.5% annualized return', '1.5% annualized return', '-', '-', '-', '-'),
    createData('60 Days', '1.5% annualized return', '2.5% annualized return', '4% annualized return', '8% annualized return', '12% annualized return', '16% annualized return',),
    createData('90 Days', '2.5% annualized return', '4.5% annualized return', '6% annualized return', '10% annualized return', '14% annualized return', '18% annualized return',),
]

 const CustomizedTable = (props) => {
    const { classes } = props
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="display2" align="center" gutterBottom>
                    BCST locked up plan
                </Typography>
                <Typography variant="subheading" align="center" gutterBottom>
                    Blockchain should be pragmatic - BCS Mall
                    In order to give back to the majority of BCST holders, we
                    made a special event for personal and community which
                    is locked up plan as follows:
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell></CustomTableCell>
                            <CustomTableCell numeric>10,001 BCST</CustomTableCell>
                            <CustomTableCell numeric>50,001 BCST</CustomTableCell>
                            <CustomTableCell numeric>300,000 BCST</CustomTableCell>
                            <CustomTableCell numeric>500,000 BCST</CustomTableCell>
                            <CustomTableCell numeric>800,000 BCST</CustomTableCell>
                            <CustomTableCell numeric>1,000,000 BCST</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => {
                            return (
                                <TableRow className={classes.row} key={index}>
                                    <CustomTableCell className={classes.cell} component="th" scope="row">
                                        {item.name}
                                    </CustomTableCell>
                                    <CustomTableCell numeric>{item.BCST10001}</CustomTableCell>
                                    <CustomTableCell numeric>{item.BCST50001}</CustomTableCell>
                                    <CustomTableCell numeric>{item.BCST300000}</CustomTableCell>
                                    <CustomTableCell numeric>{item.BCST500000}</CustomTableCell>
                                    <CustomTableCell numeric>{item.BCST800000}</CustomTableCell>
                                    <CustomTableCell numeric>{item.BCST1000000}</CustomTableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(CustomizedTable)
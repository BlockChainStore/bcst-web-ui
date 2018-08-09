import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'

import Text from '../../languages'


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
    table: {
        width: 0,
        overflowY: 'hidden',
        overflowX: 'auto'
    }
})

const createData = (name, BCST10001, BCST50001, BCST300000, BCST500000, BCST800000, BCST1000000) => {
    return { name, BCST10001, BCST50001, BCST300000, BCST500000, BCST800000, BCST1000000 }
}

 const CustomizedTable = (props, context) => {
    const { classes } = props
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="display2" align="center" gutterBottom>
                    <Text  keyWord={'project'} />
                </Typography>
                <Typography variant="subheading" align="center" gutterBottom>
                    <Text keyWord={'describe'} />
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.table}>
                <Table >
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
                        <TableRow className={classes.row} >
                            <CustomTableCell className={classes.cell} component="th" scope="row">
                                30<Text keyWord={'days'}/>
                            </CustomTableCell>
                            <CustomTableCell numeric>0.5%<Text keyWord={'annualized'}/></CustomTableCell>
                            <CustomTableCell numeric>1.5%<Text keyWord={'annualized'}/></CustomTableCell>
                            <CustomTableCell numeric></CustomTableCell>
                            <CustomTableCell numeric></CustomTableCell>
                            <CustomTableCell numeric></CustomTableCell>
                            <CustomTableCell numeric></CustomTableCell>
                        </TableRow>
                        <TableRow className={classes.row} >
                            <CustomTableCell className={classes.cell} component="th" scope="row">
                                60<Text keyWord={'days'}/>
                            </CustomTableCell>
                            <CustomTableCell numeric>1.5%<Text keyWord={'annualized'}/></CustomTableCell>
                            <CustomTableCell numeric>2.5%<Text keyWord={'annualized'}/></CustomTableCell>
                            <CustomTableCell numeric>4%<Text keyWord={'annualized'}/></CustomTableCell>
                            <CustomTableCell numeric>8%<Text keyWord={'annualized'}/></CustomTableCell>
                            <CustomTableCell numeric>12%<Text keyWord={'annualized'}/></CustomTableCell>
                            <CustomTableCell numeric>16%<Text keyWord={'annualized'}/></CustomTableCell>
                        </TableRow>
                        <TableRow className={classes.row} >
                            <CustomTableCell className={classes.cell} component="th" scope="row">
                                90<Text keyWord={'days'}/>
                            </CustomTableCell>
                            <CustomTableCell numeric>2.5%<Text keyWord={'annualized'}/></CustomTableCell>
                            <CustomTableCell numeric>4.5%<Text keyWord={'annualized'}/></CustomTableCell>
                            <CustomTableCell numeric>6%<Text keyWord={'annualized'}/></CustomTableCell>
                            <CustomTableCell numeric>10%<Text keyWord={'annualized'}/></CustomTableCell>
                            <CustomTableCell numeric>14%<Text keyWord={'annualized'}/></CustomTableCell>
                            <CustomTableCell numeric>18%<Text keyWord={'annualized'}/></CustomTableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(CustomizedTable)
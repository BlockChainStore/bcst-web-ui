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
        fontSize: 18,
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
        // backgroundColor: theme.palette.primary.light,
        // color: theme.palette.common.white,
    },
    table: {
        width: 0,
        overflowY: 'hidden',
        overflowX: 'auto',
        marginBottom: 30,
        borderRadius: 10,
    },
    describe: {
        marginTop: 30,
        marginBottom: 30,
    }
    
})


const CustomizedTable = (props) => {
    const { classes } = props
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="display2" align="center" color='primary'>
                    <Text  keyWord={'project'} />
                </Typography>
                <Typography variant="subheading" align="center" className={classes.describe}>
                    <Text keyWord={'describe'} />
                </Typography>
            </Grid>
            <Text keyWord={'personalInfo'}/>
            <Grid item xs={12} className={classes.table}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>BCST</CustomTableCell>
                            <CustomTableCell numeric> 30<Text keyWord={'Days'}/></CustomTableCell>
                            <CustomTableCell numeric> 60<Text keyWord={'Days'}/></CustomTableCell>
                            <CustomTableCell numeric> 90<Text keyWord={'Days'}/></CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className={classes.row} >
                            <CustomTableCell className={classes.cell} component="th" scope="row">
                                10001 BCST
                            </CustomTableCell>
                            <CustomTableCell numeric>0.5%<Text keyWord={'annualized'}/></CustomTableCell>
                            <CustomTableCell numeric>1.5%<Text keyWord={'annualized'}/></CustomTableCell>
                            <CustomTableCell numeric>2.5%<Text keyWord={'annualized'}/></CustomTableCell>
                        </TableRow>
                        <TableRow className={classes.row} >
                            <CustomTableCell className={classes.cell} component="th" scope="row">
                                50001 BCST
                            </CustomTableCell>
                            <CustomTableCell numeric>1.5%<Text keyWord={'annualized'}/></CustomTableCell>
                            <CustomTableCell numeric>2.5%<Text keyWord={'annualized'}/></CustomTableCell>
                            <CustomTableCell numeric>4.5%<Text keyWord={'annualized'}/></CustomTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Grid>
            <Text keyWord={'communityInfo'}/>
            <Grid item xs={12} className={classes.table}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>BCST</CustomTableCell>
                            <CustomTableCell numeric>300000</CustomTableCell>
                            <CustomTableCell numeric>500000</CustomTableCell>
                            <CustomTableCell numeric>800000</CustomTableCell>
                            <CustomTableCell numeric>1000000</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className={classes.row} >
                            <CustomTableCell className={classes.cell} component="th" scope="row">
                                60<Text keyWord={'Days'}/>
                            </CustomTableCell>
                            <CustomTableCell numeric>4%<Text keyWord={'annualized'}/></CustomTableCell>
                            <CustomTableCell numeric>8%<Text keyWord={'annualized'}/></CustomTableCell>
                            <CustomTableCell numeric>12%<Text keyWord={'annualized'}/></CustomTableCell>
                            <CustomTableCell numeric>16%<Text keyWord={'annualized'}/></CustomTableCell>
                        </TableRow>
                        <TableRow className={classes.row} >
                            <CustomTableCell className={classes.cell} component="th" scope="row">
                                90<Text keyWord={'Days'}/>
                            </CustomTableCell>
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
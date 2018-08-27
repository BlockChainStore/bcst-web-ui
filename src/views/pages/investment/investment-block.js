import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import IconPerson from '@material-ui/icons/Person'
import IconGroup from '@material-ui/icons/Group'
import PersonalStep from './personal-step'
import PersonalProgress from './personal-progress'
import CommunityStep from './community-step'


const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    tabContainer: {
        paddingTop: theme.spacing.unit * 2
    }
})

class InvestmentBlock extends React.Component {
    state = {
        value: 0,
    }

    handleChange = (event, value) => {
        this.setState({ value })
    }

    handleChangeIndex = index => {
        this.setState({ value: index })
    }

    render() {
        const { classes, theme, investment } = this.props

        return (
            <Paper square>
                <div className={classes.root}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            fullWidth
                            centered>
                            <Tab label="Personal" icon={<IconPerson />} />
                            <Tab label="Community" icon={<IconGroup />}  />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}>
                        <div className={classes.tabContainer}>
                            {investment.personal.principle !== '0' || !!!investment.personal.principle
                                ? <PersonalProgress />
                                : <PersonalStep />}
                        </div>
                        <div className={classes.tabContainer}>
                            <CommunityStep />
                        </div>
                    </SwipeableViews>
                </div>
            </Paper>
        )
    }
}


const mapStateToProps = state => ({
    investment: state.duck.investment
})
  
export default connect(
    mapStateToProps,
    null
)(withStyles(styles, { withTheme: true })(InvestmentBlock))
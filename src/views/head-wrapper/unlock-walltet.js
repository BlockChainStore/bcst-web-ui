import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import userActions from '../../ducks/user/actions'
import Text from '../languages'
import PrivateKeyBlock from './unlock-walltet-private-key'
import KeystoreBlock from './unlock-walltet-keystore'
import NewWalletBlock from './unlock-walltet-new-wallet'
import SimpleModalWrapped from '../pages/compoments/warning-popup'




const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
})

function TabContainer({ children, dir }) {
    return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
        {children}
      </Typography>
    );
  }

class UnlockWallet extends React.Component {
    state = { open: false, tab: 0}

    handleOpen = () => this.setState({ ...this.state, open: true })

    handleClose = () => this.setState({ ...this.state, open: false })

    handleChangeTab = (event, value) => {
        this.setState({ tab: value })
    }
    
    handleChangeTabIndex = index => {
        this.setState({ value: index })
    }
    

    handleUnlockWallet = (privateKey) => {
        this.props.userActions.onUnlockWallet(privateKey)
    }

    render() {
        const { classes, theme, user, userActions } = this.props
        const isUnlockWallet = !!user.info.address
        return (
            <div>
                {isUnlockWallet
                    ? <Button 
                        onClick={userActions.onLogoutWallet}  
                        color="inherit" >
                        <Text keyWord={'logoutWallet'} />             
                    </Button>
                    : 
                    <Button 
                        onClick={this.handleOpen}  
                        color="inherit" >
                        <Text  keyWord={'unlockWallet'}/>
                    </Button>
                } 
                { !!!isUnlockWallet&&<SimpleModalWrapped/> }         
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}>
                    <div className={classes.paper}>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={this.state.tab}
                                onChange={this.handleChangeTab}
                                indicatorColor="primary"
                                textColor="primary"
                                fullWidth>
                                <Tab label={<Text keyWord={'keyStore'} />}/>
                                <Tab label={<Text keyWord={'newWalllet'} />}/>
                                <Tab label={<Text keyWord={'privateKey'} />}/>
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={this.state.tab}
                            onChangeIndex={this.handleChangeTabIndex}>
                            <TabContainer dir={theme.direction}>
                                <KeystoreBlock handleUnlockWallet={this.handleUnlockWallet}/>
                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                <NewWalletBlock />
                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                <PrivateKeyBlock handleUnlockWallet={this.handleUnlockWallet}/>
                            </TabContainer>
                        </SwipeableViews>
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  user: state.duck.user
})

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(UnlockWallet))

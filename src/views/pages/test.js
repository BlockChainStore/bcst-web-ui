import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import userActions from '../../ducks/user/actions'
import Text from '../languages'

import PropTypes from 'prop-types';

import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Private Key" />
            <Tab label="Keystore" />
          </Tabs>
        </AppBar>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
        >
            <TabContainer dir={theme.direction}>
            <div className={classes.paper}>
                        <Typography variant="title">
                            <Text  keyWord={'enterPk'}/>
                        </Typography>
                        <TextField
                            onKeyPress={(e) => {
                                if(e.key === 'Enter') {
                                    this.handleUnlockWallet()
                                }
                            }}
                            error={this.state.isInputErr}
                            label={<Text  keyWord={'yourPK'}/>}
                            placeholder="eg 0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709"
                            helperText={this.state.isInputErr ? <Text  keyWord={'correctPK'}/> : ''}
                            margin="normal"
                            inputRef={ref => this.inputPk = ref}
                            fullWidth/>
                        <Grid container justify='flex-end'>
                            <Grid item className={classes.modalButton}>
                                <Button
                                    onClick={this.handleUnlockWallet}
                                    className={classes.button}
                                    variant="contained" 
                                    color="primary">
                                    CREATE WALLET
                                </Button>
                                <Button
                                    onClick={this.handleUnlockWallet}
                                    className={classes.button}
                                    disabled={this.state.isInputDisable}
                                    variant="contained" 
                                    color="primary">
                                    {this.state.isInputDisable && 
                                        <CircularProgress size={25} className={classes.progress} />}
                                    <Text  keyWord={'enter'}/>
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
            </TabContainer>
            <TabContainer dir={theme.direction}>
                Please Choose Your Wallet File And Enter Password
                <Button
                    onClick={this.handleUnlockWallet}
                    className={classes.button}
                    variant="fab" 
                    color="primary">
                    SELECT WALLET FILE
                </Button>
                <TextField
                    onKeyPress={(e) => {
                        if(e.key === 'Enter') {
                            this.handleUnlockWallet()
                        }
                    }}
                    error={this.state.isInputErr}
                    label="Your wallet is encrypted. Please enter the password."
                    placeholder="Password"
                    helperText={this.state.isInputErr ? <Text  keyWord={'correctPK'}/> : ''}
                    margin="normal"
                    inputRef={ref => this.inputPk = ref}
                    fullWidth/>
                <Grid container justify='flex-end'>
                    <Grid item className={classes.modalButton}>
                        <Button
                            onClick={this.handleUnlockWallet}
                            className={classes.button}
                            disabled={this.state.isInputDisable}
                            variant="contained" 
                            color="primary">
                            {this.state.isInputDisable && 
                                <CircularProgress size={25} className={classes.progress} />}
                            <Text  keyWord={'enter'}/>
                        </Button>
                    </Grid>
                </Grid>
            </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
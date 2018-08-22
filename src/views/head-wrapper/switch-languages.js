import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import userActions from '../../ducks/user/actions'


const styles = theme => ({
    container: {
        position: 'fixed',
        zIndex: 1500,
        top: 0,
        right: 0,
        minHeight: 56,
        [theme.breakpoints.up('sm')]: {
            minHeight: 64
        }
    },
    avatar: {
        color: theme.palette.primary.main,
        fontSize: 'medium',
        backgroundColor: '#fff'
    },
    button: {
        padding: '8px 16px',
        [theme.breakpoints.up('sm')]: {
            padding: '12px 16px',
        }
    },
    menu: {
        zIndex: 1510,
    }
})

class SwitchLanguages extends React.PureComponent {
    state = {
        anchorEl: null
    }

    handleChange = (language) => {
        const { userActions } = this.props
        userActions.onChangeLanguage(language)
        this.handleClose()
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose = () => {
        this.setState({ anchorEl: null })
    }

    render() {
        const { classes, language } = this.props
        const { anchorEl } = this.state
        const open = Boolean(anchorEl)

        return (
            <div className={classes.container}>
                <Button className={classes.button} onClick={this.handleMenu}>
                   <Avatar className={classes.avatar}>{language}</Avatar>
                </Button>
                <Menu
                    className={classes.menu}
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={open}
                    onClose={this.handleClose}>
                    <MenuItem onClick={() => this.handleChange('en')}>English</MenuItem>
                    <MenuItem onClick={() => this.handleChange('zh')}>中文</MenuItem>
                </Menu>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    language: state.duck.user.language
})

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
})  

export default connect(
    mapStateToProps,
    mapDispatchToProps
)((withStyles(styles)(SwitchLanguages)))
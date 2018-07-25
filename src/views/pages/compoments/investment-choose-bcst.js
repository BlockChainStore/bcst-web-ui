import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});


class TextFields extends React.Component {
    state = {
        bcst: 0,
        day:[],
    };

    handleChange = name => event => {
        this.setState({
        [name]: event.target.value,
        });
    };


    render() {
        const { classes } = this.props

        return (
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                id="with-placeholder"
                onChange={this.handleChange('bcst')}
                label="BCST"
                placeholder="token"
                className={classes.textField}
                margin="normal"
                inputRef={ref => this.bcst = ref}
            />
        </form>
        );
    }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TextFields)

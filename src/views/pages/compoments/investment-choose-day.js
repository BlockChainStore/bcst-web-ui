import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
// import amount from './investment-choose-bcst'
const styles = theme => ({
root: {
    display: 'flex',
    flexWrap: 'wrap',
},
formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
},
selectEmpty: {
    marginTop: theme.spacing.unit * 2,
},
});

class NativeSelects extends React.Component {
state = {
    age: '',
    name: 'hai',
};

handleChange = name => event => {
    this.setState({ [name]: event.target.value });
};

render() {
    const { classes } = this.props;

    return (
    <div className={classes.root}>
        
        <FormControl required className={classes.formControl}>
        <InputLabel htmlFor="day-native-required">Day</InputLabel>
        <Select
            native
            value={this.state.day}
            onChange={this.handleChange('day')}
            name="day"
            inputProps={{
            id: 'day-native-required',
            }}
            inputRef={ref => this.inputPk = ref}
        >
            <option value=""/>
            <option value={30}>30</option>
            <option value={60}>60</option>
            <option value={90}>90</option>
        </Select>
        <FormHelperText>Required</FormHelperText>
        </FormControl>
    </div>
    );
}
}

NativeSelects.propTypes = {
classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NativeSelects)
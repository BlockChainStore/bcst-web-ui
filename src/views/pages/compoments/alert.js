import React from 'react'
import { bindActionCreators } from 'redux'
import Snackbar from '@material-ui/core/Snackbar'
import { connect } from 'react-redux'
import commonActions from '../../../ducks/common/actions'


class PositionedSnackbar extends React.Component {

    handleClose = () => {
        this.props.commonActions.onUpdateAlert(null, null)
    }

    render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left'  }}
                    open={!!this.props.alert.type}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={
                    <span id="message-id">
                        {this.props.alert.type}, {this.props.alert.message}
                    </span>}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    alert: state.common.alert
})

const mapDispatchToProps = dispatch => ({
    commonActions: bindActionCreators(commonActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PositionedSnackbar)
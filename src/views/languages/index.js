import React from 'react'
import { connect } from 'react-redux'
import translations from './translations'


class Text extends React.PureComponent {


    translate = (keyWord, options) => {
        const language = this.props.language || 'en'
        const text = translations[language].messages[keyWord]
        return text
    }

    render() {
        const keyWord = this.props.keyWord
        const options = this.props.options || {}
        return (
            <span>
                {this.translate(keyWord, options)}
            </span>
        )
    }
}

const mapStateToProps = state => ({
    language: state.duck.user.language
})


export default connect(
    mapStateToProps,
    null
)(Text)

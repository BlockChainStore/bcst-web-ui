import React from 'react'
import { connect } from 'react-redux'
import translations from './translations'


class Text extends React.PureComponent {


    translate = (keyWord, params) => {
        const language = this.props.language || 'en'
        let text = translations[language].messages[keyWord]

        for (const param in params) {
            text = text.replace(
                new RegExp(`{${param}}`, 'g'), 
                params[param]
            )
        }

        return text
    }

    render() {
        const keyWord = this.props.keyWord
        const params = this.props.params || {}
        return (
            <span>
                {this.translate(keyWord, params)}
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

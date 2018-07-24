import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


export const pageTransition = (Page) => () => (
	<ReactCSSTransitionGroup
		transitionAppear={true}
		transitionAppearTimeout={150}
		transitionEnterTimeout={0}
		transitionLeaveTimeout={0}
		transitionName="PageTransitionSlideIn">
		<Page />
	</ReactCSSTransitionGroup>
)
	
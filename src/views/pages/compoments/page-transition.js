import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


export const PageTransitionSlideIn = ({children}) => {
	return (
      <ReactCSSTransitionGroup
		transitionAppear={true}
        transitionName={'PageTransitionSlideIn'}>
		{children}
	   </ReactCSSTransitionGroup>
	)
}

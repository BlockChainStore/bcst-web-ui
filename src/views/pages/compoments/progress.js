import React from 'react'
import LinearProgressMaterial from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'


export const LinearProgress = () => {
    return (
        <div>
            <Typography noWrap align="center" color='textSecondary'>
                Your request is being prossed. This might take some time. 
            </Typography>
            <LinearProgressMaterial />
        </div>
    )
}
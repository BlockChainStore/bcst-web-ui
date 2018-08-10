import React from 'react'
import LinearProgressMaterial from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Text from '../../languages'

export const LinearProgress = () => {
    return (
        <div>
            <Typography noWrap align="center" color='textSecondary'>
                <Text keyWord={'takeTime'} />
            </Typography>
            <LinearProgressMaterial />
        </div>
    )
}
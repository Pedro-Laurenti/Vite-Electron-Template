import React from 'react'

const Progress: React.FC<React.PropsWithChildren<{percent?: number}>> = props => {
    const { percent = 0 } = props

    return (
        <progress 
            className="progress progress-primary w-56" 
            value={percent} 
            max="100">
        </progress>
    )
}

export default Progress
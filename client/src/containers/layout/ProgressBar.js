import React from 'react'
import { connect } from 'react-redux'
import Progress from '../../components/layout/Progress'

function ProgressBar({loading}) {
    return loading? <Progress/> : <div/>
    
}

const mapStateToProps = state => ({
    loading: state.auth.userLoading
})

export default connect(mapStateToProps) (ProgressBar)

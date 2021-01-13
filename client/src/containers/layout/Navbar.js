import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions';
import NavigationBar from '../../components/layout/NavigationBar'
import { useDispatch } from 'react-redux'

function Navbar({auth}) {
    const dispatch = useDispatch()

    const handleClick = e => {
        e.preventDefault();
        logoutUser(dispatch);
    }

    return (
        <NavigationBar auth = {auth.isAuthenticated} onClick = {handleClick}/>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    {logoutUser}
) (Navbar)

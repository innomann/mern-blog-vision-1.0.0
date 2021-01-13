import React,{useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import registerUser from '../../actions/authActions'
import SignUp from '../../components/auth/SignUp'
import Validate from '../../components/form/Validate'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { clearErrors } from '../../actions/errorActions'

function SignUpPage({auth,errors}) {
    let history = useHistory()
    let dispatch = useDispatch()
    

    const [user, setUser] = useState({
        user_name: "",
        email: "",
        password: "",
        errors: {}
    })

    // clearing error incase user switches to login page while already having errors in login page
   useEffect(() => {
       const unlisten = history.listen(() => clearErrors());
       return () => unlisten();
    }, [history]);


    useEffect(() => {
        setUser(user => {
           return { ...user, errors };
        });
     }, [errors]);

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleBlur = e => {
        const { name, value } = e.target
        const err = {...user.errors, ...Validate(name,value).errors}
        setUser({...user, errors: {...err}})
    }

    const handleSubmit = e => {
        e.preventDefault()
        const {user_name, email, password} = user;
        registerUser({user_name,email,password}, history, dispatch)
    }
    return (
        <SignUp
        user = {{...user}}
        onBlur = { handleBlur }
        onChange = {handleChange}
        onSubmit = {handleSubmit}
        />
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    {registerUser}
)(SignUpPage);

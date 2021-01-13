import React,{ useState, useEffect } from 'react'
import { loginUser } from '../../actions/authActions'
import Login from '../../components/auth/Login'
import Validate from '../../components/form/Validate'
import { connect, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'


function LoginPage({errors,auth}) {
    let dispatch = useDispatch()
    let history = useHistory()

    const [user, setUser] = useState({
        email: "",
        password: "",
        errors: {}
    })

    const [message, setMessage] = useState("")

    useEffect(() => {
        if(localStorage.loginMessage){
            setMessage(localStorage.loginMessage)
            localStorage.setItem("loginMessage","")
        }
    }, [])

    useEffect(() =>{
        if(auth.isAuthenticated){
            history.push("/blog")
        }
        setUser(user => {
            return {...user, errors}
        })
    },[auth, errors ,history])

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const handleBlur = e => {
        const {name, value} = e.target;
        const err = {...user.errors,...Validate(name,value).errors}
        setUser({...user, errors:{...err}})
    }

    const handleSubmit = e => {
        e.preventDefault();
        const {email,password} = user;
        loginUser({email,password}, dispatch)
        
    }

    return (
        <Login
        message = { message }
        user = {{...user}}
        onBlur = { handleBlur }
        onChange = { handleChange }
        onSubmit = { handleSubmit }
        />
    )
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
})

export default connect (
    mapStateToProps,
    {loginUser}
) (LoginPage)

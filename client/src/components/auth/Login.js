import React from 'react'
import { Link } from 'react-router-dom'
import {Card,Button,Form,Container,Row,Col,Alert} from "react-bootstrap";
import Inputs from '../../components/form/Inputs';

function Login({message,user,onChange,onBlur,onSubmit}) {
    const { email,password,errors } = user;
    return (
        <Container>
            <Row>
                <Col className="mx-auto" sm={11} md={7} lg={5}>
                    <Card className="my-4">
                        <Form noValidate onSubmit = {onSubmit} className="p-sm-3 p-xs-1">
                            <Card.Body>
                                <Card.Title as="h3" className="text-center theme-color mb-4 mt-2">Login</Card.Title>
                                { message.length > 0 && (<Alert variant= "success">{message}</Alert>) }
                                <Inputs
                                name = "email"
                                type = "email"
                                placeholder = "Enter Email"
                                value = {email}
                                onBlur = { onBlur }
                                onChange = { onChange }
                                text = {{module : "Signin", label : "Email", error : errors.email}}
                                />
                                <Inputs
                                name = "password"
                                type = "password"
                                placeholder = "Enter Password"
                                value = {password}
                                onBlur = { onBlur }
                                onChange = { onChange }
                                text = {{module : "Signin", label : "Password", error : errors.password}}
                                />

                               <Button variant="info" type="submit" className="mt-3" > Submit </Button>
                               <Card.Text className="mt-2">
                                   Don't have an account?{" "}
                                 <Link to={"/signup"}>SignUp</Link>
                               </Card.Text>
                                
                            </Card.Body>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login

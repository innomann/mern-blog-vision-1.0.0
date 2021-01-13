import React from 'react'
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar({auth,onClick}) {
    return (
        <Navbar bg="dark" variant="dark" expand="sm" className="mb-3" style={{ minHeight: "4rem" }}>
            <Link to="/blog">
                <Navbar.Brand>
                    <img src="https://react-bootstrap.github.io/logo.svg" style={{ height: 30, width: 30 }} className="d-inline-block align-top" alt=""/>
                    {" Bloggy "}
                </Navbar.Brand>
            </Link>
            <Nav className="ml-auto">

                { auth?
                (
                <Link to="/logout">
                    <Button variant="outline-light" onClick = {onClick} className="mr-sm-2" >Logout</Button>
                </Link>
                )
                : 
                (
                <Link to="/login">
                    <Button variant="outline-light" className="mr-sm-2">Login</Button>
                </Link>
                )
                }

            </Nav>
        </Navbar>

    )
}

export default NavigationBar

import React from 'react'
import Form from "react-bootstrap/Form";

function Inputs({ name, type, placeholder, value, onChange, onBlur, text}) {
    return (
        <Form.Group controlId={text.module + name} >
            <Form.Label> {text.label} </Form.Label>
            <Form.Control
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}  
            onBlur= {onBlur}
            />
           <p style={{color: "red"}}> {text.error} </p>
        </Form.Group>
    )
}

export default Inputs

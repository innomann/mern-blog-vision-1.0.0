import React from 'react'
import Form from "react-bootstrap/Form";

function TextArea({name,placeholder,value,onBlur, onChange,text}) {
    return (
        <Form.Group controlId="name">
            <Form.Label>{"form label"}</Form.Label>
            <Form.Control
            name= { name }
            as="textarea"
            rows="10" 
            value= {value}
            placeholder = { placeholder }
            onChange = { onChange }   
            onBlur = { onBlur }      
            />
            <p style={{color: "red"}} >{text.error}</p>
        </Form.Group>
    )
}

export default TextArea

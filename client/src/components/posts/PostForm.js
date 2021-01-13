import React from 'react'
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Inputs from '../form/Inputs';
import TextArea from '../form/TextArea';

function PostForm({post,onChange,onBlur,loading,onSubmit}) {
    const { title, body ,errors } = post
    return (
        <Container>
            <Row>
                <Col className="mx-auto">
                    <Form noValidate onSubmit = { onSubmit } className="p-sm-3 p-xs-1">
                        <Inputs
                        name = "title"
                        placeholder = " Enter Post Title Here"
                        value = {title}
                        onChange = { onChange }
                        onBlur = { onBlur }
                        onSubmit = { onSubmit }
                        text = {{module: "post", label: "Title" ,error: errors.title}}

                        />

                        <TextArea
                        name = "body"
                        placeholder = "Write your post here..."
                        value = { body }
                        onChange = {onChange}
                        onBlur = { onBlur }
                        onSubmit = { onSubmit }
                        text = {{module: "post", label: "Description" ,error: errors.body}}
                        />
                        
                        <Button variant="outline-info" type="submit"  disabled= {loading} className="mt-3" > Submit </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default PostForm

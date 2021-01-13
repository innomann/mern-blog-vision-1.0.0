import React from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";
import "./post.scss";



function ViewPost({post, onDelete}) {
    return (
        <Container className="mt-4 viewPost">
            <Row>
                <Col className="text-center postTitle">
                    <h2> { post.title } </h2>
                </Col>
            </Row>

            <Row className="my-4" style={{ whiteSpace: "pre-wrap" }}>
                <Col> { post.body } </Col>
            </Row>

            <Row className="d-flex flex-column font-italic footerStyle">
                <Col>Created by : {post.author}</Col>
                <Col>Date:{post.date} </Col>
            </Row>

            <Row className="mt-4">
               <Col className="text-center">
                  <Button className="mr-2" variant="outline-info">
                     Edit
                  </Button>

                  <Button variant="outline-danger" onClick = {onDelete}>
                     Delete
                  </Button>
               </Col>
            </Row>
        </Container>
    )
}

export default ViewPost

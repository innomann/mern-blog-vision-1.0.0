import React from 'react'
import Card from "react-bootstrap/Card";
import './post.scss'

function Post({post}) {
    return (
        <Card className="deckStyle" style={{ border: "none" }}>
            <Card.Body className="postCover">
                <Card.Title className="text-center p-5"> {post.title} </Card.Title>

            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Posted on: dateposted will go here</small>
            </Card.Footer>
        </Card>
    )
}

export default Post

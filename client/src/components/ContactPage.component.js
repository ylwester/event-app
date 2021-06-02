import {Row, Container, Input, Col, Label, Form, FormGroup} from "reactstrap";
import React from "react";
import '../styles/contactForm.css';

const ContactPage = () => {
    return (
        <div className="contact-form-container">
            <div className="contact-form-header">
                <h2>Skontaktuj sie z nami</h2>
            </div>
            <div className="contact-form">
            <Form>
                    <FormGroup row>
                        <Label style={{textAlign: "right"}} sm={2} for="contact-name">Imie</Label>
                        <Col sm={10}>
                            <Input type="text" name="contact-name" id="contact-name" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label style={{textAlign: "right"}} sm={2} for="contact-email">Email</Label>
                        <Col sm={10}>
                            <Input type="email" name="contact-email" id="contact-email" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label style={{textAlign: "right"}} sm={2} for="contact-message">Wiadomość</Label>
                        <Col sm={10}>
                            <Input type="textarea" name="contact-message" id="contact-message" />
                        </Col>
                    </FormGroup>
            </Form>
            </div>
        </div>
    )
}

export default ContactPage
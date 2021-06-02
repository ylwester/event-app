import { Container} from "reactstrap";
import React from "react";
import '../styles/contactForm.css';

const ContactPage = () => {
    return (
        <Container style={{width: "50vh"}}>
            <div style={{textAlign: "center"}}>
                <h3>Skontaktuj się</h3>
            </div>
            <div className="mb-3">
                <label htmlFor="contact-form-name" className="form-label">Imie</label>
                <input type="text" className="form-control" id="contact-form-name"
                       placeholder="Imie i nazwisko" />
            </div>
            <div className="mb-3">
                <label htmlFor="contact-form-email" className="form-label">Adres email</label>
                <input type="email" className="form-control" id="contact-form-email"
                       placeholder="nazwa@domena.pl" />
            </div>
            <div className="mb-3">
                <label htmlFor="contact-form-message" className="form-label">Wiadomość</label>
                <textarea className="form-control" id="contact-form-message" rows="3" />
            </div>
            <button type="submit" className="btn btn-secondary mb-3">
                Wyślij
            </button>
        </Container>
    )
}

export default ContactPage
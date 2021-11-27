import {Alert, Container} from "reactstrap";
import React, {useState} from "react";
import '../styles/contactForm.css';
import axios from "axios";

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState({
        message: null,
        color: '',
    });

    const onDismiss = () => setVisible(false);


    const contactForm = {
        name,
        email,
        message,
    }

    function clearForm() {
        setName('');
        setEmail('');
        setMessage('');
    }

    const handleFormError = (err) => {
        setAlert({message: err.response.data.error, color: 'warning'})
        setVisible(true);
    }


    const handleSubmit = () => {
        axios.post('/contact', contactForm)
            .then((res) => {
                setAlert({message: res.data, color: 'success'})
                setVisible(true);
                clearForm();
            })
            .catch(err => handleFormError(err));
    }

    return (
        <Container style={{width: "50vh"}}>
            <div style={{textAlign: "center"}}>
                <h3 style={{padding: "10px"}}>Skontaktuj się</h3>
            </div>
            <Alert color={alert.color} isOpen={visible} toggle={onDismiss}>
                {alert.message ? alert.message : null}
            </Alert>
            <div className="mb-3">
                <label htmlFor="contact-form-name" className="form-label">Imie</label>
                <input type="text" className="form-control" value={name} onChange={(e) => {
                    setName(e.target.value)
                }}id="contact-form-name"
                       placeholder="Imie i nazwisko" />
            </div>
            <div className="mb-3">
                <label htmlFor="contact-form-email" className="form-label">Adres email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => {
                    setEmail(e.target.value)
                }} id="contact-form-email"
                       placeholder="nazwa@domena.pl" />
            </div>
            <div className="mb-3">
                <label htmlFor="contact-form-message" className="form-label">Wiadomość</label>
                <textarea className="form-control" value={message} onChange={(e) => {
                    setMessage(e.target.value)
                }} id="contact-form-message" rows="7" />
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-secondary mb-3">
                Wyślij
            </button>
        </Container>
    )
}

export default ContactPage
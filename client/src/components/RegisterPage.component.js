import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import axios from "axios";
import {useState} from "react";

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            name,
            email,
            password
        }


        axios.post('http://localhost:5000/api/users/register/', user)
            .then(response => console.log(response))
            .catch(err => console.log(err));
    }


    return (
        <div style={{margin: "auto", width: "50vh"}}>
            <h1>Zarejestruj się</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup row>
                    <Label sm={3} for="userName">Username</Label>
                    <Col sm={8}>
                        <Input type="text" autocomplete="username" name="username" id="userName" placeholder="Podaj swój nick" onChange={(e) => setName(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3} for="email">Email</Label>
                    <Col sm={8}>
                        <Input type="email" autocomplete="email" name="email" id="email" placeholder="Podaj swój email" onChange={(e) => setEmail(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3} for="password">Hasło</Label>
                    <Col sm={8}>
                        <Input type="password" autocomplete="new-password" name="password" id="password" placeholder="Podaj hasło" onChange={(e) => setPassword(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3} for="email">Potwierdź hasło</Label>
                    <Col sm={8}>
                        <Input type="password" autocomplete="new-password" name="confirmPassword" id="confirmPassword" placeholder="Potwierdź hasło" />
                    </Col>
                </FormGroup>
                <Button>Zatwierdź</Button>
            </Form>
        </div>
    )
}

export default RegisterPage;
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

const RegisterPage = () => {



    return (
        <div style={{margin: "auto", width: "50vh"}}>
            <h1>Zarejestruj się</h1>
            <Form>
                <FormGroup row>
                    <Label sm={3} for="userName">Username</Label>
                    <Col sm={8}>
                        <Input type="text" name="username" id="userName" placeholder="Podaj swój nick" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3} for="email">Email</Label>
                    <Col sm={8}>
                        <Input type="email" name="email" id="email" placeholder="Podaj swój email" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3} for="password">Hasło</Label>
                    <Col sm={8}>
                        <Input type="password" name="password" id="password" placeholder="Podaj hasło" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3} for="email">Potwierdź hasło</Label>
                    <Col sm={8}>
                        <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Potwierdź hasło" />
                    </Col>
                </FormGroup>
                <Button>Zatwierdź</Button>
            </Form>
        </div>
    )
}

export default RegisterPage;
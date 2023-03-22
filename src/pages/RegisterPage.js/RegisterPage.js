import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo.png"
import BASE_URL from "../../constants/url";

export default function RegisterPage() {
    const [form, setForm] = useState({ email: "", name: "", cpf: "", password: "" });
    const navigate = useNavigate();

    function handleChange(event) {
        setForm({...form, [event.target.name] : event.target.value})
    }

    function register(event){
        event.preventDefault();
        axios.post(`${BASE_URL}/auth/sign-up`, form)
        .then(response => {
            console.log(response.data)
            navigate("/");
        })
        .catch(err => alert(err.response.data.message));
    }

    return (
        <PageConatainer>
            <img src={logo} alt="Driven +" />
            <RegisterForm onSubmit={register}>
                <input
                    placeholder="Nome"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
                <input
                    placeholder="CPF"
                    type="text"
                    name="cpf"
                    value={form.cpf}
                    onChange={handleChange}
                />
                <input
                    placeholder="E-mail"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    placeholder="Senha"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />
                <button>CADASTRAR</button>
                <Link to="/sign-up">
                    <p>Já possui uma conta? Entre</p>
                </Link>
            </RegisterForm>
        </PageConatainer>
    );
}

const PageConatainer = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 30px 10px;
    background-color: #0E0E13;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    *{
        font-family: 'Roboto', sans-serif;
    }
    img{
        margin:50px 0;
        width: 299px;
    }
`;

const RegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    input{
        height: 52px;
        width: 299px;
        border-radius: 8px;
        margin: 8px 0;
        padding: 14px;
        &::placeholder{
            font-weight: 400;
            font-size: 14px;
            color: #7E7E7E;
        }
    }
    button{
        width: 299px;
        height: 52px;
        background: #FF4791;
        border-radius: 8px;
        color: #FFFFFF;
        margin: 16px 0;
        font-size: 14px;
        font-weight: 700;
        line-height: 16px;
        letter-spacing: 0em;
    }
    a{
        text-decoration: none;
        color: #FFFFFF;
    }
`;
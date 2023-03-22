import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo.png"
import BASE_URL from "../../constants/url";
import UserContext from "../../contexts/UserContext";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
            const unserializedData = JSON.parse(storedData);
            setUser(unserializedData);
            navigate("/subscriptions");
        }
        // eslint-disable-next-line
    }, []);

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    function login(event) {
        event.preventDefault();
        axios.post(`${BASE_URL}/auth/login`, form)
            .then(response => {
                const data = response.data;
                const serializedData = JSON.stringify(data);
                localStorage.setItem("userData", serializedData);
                setUser(data);
                navigate("/subscriptions")
            })
            .catch(err => alert(err.response.data.message));
    }

    return (
        <PageConatainer>
            <img src={logo} alt="Driven +" />
            <LoginForm onSubmit={login}>
                <input
                    placeholder="E-mail"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    placeholder="Senha"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                />
                <button>ENTRAR</button>
                <Link to="/sign-up">
                    <p>Não possui uma conta? Cadastre-se</p>
                </Link>
            </LoginForm>
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
        margin:100px 0;
        width: 299px;
    }
`;

const LoginForm = styled.form`
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
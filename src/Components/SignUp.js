import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp(){

    const [name, setName] = useState ("");
    const [cpf, setCpf] = useState ("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState ("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

        function register(){

            setIsLoading(true);

            const body = {
                email,
                name,
                cpf,
                password:senha
            }

            const promise = axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up', body)
            promise.then(response => {
                navigate("/")
                setIsLoading(false);
            })
            promise.catch(error => {
                const erros = []
                if(error.response.data.details){
                    error.response.data.details.map(erro => erros.push(erro))
                }else{
                    erros.push(error.response.data.message)
                }
                const errorText = erros.join("\n")
                alert(errorText)
                setIsLoading(false);
            })   
        }

        function disable(action){
            if(isLoading){
                return () => "";
    
            }else{
                return action;        
            }
        } 

    return(
        <Content>
            <Input placeholder="Nome" type="text" value={name} onChange={disable ((e) => setName(e.target.value))}></Input>
            <Input placeholder="CPF" onChange={disable ((e) => setCpf(e.target.value))}></Input>
            <Input placeholder="E-mail" type="email" value={email} onChange={disable((e) => setEmail(e.target.value))}></Input>
            <Input placeholder="Senha" type="password" value={senha} onChange={disable((e) => setSenha(e.target.value))}></Input>
            <Button onClick={disable(register)}>CADASTRAR</Button>
            <Link style={{color: "#FFFFFF" , fontSize: "14px"}} to="/">Já possui uma conta? Entre!</Link>
        </Content>
    )
}


const Content = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 36px;
`

const Input = styled.input`

    width: 300px;
    height: 52px;
    background: #FFFFFF;
    border-radius: 8px;
    border: none;
    margin-bottom: 16px;
    padding-left: 14px;   
`

const Button = styled.button`

    width: 300px;
    height: 52px;
    background: #FF4791;
    border-radius: 8px;
    border: none;
    margin-top: 8px;
    margin-bottom: 24px;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 700;
`

import Logo1 from "../Assets/imagens/Logo1.png";
import styled from "styled-components";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ContextToken from "../Context/ContextToken";


export default function Login(){

    const {setToken, setName, setPlan} = useContext(ContextToken);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function enter(){

        setIsLoading(true);
        
        
        const body = {
            email,
            password:senha
        };

        const promise = axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/login', body)

        promise.then(response => {
            console.log(response)
            setIsLoading(false);
            setToken(response.data.token)
            setName(response.data.name)
            if(response.data.membership){
                setPlan(response.data.membership)
                navigate("/home") 

            }else{
                navigate("/subscriptions")            
            }
        })

        promise.catch(error => {
            const erros = []
            if (error.response.data.datails){
                error.response.data.details.map(erro => erros.push(erro))
            }else{
                erros.push(error.response.data.message)
            }
            const errorText = erros.join("\n")
            alert("Email ou senha inválido")
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
            <img src={Logo1}/>
            <Input isLoading={isLoading} type="email" value={email} placeholder="E-mail" onChange={disable((e) => setEmail(e.target.value))} />
            <Input isLoading={isLoading} type="password" placeholder="Senha" value={senha} onChange={disable((e) => setSenha(e.target.value))} />
            <Button onClick={disable(enter)}>ENTRAR</Button>
            <Link style={{color: "#FFFFFF" , fontSize: "14px"}} to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
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

    img{
        width: 300px;
        height: 50px;
        margin-bottom: 100px;
    }

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


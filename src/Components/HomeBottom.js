import ContextToken from './../Context/ContextToken';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';


export default function HomeBottom(){

    const {token} = useContext(ContextToken);
    const navigate = useNavigate();


    function cancelPlan(){       

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.delete('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions', config)
        promise.then(response => navigate("/subscriptions"))

    }

    function changePlan(){
        navigate("/subscriptions")
    }

    return (
        <Buttons>
            <ButtonMudar onClick={changePlan}>Mudar Plano</ButtonMudar>
            <ButtonCancelar onClick={cancelPlan}>Cancelar Plano</ButtonCancelar>
        
        </Buttons>
    )
}

const Buttons = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
position: fixed;
top: 540px;
`

const ButtonMudar = styled.button`
width: 300px;
height: 52px;
border: none;
background-color: red;
color: white;
border-radius: 8px;
margin-bottom: 8px;
font-weight: 700;
background: #FF4791;
font-size: 14px;

`

const ButtonCancelar = styled.button`
width: 300px;
height: 52px;
border: none;
background-color: red;
color: white;
border-radius: 8px;
margin-bottom: 8px;
font-weight: 700;
background: #FF4747;
font-size: 14px;

`
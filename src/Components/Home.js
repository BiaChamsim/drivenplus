import { useContext } from "react";
import ContextToken from './../Context/ContextToken';
import HomeBottom from "./HomeBottom"
import Group1 from "../Assets/imagens/Group1.png";
import styled from "styled-components";

export default function Home(){

    const {name, plan} = useContext(ContextToken);
    


    return (
        <>
            <Logo src={plan.image} />
            <Content>
                <Greeting>Olá, {name}</Greeting>
                {plan.perks.map(perk => <Perk onClick={() => window.open(perk.link)}>{perk.title}</Perk> )}

                <HomeBottom />        
            </Content>
        </>
    )
}

const Logo = styled.img`
width: 74px;
height: 50px;
margin: 30px;

`

const Planos = styled.div`
width: 200px;
height: 100px;
background-color: white;
`

const Content = styled.div`
display: flex;
flex-direction: column;
align-items: center;

`

const Greeting = styled.div`
margin-bottom: 50px;
color: #FFFFFF;
`

const Perk = styled.button`
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

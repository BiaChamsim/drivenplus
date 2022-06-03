import { useParams } from "react-router";
import styled from "styled-components";
import { useState, useEffect, useContext } from 'react';
import ContextToken from './../Context/ContextToken';
import axios from 'axios';
import { useNavigate } from "react-router";
import Vector from "../Assets/imagens/Vector.png";


export default function SubscriptionForm(){

    const {subscriptionId} = useParams(); 
    const {token, setPlan} = useContext(ContextToken);
    
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [perks, setPerks] = useState([]);
    const [price, setPrice] = useState("")
    const [showName, setShowName] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [membershipId, setMembershipId] = useState(subscriptionId);
    const [securityNumber, setSecurityNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cardName, setCardName] = useState("");

    const navigate = useNavigate();

    


    useEffect(() => {

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${subscriptionId}`, config)
        promise.then(response => {
                console.log(response.data)
                setImage(response.data.image)
                setName(response.data.name)
                setPerks(response.data.perks)
                setPrice(response.data.price)


        })

    }, [])

    function sendData(){
        
        const data = {
            membershipId,
            cardName,
            cardNumber,
            securityNumber,
            expirationDate
        }

        console.log(data)
        
        const headers = {
                "Authorization": `Bearer ${token}`
            }
           


        const promise = axios({
            method:"post",
            url:'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions', 
            data: {...data}, 
            headers: {...headers}
        })
        promise.then(response => {
            setPlan(response.data.membership)
            navigate("/home")
        })
        promise.catch(error => alert("Verifique os dados do cartão"))

    }

    function backHome(){
        navigate("/subscriptions")
    }



    return(
        <>
            
            <Content>
                <Back src={Vector} onClick={backHome}></Back>
                <Head>
                    <img src={image}></img>
                    <h1>{name}</h1>
                </Head>
                <BenefitTitle>Benefícios:</BenefitTitle>
                {perks.map((perk, index) => <Paragraph>{index+1}. {perk.title}</Paragraph>)}
                <PriceTitle>Preço:</PriceTitle>
                <Price>R$ {price} cobrados mensalmente</Price>
                <Inputs>
                    <Input placeholder="Nome impresso no cartão" required value={cardName} onChange={(event) => setCardName(event.target.value)} />
                    <Input placeholder="Dígitos do cartão" required value={cardNumber} onChange={(event) => setCardNumber(event.target.value)}/>
                    <CodigoeValidade>
                        <Input placeholder="Código de segurança" required value={securityNumber} onChange={(event) => setSecurityNumber(event.target.value)}/>
                        <Input placeholder="Validade" required value={expirationDate} onChange={(event) => setExpirationDate(event.target.value)} />
                    </CodigoeValidade>
                    <Button onClick={() => setShowName(!showName)}>ASSINAR</Button>
                    
                        {showName ? 
                        <>
                            <Background />
                            <Modal>
                                <ModalContainer>
                                    <h1>Tem certeza que deseja assinar o plano {name} (R${price})?</h1>
                                    <Buttons>
                                        <ButtonNao onClick={() => setShowName(!showName)}>NAO</ButtonNao>
                                        <ButtonSim onClick={sendData}>SIM</ButtonSim>
                                    </Buttons>
                                </ModalContainer>
                            </Modal>                  
                        
                        </>
                        
                        :
                        ""                
                    }    
                </Inputs>
            </Content>
        
        </>
    )
}

const Back = styled.img`
width: 28px;
height: 28px;
margin-left: 22px;

`

const BenefitTitle = styled.div`
color: #FFFFFF;
margin-bottom: 10px;
margin-left: 40px;
`

const PriceTitle = styled.div`
color: #FFFFFF;
margin-top: 12px;
margin-bottom: 10px;
margin-left: 40px;
`

const Head = styled.div`
display: flex;
flex-direction: column;
align-items: center;

img{
    width: 140px;
    height: 96px;
}

h1{
    color: #FFFFFF;
    font-size: 32px;
}

`

const Price = styled.div`
color: #FFFFFF;
margin-bottom: 20px;
margin-left: 40px;

`

const Content = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Inputs = styled.div`
width: 300px;
margin-left: 30px;
`

const Input = styled.input`
display: flex;
width: 100%;
height: 52px;
margin-bottom: 8px;
border-radius: 8px;
border: none;
padding-left: 14px;
`

const Paragraph = styled.div`
color: #FFFFFF;
margin-left: 40px;
`

const CodigoeValidade = styled.div`
display: flex;
`

const Button = styled.button`
width: 100%;
height: 52px;
border-radius: 8px;
background-color: #FF4791;
font-size: 14px;
font-weight: 700;
color: #FFFFFF;
border: none;
margin-top: 4px;
`

const Background = styled.div`
width: 100vw;
height: 100vh;
background-color: black;
position: fixed;
top: 0;
left: 0;
opacity: 0.5;

`

const Modal = styled.div`
position: fixed;
width: 100vw;
height: 100vh;
top: 0;
left:0;
display: flex;
justify-content: center;
align-items: center;

`

const ModalContainer = styled.div`
width: 248px;
height: 210px;
background-color: #FFFFFF;
border-radius: 12px;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;

h1{

width: 204px;
height: 68px;
font-size: 18px;
font-weight: 700;
text-align: center;

}
`

const Buttons = styled.div`

`

const ButtonNao = styled.button`
width: 96px;
height: 52px;
margin-right: 14px;
border-radius: 8px;
background: #CECECE;
border: none;
font-weight: 700;
color: #FFFFFF;
`

const ButtonSim = styled.button`
width: 96px;
height: 52px;
border-radius: 8px;
background: #FF4791;
border:none;
font-weight: 700;
color: #FFFFFF;
`
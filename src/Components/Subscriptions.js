import styled from "styled-components";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import ContextToken from './../Context/ContextToken';
import { useNavigate } from "react-router-dom";


export default function Subscriptions(){
    
    const {token} = useContext(ContextToken);
    const [plans, setPlans] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.get('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships', config)
        promise.then(response => {
            setPlans(response.data)

        })


    }, []);

    return(
        <Content>
            <h1 style={{color:"#FFFFFF"}}>Escolha seu Plano</h1>
            <div>
                {plans.map(plan =>  {
                    return(
                        <Link onClick={ () => navigate(`/subscriptions/${plan.id}`)}>
                            <img src={plan.image}></img>
                            <p>{plan.price}</p>
                        </Link>
                    )} 
                )}            
            </div>        
        </Content>
    )
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`


const Link = styled.div`
    width: 290px;
    height: 180px;    
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    border-radius: 12px;
    border: 3px solid #7E7E7E;

    img{
        width: 92px;
        height: 94px;
        padding-left: 16px;
    }

    p{
       font-size: 24px;
       padding-right: 16px;
       font-weight: 700;
       color:#FFFFFF;
    }

`
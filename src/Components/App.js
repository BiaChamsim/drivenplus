import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Components/Login.js';
import SignUp from '../Components/SignUp.js';
import Subscriptions from './Subscriptions.js';
import SubscriptionForm from './SubscriptionForm.js';
import Home from './Home.js';
import { React, useState } from 'react';
import GlobalStyle from '../theme/GlobalStyle.js';
import ContextToken from './../Context/ContextToken';


export default function App(){

    const [token, setToken] = useState("");
    const [plan, setPlan] = useState({id:"", name:"", image:"", price:"", perks:[]});
    const [name, setName] = useState("");


    return(
        <>
            <GlobalStyle />
            <BrowserRouter>
                <ContextToken.Provider value={{token, setToken, plan, setPlan, name, setName}}>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/cadastro" element={<SignUp />} />
                        <Route path="/subscriptions" element={<Subscriptions />} />
                        <Route path="/home" element={<Home />}/> 
                        <Route path="/subscriptions/:subscriptionId" element={<SubscriptionForm />}/>
                    </Routes>
                </ContextToken.Provider>
            </BrowserRouter>
        
        
        
        </>

    )
}
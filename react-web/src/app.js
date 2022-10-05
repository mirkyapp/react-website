import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';

// Pages
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import PropertiesPage from './pages/PropertiesPage';
import AddPropertyPage from './pages/CreatePropertyPage';
import AccountPage from './pages/AccountPage';

export default function App() {
    const cookies = new Cookies();
    const { toggleColorMode } = useColorMode();
    const text = useColorModeValue('dark', 'light');
    
    React.useEffect(() => {
        if (text === 'dark') {
            toggleColorMode()
        }
        const session = cookies.get('mirky-session');
        const anonSession = cookies.get('mirky-anon-session');
        if (anonSession === undefined && session === undefined) {
            // make a post request to the api to create a new session
            // and set the cookie
            axios.post('https://api.mirky.app/v1/auth/anon-session', {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => {
                cookies.set('mirky-anon-session', res.data.sessionData, { path: '/' });
            }
        )}
    });

    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/properties" element={<PropertiesPage />} />
                <Route path="/add-property" element={<AddPropertyPage />} />
                <Route path="/account" element={<AccountPage />} />

            </Routes>
        </BrowserRouter>
    );
};

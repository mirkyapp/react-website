import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from 'axios';

// Pages
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import PropertiesPage from './pages/PropertiesPage';
import AddPropertyPage from './pages/CreatePropertyPage';

export default function App() {
    const cookies = new Cookies();
    
    React.useEffect(() => {
        const sessionId = cookies.get('mirky-session-id')
        if (sessionId === undefined) {
            // make a post request to the api to create a new session
            // and set the cookie
            const req = axios.post('https://api.mirky.app/v1/auth/anonSession', {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => {
                cookies.set('mirky-anon-session-id', res.data.sessionId, { path: '/' })
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

            </Routes>
        </BrowserRouter>
    );
};

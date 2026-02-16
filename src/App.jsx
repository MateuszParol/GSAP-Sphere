import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Offer from './pages/Offer';
import CaseStudies from './pages/CaseStudies';
import Contact from './pages/Contact';
import { TransitionProvider } from './utils/TransitionContext';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <TransitionProvider>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="offer" element={<Offer />} />
                        <Route path="projects" element={<CaseStudies />} />
                        <Route path="contact" element={<Contact />} />
                    </Route>
                </Routes>
            </TransitionProvider>
        </BrowserRouter>
    );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Offer from './pages/Offer';
import CaseStudies from './pages/CaseStudies';
import Contact from './pages/Contact'; // Assuming Contact page exists or is modal only
import { TransitionProvider } from './utils/TransitionContext';
import SEO from './components/Utils/SEO';
import ReloadPrompt from './components/Utils/ReloadPrompt';
import useAntiTheft from './hooks/useAntiTheft';
import './App.css';

function App() {
    useAntiTheft();
    return (
        <HelmetProvider>
            <BrowserRouter>
                <TransitionProvider>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={
                                <>
                                    <SEO
                                        title="Home"
                                        description="CosmoTibia - Immersive 3D Portfolio featuring React Three Fiber and GSAP animations."
                                    />
                                    <Home />
                                </>
                            } />
                            <Route path="about" element={
                                <>
                                    <SEO
                                        title="O Mnie"
                                        description="Kreatywny programista specjalizujący się w 3D Web Experiences. Poznaj moje umiejętności i doświadczenie."
                                    />
                                    <About />
                                </>
                            } />
                            <Route path="offer" element={
                                <>
                                    <SEO
                                        title="Oferta"
                                        description="Tworzenie stron www, aplikacji 3D i optymalizacja SEO. Sprawdź moje usługi."
                                    />
                                    <Offer />
                                </>
                            } />
                            <Route path="projects" element={
                                <>
                                    <SEO
                                        title="Projekty"
                                        description="Portfolio realizacji - Aplikacje webowe, sklepy e-commerce i doświadczenia 3D."
                                    />
                                    <CaseStudies />
                                </>
                            } />
                            <Route path="contact" element={
                                <>
                                    <SEO
                                        title="Kontakt"
                                        description="Skontaktuj się ze mną w sprawie współpracy. Formularz kontaktowy."
                                    />
                                    {/* Contact is technically a modal on Home usually, but if routed: */}
                                    <Contact />
                                </>
                            } />
                        </Route>
                    </Routes>
                </TransitionProvider>
            </BrowserRouter>
            <ReloadPrompt />
        </HelmetProvider>
    );
}

export default App;

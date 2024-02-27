import React, { useState } from 'react';
import Navbar from '../components/navbar';
import AuthModal from '../components/authModal';

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);

    const authToken = false;

    const handleClick = () => {
        console.log('clicked');
        setShowModal(true);
        setIsSignUp(true);
    };

    return (
        <div className="overlay">
        <Navbar
            minimal={false}
            authToken={authToken}
            setShowModal={setShowModal}
            showModal={showModal}
            setIsSignUp={setIsSignUp}
        />
        <div className="home">
            
            <h2 className="primary-titele">Make Connections.....</h2>
            <button className="primary-button" onClick={handleClick}>
            {authToken ? 'SignOut' : 'Create Account'}
            </button>
            {showModal && (
            <AuthModal
                setShowModal={setShowModal}
                setIsSignUp={setIsSignUp}
                isSignUp={isSignUp}
            />
            )}
        </div>
        </div>
    );
};

export default Home;
import logo from '../assets/julez-black.png';
import colorlogo from '../assets/julez-color.png';


const Navbar = ({minimal, authToken,  setShowModal, showModal, setIsSignUp}) =>{

    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false);
    }


    return (
        <nav className='navbar'>
            <div className="logo-container">
                <img src={minimal ? colorlogo : logo} alt="tinderLogo" className="logo" />
            </div>
            { !authToken && !minimal && <button className="nav-btn"
            onClick={handleClick}
            disabled={showModal}
            >LOG IN</button>}
        </nav>
    )
}

export default Navbar;
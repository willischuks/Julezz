import { useState } from "react";


const AuthModal = ({ setShowModal , isSignUp}) => {
    const handleClick = () => {
        setShowModal(false);
    };



    const handleSubmit = (e) => {
        e.preventDefault()
        try{
            if (isSignUp && (password !== confirmPassword)) {
                setError('passwords do not match')
        };
        console.log('make a post request to our database')
    } catch (e) {console.log(e)}
}



    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [firstname, setFirstname] = useState(null)
    const [lastname, setLastname] = useState(null)

    console.log(email, password, confirmPassword)


    // const isSignUp = false
    return (
        <form class="form" onSubmit={handleSubmit}>
            <div className="close-icon" onClick={handleClick}>&times;
            <span className="close-icon__line close-icon__line-1"></span>
            <span className="close-icon__line close-icon__line-2"></span>
            </div>
            <p className="title">{isSignUp ? 'REGISTER' : 'SIGN IN'}</p>
            {isSignUp && <p class="message">Signup now and get full access to our app. </p>}
            <div class="flex">
                <label>
                    {isSignUp &&<input className="input" type="text" placeholder="First Name" required={true} id="firstname" name="firstname" onChange={(e)=>setFirstname(e.target.value)}/>}
                    
                </label>
                <label>
                {isSignUp &&<input className="input" type="text"placeholder="Last Name" required={true} id="lastname" name="lastname" onChange={(e)=>setLastname(e.target.value)}/>}
                    
                </label>
            </div>  
                <label>
                    <input className="input" type="email" placeholder="Email Address" required={true} id="email" name="email" onChange={(e)=>setEmail(e.target.value)}/>
                    
                </label> 
                    
                <label>
                    <input  className="input" type="password" placeholder="Password" required={true} id="password" name="password" onChange={(e)=>setPassword(e.target.value)}/>
                </label>
                <label>
                    <input className="input" type="password" placeholder="Confirm Password" required={true} id="password-check" name="password-check" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    
                </label>
                <button class="submit">Submit</button>
                {isSignUp&& <p class="signin">Already have an acount ? <a href="/">Signin</a> </p>}
                <p>{error}</p>
        </form>
    );
};

export default AuthModal;

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import '../style/SignIn.css';


const SignIn = () => {
  const router = useRouter();
  const { token } = router.query;
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleVerificationSubmit = async () => {
    if (!identifier) {
      setError('Please enter your email or mobile number');
      return;
    }

    if (identifier.length < 10 && !/^[\w.-]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
      setError('Invalid email or mobile number format');
      return;
    }

    try {
      // Perform verification logic here (e.g., calling an API to check email or mobile number)
      // Simulating verification with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // If verification passes, show the password field and clear the error
      setShowPassword(true);
      setError('');
    } catch (error) {
      setError('Verification failed. Please try again.'); // Set an appropriate error message
    }
  };

  const handleSignInFormSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setError('Please enter your password');
      return;
    }

    try {
      
      const headers = {
        'Content-Type': 'application/json',
        Authorization:  `Bearer ${token}`,
      };
  
   
      const response = await axios.post(
        'http://10.1.1.31:3000/usersignin',
        {
          identifier,
          password,
        },
        {
          headers: headers,
        }
      );
  
      console.log(response.data);
  
      if (response.status === 200) {
        router.push('/component/navbar');
      } else if (response.status === 401) {
        setError('Incorrect password');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleIdentifierChange = (e) => {
    setIdentifier(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSignInFormSubmit}>
        <div className="form-content">
          <div className="para-container">
            <h2 className="title">Sign In</h2>
          </div>
          <div className="input-container">
            {!showPassword ? (
              <>
                <label htmlFor="identifier" className="label">
                  Email or Mobile Number
                </label>
                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  className="input"
                  value={identifier}
                  onChange={handleIdentifierChange}
                />
              </>
            ) : (
              <>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="input"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </>
            )}
          </div>
          {error && <p className="error">{error}</p>}
          {!showPassword ? (
            <button type="button" className="button" onClick={handleVerificationSubmit}>
              Continue
            </button>
          ) : (
            <button type="submit" className="button">
              Sign In
            </button>
          )}
        </div>
        <div className="form-content1">
          <div className="para-content1">
            <p className="content">
              By continuing, you agree to Amazon's <br />{' '}
              <a href="https://www.amazon.com/conditions-of-use">Conditions of Use </a>and{' '}
              <a href="https://www.amazon.com/privacy">Privacy Notice.</a>
            </p>
          </div>
        </div>
      </form>
      <hr className='hr1'/><p className='para'>New User?</p><hr className='hr2'/>
      <button onClick={() => router.push('/createaccount')} className="button1">
        Create Account
      </button>
      <div className='bottom'>
         
      </div>
    </div>
  );
};

export default SignIn;

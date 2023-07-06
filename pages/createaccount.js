import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import '../style/createaccount.css';

const CreateAccount = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleCreateAccountFormSubmit = async (values) => {
    try {
      if (values.email.trim() === '') {
        delete values.email; 
      }

      const response = await axios.post('http://10.1.1.31:3000/usersignup', values);
      router.push({
        pathname: '/otp',
        query: { phno: values.phno },
      });

    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('Phone number already exists');
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className={`create-container ${error ? 'error-container' : ''}`}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phno: '',
          password: '',
        }}
        validate={(values) => {
          const errors = {};

          if (!values.name.trim()) {
            errors.name = 'Name is required';
          }

          if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = 'Invalid email format';
          }

          if (!values.phno.trim()) {
            errors.phno = 'Phone number is required';
          } else if (values.phno.trim().length !== 10) {
            errors.phno = 'Phone number should be 10 digits';
          }

          if (!values.password.trim()) {
            errors.password = 'Password is required';
          } else if (values.password.trim().length < 6) {
            errors.password = 'Password should be at least 6 characters long';
          }

          return errors;
        }}
        onSubmit={handleCreateAccountFormSubmit}
      >
        <Form className="create-form">
          <div className='dummy'>
          <h2 className="create-title">Create Account</h2>
          <div className="create-input1">
            <label className="create-label">Your Name</label>
            <Field type="text" name="name" placeholder="Name" className="create-input-field" />
            <ErrorMessage name="name" component="p" className="err1" />
          </div>
          <div className="create-input2">
            <label className="create-label">Email(Optional)</label>
            <Field type="email" name="email" placeholder="Email (Optional)" className="create-input-field" />
            <ErrorMessage name="email" component="p" className="err2" />
          </div>
          <div className="create-input3">
            <label className="create-label">Mobile Number</label>
            <Field type="text" name="phno" placeholder="Mobile Number" className="create-input-field" />
            <ErrorMessage name="phno" component="p" className="err3" />
          </div>
          <div className="create-input4">
            <label className="create-label">Password</label>
            <Field type="password" name="password" placeholder="Password" className="create-input-field" />
            <ErrorMessage name="password" component="p" className="err4" />
          </div>
          {error && <p className="exist">{error}</p>}
          <div className="create-form-content">
            <div className='createpara-container'>
              <p className='createpara-content'>
                By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Amazon. Message and data rates may apply.
              </p>
            </div>
            <button type="submit" className="butn">
              Create Account
            </button>
            <div className='create-box1'>
              <p className='createpara'>Already have an account?<a href='./signin'>Sign in</a> </p>
              <p className='createpara1'> Buying for work? <a href='#'>Create a free business account</a></p>
            </div>
            <div className="create-box2">
              <p className="createpara2">
                By continuing, you agree to Amazon's <br />{' '}
                <a href="https://www.amazon.com/conditions-of-use">Conditions of Use </a>and{' '}
                <a href="https://www.amazon.com/privacy">Privacy Notice.</a>
              </p>
            </div>
          </div>
          </div>
        </Form>
      </Formik>
      <div className='create-bottom'>

      </div>
    </div>
  );
};

export default CreateAccount;

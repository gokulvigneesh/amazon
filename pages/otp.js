import { Formik, Field, ErrorMessage, Form } from 'formik';
import { useRouter } from 'next/router';
import axios from 'axios';
import '../style/otp.css';
import * as Yup from 'yup';

const OTPPage = () => {
  const router = useRouter();
  const { phno } = router.query;

  const initialValues = {
    otp: '',
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.string().required('OTP is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      
      const response = await axios.post(`http://10.1.1.31:3000/verify-otp/${phno}`, { otp: values.otp });

   
      console.log(response.data);

   
      if (response.status === 200) {
        const token = response.data.token;
         localStorage.setItem("token", token);
         router.push({
          pathname: '/signin',
          query: { token: token },
        });
      } else {
        setFieldError('otp', 'Invalid OTP');
      }
    } catch (error) {
      console.error(error);
      setFieldError('otp', 'Invalid OTP');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container2">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="form3">
          <h2 className="head">Verify mobile number</h2>
          <p>
            In: {phno} <a href='./createaccount'>Change</a>
          </p>
          <div otp-box>
            <p className='otp-para'>
            We’ve sent a One Time Password (OTP) to the mobile number above. Please enter it to complete verification
            </p>
          </div>
          <label>Enter OTP</label>
          <Field type="text" name="otp" placeholder="OTP" className="input3" required />
          <ErrorMessage name="otp" component="p" className="error3" />

          <button type="submit" className="button3">
            Verify
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default OTPPage;

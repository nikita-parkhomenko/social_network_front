import React from 'react';
import * as Yup from 'yup';
import {gql, useMutation} from '@apollo/client';
import {useHistory, Link} from 'react-router-dom';
import {Formik, Field, Form, ErrorMessage} from 'formik';

import {LOG_IN} from '../constants/routes';
import TwitterLogo from '../assets/twitter-logo.png';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $password: String!, $name: String) {
        signup(email: $email, password: $password, name: $name) {
            token,
        }
    }
`
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email address').required('Email required'),
    name: Yup.string().max(15, 'Name must be 15 characters or less').required('Name required'),
    password: Yup.string().max(20, 'Must be 20 characters or less').required('Password required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), 'Password must match']),
});

interface SignUpValues {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}

const Signup = () => {
    const history = useHistory();
    const [signup, {data}] = useMutation(SIGNUP_MUTATION);
    const initialValues: SignUpValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    return (
        <div className='container'>
            <img
                className='logo'
                src={TwitterLogo}
                alt='company logo'
                style={{ width: '50px' }}
            />
            <h3>Please Sign up</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, {setSubmitting}) => {
                setSubmitting(true);
                console.log('values ', values);
                const response = await signup({
                    variables: values
                });
                localStorage.setItem('token', response.data.signup.token);
                setSubmitting(false);
                history.push('/users');
            }}>
                <Form>
                    <Field type='text' name='name' placeholder='Name' />
                    <ErrorMessage name='name' component='div' />

                    <Field type='text' name='email' placeholder='Email' />
                    <ErrorMessage name='email' component='div' />

                    <Field type='password' name='password' placeholder='Password' />
                    <ErrorMessage name='password' component='div' />

                    <Field type='password' name='confirmPassword' placeholder='Confirm Password' />
                    <ErrorMessage name='confirmPassword' component='div' />

                    <button type='submit' className='login-button'><span>Sign up</span></button>
                </Form>
            </Formik>
            <div className="register">
                <h4>Already have an account?</h4>
                <Link to={LOG_IN.link()}>Log in</Link>
            </div>
        </div>
    );
};

export default Signup;

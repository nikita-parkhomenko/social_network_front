import React from 'react';
import * as Yup from 'yup';
import {gql, useMutation} from '@apollo/client';
import {useHistory, Link} from 'react-router-dom';
import {Formik, Field, Form, ErrorMessage} from 'formik';

import {SIGN_UP} from '../constants/routes';
import TwitterLogo from '../assets/twitter-logo.png';

const LOGIN_MUTATION = gql`
    mutation LOGIN_MUTATION($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token,
        }
    }
`
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email address').required('Email required'),
    password: Yup.string().max(20, 'Must be 20 characters or less').required('Password required'),
});

interface LogInValues {
    email: string,
    password: string,
}

const LogIn = () => {
    const history = useHistory();
    const [login, {data}] = useMutation(LOGIN_MUTATION);
    const initialValues: LogInValues = {
        email: '',
        password: '',
    }
    return (
        <div className='container'>
            <img
                className='logo'
                alt='company logo'
                src={TwitterLogo}
                style={{ width: '50px' }}
            />
            <h3>Please Log in</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, {setSubmitting}) => {
                    setSubmitting(true);
                    console.log('values ', values);
                    const response = await login({
                        variables: values
                    });
                    console.log('response ', response)
                    localStorage.setItem('token', response.data.login.token);
                    setSubmitting(false);
                    history.push('/users');
                }}>
                <Form>
                    <Field type='text' name='email' placeholder='Email' />
                    <ErrorMessage name='email' component='div' />

                    <Field type='password' name='password' placeholder='Password' />
                    <ErrorMessage name='password' component='div' />

                    <button type='submit' className='login-button'><span>Log in</span></button>
                </Form>
            </Formik>
            <div className="register">
                <h4>Don't have an account?</h4>
                <Link to={SIGN_UP.link()}>Sign up</Link>
            </div>
        </div>
    );
};

export default LogIn;

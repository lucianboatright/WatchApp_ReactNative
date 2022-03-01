import React, { useState, useHistory, View, StyleSheet } from 'react';
import { auth } from '../config/firebase';
import IPageProps from '../../Interfaces/page'



const RegisterPage: React.FunctionComponent<IPageProps> = props => {
    const [registering, setRegistering] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirm, setConfirm] = useState<string>('')
    const [error, setError] = useState<string>('')

    const history = useHistory();

    const signUpWithEmailAndPassword = () => {
        if (password !== confirm) setError('Please make sure the passwords match');
        if (error !== '') setError('');

        setRegistering(true)

        auth.createUserWithEmailAndPassword(email, password)
        .then(result => {
            logging.info(result);
            history.push('./login');
        })
        .catch(error => {
            logging.error(error);

            if (error.code.includes('auth/weak-password'))
            {
                setError('Please enter a stronger password');
            }
            else if (error.code.includes('auth/email-already-in-use'))
            {
                setError('Email alreay in use');
            }
            else
            {
                setError('Unable to register. Please Try again later')
            }
            setRegistering(false);
        })
    }

    return (
        <View>
            <p>Register Page.</p>
        </View>

    )
}

export default RegisterPage;
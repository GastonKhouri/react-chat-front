import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import AuthContext from '../auth/AuthContext';

const RegisterPage = () => {

    const [ form, setForm ] = useState( {
        name: 'Gaston',
        email: 'test1@test.com',
        password: '123456',
    } );

    const { register } = useContext( AuthContext );

    const onChange = ( { target }: React.ChangeEvent<HTMLInputElement> ) => {

        const { name, value } = target;

        setForm( {
            ...form,
            [ name ]: value
        } );

    };

    const onSubmit = async ( e: React.FormEvent ) => {

        e.preventDefault();

        const { email, password, name } = form;

        const msg = await register( name, email, password );

        if ( msg !== true ) {
            Swal.fire( 'Error', msg, 'error' );
        }

    };

    const todoOk = () => {
        return ( form.email.length > 0 && form.password.length > 0 && form.name.length > 0 );
    };

    return (
        <form
            className='login100-form validate-form flex-sb flex-w'
            onSubmit={ onSubmit }
        >
            <span className='login100-form-title mb-3'>
                Chat - Registro
            </span>

            <div className='wrap-input100 validate-input mb-3'>
                <input
                    className='input100'
                    type='text'
                    name='name'
                    onChange={ onChange }
                    value={ form.name }
                    placeholder='Nombre'
                />
                <span className='focus-input100'></span>
            </div>


            <div className='wrap-input100 validate-input mb-3'>
                <input
                    className='input100'
                    type='email'
                    name='email'
                    onChange={ onChange }
                    value={ form.email }
                    placeholder='Email'
                />
                <span className='focus-input100'></span>
            </div>


            <div className='wrap-input100 validate-input mb-3'>
                <input
                    className='input100'
                    type='password'
                    name='password'
                    onChange={ onChange }
                    value={ form.password }
                    placeholder='Password'
                />
                <span className='focus-input100'></span>
            </div>

            <div className='row mb-3'>
                <div className='col text-right'>
                    <Link to='/auth/login' className='txt1'>
                        ¿Ya tienes cuenta?
                    </Link>
                </div>
            </div>

            <div className='container-login100-form-btn m-t-17'>
                <button
                    className='login100-form-btn'
                    type='submit'
                    disabled={ !todoOk() }
                >
                    Crear cuenta
                </button>
            </div>

        </form>
    );
};

export default RegisterPage;

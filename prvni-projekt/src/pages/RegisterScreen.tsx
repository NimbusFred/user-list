import { useState, useContext } from 'react';
import { Form, Formik } from 'formik';
import { Navigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { httpPost } from '../utils/http-client';
import { useAuth } from '../context/AuthProvider';
import FormLayout from '../components/layout/FormLayout';
import UnauthLayout from '../components/layout/UnauthLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModeContext } from '../context/ThemeProvider';

interface values {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

/**
 * Komponenta představující stránku registrace nového uživatele
 * [není povinný být přihlašený uživatel]
 */
export default function RegisterScreen() {
    const { login, isAuthenticated } = useAuth();
    const [register, setRegistered] = useState(false);
    const { theme } = useContext(ModeContext);

    // definice validačního schématu pro přihlašovací formulář
    const LoginSchema = Yup.object().shape({
        firstName: Yup.string().required('first name is required.'),
        lastName: Yup.string().required('last name is required.'),
        username: Yup.string().required('Username is required.'),
        password: Yup.string().required('Password is required.').min(8, 'Password must be at least 8 characters.'),
        confirmPassword: Yup.string()
            .required('Please confirm your password.')
            .oneOf([Yup.ref('password')], 'Passwords must match.'),
    });

    // funkce pro odeslání přihlašovacích údajů pro přihlášení uživatele v aplikaci
    const handleSubmit = async (values: values) => {
        const { firstName, lastName, username, password } = values;

        try {
            const res = await httpPost('auth/signup', { firstName, lastName, username, password }); // odeslání dat na server pro registraci uživatele
            if (res.status === 200) { // kontrola, zda byl uživatel úspěšně registrován
                toast.success('User registered successfully.', { // zobrazení hlášky o úspěšné registraci
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000, // milliseconds
                });
                setTimeout(() => {
                    setRegistered(true); // po 2 sekundách se nastaví proměnná na true pro přesměrování uživatele na jinou stránku
                }, 2000);
            }

            throw new Error('User registration failed.'); // v případě chyby se vyhodí chybová hláška

        } catch (error) {
            if (error instanceof Yup.ValidationError) { // kontrola, zda se jedná o validační chybu
                const validationErrors = {}; // inicializace objektu pro ukládání validačních chyb

                return validationErrors; // vrácení objektu s validačními chybami
            }
        }
    };

    // přesměrování uživatele pokud je přihlášený
    if (isAuthenticated) {
        return <Navigate to={'/'} />;
    }
    // Pokud uživatel vytvoří registraci, přesměruj ho na stránku přihlášení
    if (register) {
        return <Navigate to={'/login'} />;
    }

    return (
        <UnauthLayout>
            <ToastContainer />
            <div className='h-screen max-w-full max-h-400 w-screen mx-auto flex flex-col items-center justify-center'>
                <h1 className='text-3xl font-extrabold mb-8'>Register</h1>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        username: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className='flex flex-col'>
                            {/* Formulářové prvky */}
                            <FormLayout type='text' name='firstName' placeholder='first name' errors={errors} touched={touched} className="rounded-full px-4 py-2 bg-white text-black" />
                            <FormLayout type='text' name='lastName' placeholder='last name' errors={errors} touched={touched} className="rounded-full px-4 py-2 bg-white text-black" />
                            <FormLayout type='text' name='username' placeholder='username' errors={errors} touched={touched} className="rounded-full px-4 py-2 bg-white text-black" />
                            <FormLayout type='password' name='password' placeholder='Password' errors={errors} touched={touched} className="rounded-full px-4 py-2 bg-white text-black" />
                            <FormLayout type='password' name='confirmPassword' placeholder='Confirm password' errors={errors} touched={touched} className="rounded-full px-4 py-2 bg-white text-black" />

                            {/* Tlačítko pro odeslání formuláře */}
                            <button
                                className={`w-full rounded-full font-semibold px-8 py-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none mx-auto ${theme === 'light' ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white' : theme === 'dark' ? 'bg-gradient-to-r from-red-600 to-red-700 text-white' : theme === 'red' ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-white' : 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white'}`}
                                type='submit'
                            >
                                Submit
                            </button>

                            {/* Odkaz pro přesměrování na stránku přihlášení */}
                            <div className='text-sm mt-4 flex justify-center'>
                                <span className='mr-2'>
                                    <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 inline-block align-middle' viewBox='0 0 20 20' fill='currentColor'>
                                        <path fillRule='evenodd' d='M15.146 4.146a.5.5 0 01.708 0l1 1a.5.5 0 010 .708l-8.5 8.5a.5.5 0 01-.765-.638l.057-.07 3.146-3.146-7.793.068a.5.5 0 01-.485-.606l.026-.118 1.5-6a.5.5 0 01.623-.365l.094.03 6 3zm-4.292 4.708a.5.5 0 01.707 0l2 2a.5.5 0 01-.708.708L11 10.707V14.5a.5.5 0 01-1 0V10.707L8.146 12.56a.5.5 0 01-.708-.708l2-2z' clipRule='evenodd' />
                                    </svg>
                                </span>
                                <span className='inline-block align-middle'>
                                    Already have an account? <Link to='/login' className='text-blue-500 hover:underline'>Log in.</Link>
                                </span>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </UnauthLayout>
    );
}
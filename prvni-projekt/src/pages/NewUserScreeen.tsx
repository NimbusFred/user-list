import React, { useState } from 'react';
import { Form, Formik, Field } from 'formik';
import { Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import { httpPost } from '../utils/http-client';
import { useAuth } from '../context/AuthProvider';
import FormLayout from '../components/layout/FormLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/layout/AuthLayout';


interface Values {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    role: string;
}

/**
 * Komponenta představující stránku registrace nového uživatele
 * [povinný být přihlašený uživatel]
 */
export default function NewUserScreen() {
    const { login } = useAuth();
    const [created, setCreated] = useState(false);

    // definice validačního schématu pro přihlašovací formulář
    const LoginSchema = Yup.object().shape({
        firstName: Yup.string().required('first name is required.'),
        lastName: Yup.string().required('last name is required.'),
        username: Yup.string().required('Username is required.'),
        password: Yup.string().required('Password is required.'),
    });

    // funkce pro odeslání přihlašovacích údajů pro přihlášení uživatele v aplikaci
    const handleSubmit = async (values: Values) => {
        const { firstName, lastName, password, username, role } = values;

        try {
            const res = await httpPost('users', { firstName, lastName, username, password, role });
            if (res.status === 201) {
                toast.success('Regiser new user successful!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000, // milliseconds
                });
                setTimeout(() => {
                    setCreated(true);
                }, 2000);
            } else if (res.status === 403) {
                toast.error('Nemáš opravnění heh.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                    hideProgressBar: true,
                });
            } else {
                toast.error('User registration failed.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                    hideProgressBar: true,
                });
            }
        } catch (err) {
            console.log(err);
            toast.error('User registration failed.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: true,
            });
        }
    };

    if (created) {
        return <Navigate to={'/users'} />;
    }

    if (!login) {
        return <Navigate to={'/'} />;
    }

    return (
        <Layout>
            <ToastContainer />
            <div className='h-screen max-w-full max-h-400 w-screen mx-auto flex flex-col items-center justify-center '>
                <h1 className='text-2xl font-bold mb-5 text-center'>Create new user</h1>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        username: '',
                        password: '',
                        role: '',
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className='flex flex-col'>
                            <FormLayout type='text' name='firstName' placeholder='first name' errors={errors} touched={touched} className="rounded-full px-4 py-2 bg-white shadow-sm" />
                            <FormLayout type='text' name='lastName' placeholder='last name' errors={errors} touched={touched} className="rounded-full px-4 py-2 bg-white shadow-sm" />
                            <FormLayout type='text' name='username' placeholder='username' errors={errors} touched={touched} className="rounded-full px-4 py-2 bg-white shadow-sm" />
                            <FormLayout type='password' name='password' placeholder='Password' errors={errors} touched={touched} className="rounded-full px-4 py-2 bg-white shadow-sm" />
                            <div className='mb-4'>
                                <Field
                                    as="select"
                                    className="rounded-full px-4 py-2 bg-white shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="role"
                                >
                                    <option value="prvni-test" disabled>choose the role</option>
                                    <option value="ghost">ghost</option>
                                    <option value="technician">technician</option>
                                    <option value="asset">asset</option>
                                    <option value="manager">manager</option>
                                    <option value="admin">admin</option>
                                </Field>
                            </div>
                            <button
                                className='w-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full text-white font-semibold px-8 py-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none mx-auto'
                                type='submit'
                            >
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Layout>
    );
}

import { Formik, Form, Field } from 'formik'; // importování potřebných knihoven pro tvorbu formuláře s validací
import { Navigate, useParams, Link, useNavigate } from 'react-router-dom'; // importování potřebných knihoven pro routing v aplikaci
import { useEffect, useState } from 'react'; // importování potřebných knihoven pro správu stavů komponent
import * as Yup from 'yup'; // importování knihovny pro tvorbu validačních schémat
import { useAuth } from '../context/AuthProvider'; // importování kontextu pro autentizaci uživatelů
import { httpGet, httpPut } from '../utils/http-client'; // importování funkce pro vytváření a posílání HTTP požadavků
import Layout from '../components/layout/AuthLayout'; // importování komponenty pro layout stránky
import FormLayout from '../components/layout/FormLayout'; // importování komponenty pro tvorbu formulářů v aplikaci
import { toast, ToastContainer } from 'react-toastify'; // importování knihovny pro zobrazování oznámení v aplikaci
import { User } from '../types/user.types'; // importování typu uživatele v aplikaci

export default function EditUserScreen() {
    const { id } = useParams<{ id: string }>(); // destrukturování id uživatele z URL parametrů pro použití v aplikaci
    const [userEdit, setUserEdit] = useState<User>(); // inicializace stavu pro editovaného uživatele
    const [userEdited, setUserEdited] = useState(false); // inicializace stavu pro potvrzení úspěšné editace uživatele
    const { user } = useAuth(); // přiřazení aktuálně přihlášeného uživatele z kontextu autentizace do proměnné
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({ // validace jednotlivých položek formuláře
        id: Yup.string().required('ID is required'), // validace ID uživatele
        firstName: Yup.string().required('First name is required'), // validace křestního jména
        lastName: Yup.string().required('Last name is required'), // validace příjmení
        username: Yup.string().required('username is required'), // validace uživatelského jména
        role: Yup.string().required('role is required'), // validace role uživatele
    });

    const handleSubmit = async (values: User) => { // funkce pro odeslání formuláře
        const { firstName, lastName, username, role } = values; // destrukturování hodnot z odeslaného formuláře

        try {
            const res = await httpPut(`users/${id}`, { firstName, lastName, username, role }); // odeslání PUT požadavku na API pro editaci uživatele
            if (res.status === 200) { // pokud požadavek vrátí kód 200, zobrazí se uživateli hláška o úspěšné editaci
                toast.success('User successfully edited.', { // zobrazení hlášky o úspěšné editu uživatele
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000, // milliseconds
                });
                setTimeout(() => {
                    setUserEdited(true);
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async () => {
        const res = await httpGet(`users/${id}`);
        if (res.status === 200) {
            setUserEdit(res.data.payload);
        }
    };
    // získání dat uživatele po načtení stránky
    useEffect(() => {
        fetchData();
    }, []);

    {
        userEdit && (
            <>
                {user?.role !== 'admin' && user?.role !== 'manager' && user?.username !== userEdit.username ? (
                    navigate('/')
                ) : null}
            </>
        )
    }




    if (userEdited) {
        return <Navigate to={'/'} />;
    }

    /* Kód pro editaci uživatelského profilu. */
    return (
        <Layout>
            <ToastContainer />
            <div className="min-h-screen">

                {userEdit ? (
                    /* Seznam uživatelů */
                    <div className="py-12 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">User list</h1>
                        <div className="max-w-7xl mx-auto ">
                            <div className="bg-white shadow-md rounded-lg overflow-hidden w-full pl-4 pr-4 pb-4 pt-4">
                                {/* Formulář pro editaci uživatelských dat */}
                                <Formik initialValues={{
                                    username: userEdit.username,
                                    firstName: userEdit.firstName,
                                    lastName: userEdit.lastName,
                                    role: userEdit.role,
                                    id: userEdit.id,
                                }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                    {({ errors, touched }) => (
                                        <Form>
                                            <div className="mb-4" >
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="id">
                                                    {/* ID uživatele */}
                                                    ID
                                                </label>
                                                <FormLayout type='number' name='id' placeholder='id' errors={errors} touched={touched} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
                                                    {/* Křestní jméno */}
                                                    First Name
                                                </label>
                                                <FormLayout type='text' name='firstName' placeholder='Enter first name' errors={errors} touched={touched} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="lastName">
                                                    {/* Příjmení */}
                                                    Last Name
                                                </label>
                                                <FormLayout type='text' name='lastName' placeholder='Enter last name' errors={errors} touched={touched} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                                                    {/* Uživatelské jméno */}
                                                    Username
                                                </label>
                                                <FormLayout type='text' name='username' placeholder='Enter username' errors={errors} touched={touched} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                            </div>
                                            {/* Pole pro změnu role uživatele - pouze pro admina */}
                                            {user?.role === 'admin' ? (
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="role">
                                                        role
                                                    </label>
                                                    <Field
                                                        as="select"  // pole pro výběr s výchozím typem "select"
                                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // třídy pro vzhled
                                                        name="role" // jméno pole, které bude předáno jako součást formulářových dat
                                                    >
                                                        <option value="ghosnt" disabled>choose the role</option>
                                                        <option value="admin">admin</option> {/* volba pro roli "Admin" */}
                                                        <option value="ghost">ghost</option> {/* volba pro roli "ghost" */}
                                                        <option value="technician">technician</option>  {/* volba pro roli "technician" */}
                                                        <option value="asset">asset</option> {/* volba pro roli "asset" */}
                                                        <option value="manager">manager</option> {/* volba pro roli "manager" */}
                                                    </Field>
                                                </div>
                                            ) : null}
                                            <div className="flex justify-between">
                                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 ease-in-out" type="submit"> {/* tlačítko pro odeslání formulářových dat */}
                                                    Save Changes {/* text na tlačítku */}
                                                </button>
                                                <Link to={'/users/'} className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md text-sm font-medium ml-auto mb-2 transition-colors duration-300 ease-in-out"> {/* odkaz zpět na stránku se seznamem uživatelů */}
                                                    Zpět {/* text na odkazu */}
                                                </Link>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <h1>Loading....</h1>
                    </div>
                )
                }
            </div>
        </Layout>
    );
}

import { TrashIcon, PencilSquareIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CellProps } from 'react-table';
import { toast, ToastContainer } from 'react-toastify';
import Icon from '../components/icon/Icon';
import Layout from '../components/layout/AuthLayout';
import Modal from '../components/layout/ModalLayout';
import DataTable from '../components/table/DataTable';
import { useAuth } from '../context/AuthProvider';
import { httpDelete, httpGet } from '../utils/http-client';
import RoleTag from '../components/layout/Navbar/RoleTagLayout';


/**

Rozhraní reprezentující uživatele se základními údaji
*/
interface Users {
  id: number; // ID uživatele
  firstName: string; // Křestní jméno uživatele
  lastName: string; // Příjmení uživatele
  username: string; // Uživatelské jméno
  password: string; // Heslo uživatele
  role: string; // Role uživatele
}

/**
 
Komponenta UserListScreen představuje stránku se seznamem uživatelů
[pouze přihlášený uživatel]
*/
export default function UserListScreen() {
  const [users, setUsers] = useState<Array<Users>>([]); // State pro uchování seznamu uživatelů
  const [showModal, setShowModal] = useState(false); // State pro zobrazení modálního okna pro smazání uživatele
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null); // State pro uchování ID uživatele, který bude smazán
  const [role, setRole] = useState<string | undefined>('');

  const { user } = useAuth();

  // Funkce pro získání dat ze serveru
  const fetchData = async () => {
    const res = await httpGet('users?limit=1000');
    if (res.status === 200) {
      setUsers(res.data.payload);
    }
  };

  // Funkce pro smazání uživatele
  const deleteUser = async (id: number) => {
    const res = await httpDelete(`users/${id}`);
    if (res.status === 200) {
      setUsers(users.filter((user) => user.id !== id));
      toast.success('User successfully delete.', { // zobrazení hlášky o úspěšném smazaní uživatele
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000, // milliseconds
      });
    } if (res.status === 403) {
      // opravnění
      toast.error('User does not have delete permissions.', { // zobrazení hlášky o úspěšném smazaní uživatele
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000, // milliseconds
      });
    }
  }

  useEffect(() => {
    fetchData();
    setRole(user?.role);
  }, []);

  // Pole s definicemi sloupců pro zobrazení v DataTable
  const columns = [
    {
      Header: 'tabule',
      columns: [
        {
          Header: '#', // Hlavička sloupce s pořadovým číslem
          accessor: 'id', // Přístup k ID uživatele
          // Vlastní render pro zobrazení pořadového čísla
          Cell: ({ cell }: CellProps<Users>) => (
            <span>{cell.row.index + 1}</span>
          ),
        },
        {
          Header: 'Username', // Hlavička sloupce s uživatelským jménem
          accessor: 'username', // Přístup k uživatelskému jménu
        },
        {
          Header: 'First name', // Hlavička sloupce s křestním jménem
          accessor: 'firstName', // Přístup ke křestnímu jménu
        },
        {
          Header: 'Last name',
          accessor: 'lastName',
        },
        {
          Header: 'Role',
          accessor: 'role',
          Cell: ({ cell }: CellProps<Users>) => (
            <RoleTag
              color={
                cell.value === 'ghost'
                  ? 'bg-gray-500'
                  : cell.value === 'asset'
                    ? 'bg-blue-500'
                    : cell.value === 'technician'
                      ? 'bg-emerald-500'
                      : cell.value === 'manager'
                        ? 'bg-lime-500'
                        : 'bg-red-500'
              }
              text={cell.value}
            />
          ),
        },
        {
          Header: 'Actions',
          accessor: 'buttons',
          // vlastní render
          Cell: ({ cell }: CellProps<Users>) => (
            <div className='flex flex-row justify-center'>
              {user?.role === 'admin' || user?.role === 'manager' ? (
                <>
                  <Icon
                    icon={TrashIcon}
                    className='h-5 w-5 text-red-500 cursor-pointer'
                    onClick={() => {
                      setDeleteUserId(cell.row.values.id);
                      setShowModal(true);
                    }}
                  />
                  {showModal && deleteUserId === cell.row.values.id && (
                    <Modal
                      message='Opravdu chcete smazat tohoto uživatele?'
                      confirmText='Smazat'
                      onConfirm={() => {
                        deleteUser(cell.row.values.id);
                        setShowModal(false);
                      }}
                      onCancel={() => {
                        setDeleteUserId(null);
                        setShowModal(false);
                        toast.warning('Nothing was deleted.', {
                          position: toast.POSITION.TOP_CENTER,
                          autoClose: 2000,
                        });
                      }}
                    />
                  )}
                  <Link to={`/users/edit/${cell.row.values.id}`}>
                    <Icon
                      icon={PencilSquareIcon}
                      className='h-5 w-5 text-red-500 cursor-pointer'
                    />
                  </Link>
                </>
              ) : null}
              <Link to={`/users/detail/${cell.row.values.id}`}>
                <Icon
                  icon={InformationCircleIcon}
                  className='h-5 w-5 text-red-500 cursor-pointer'
                />
              </Link>
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <Layout>
      <ToastContainer />
      {columns ? (
        <div className="min-h-screen">
          <div className="py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-4">User list</h1>
            <div className="shadow-lg rounded-lg overflow-hidden w-full">
              <DataTable data={users} columns={columns} />
            </div>
          </div>
        </div>

      ) : (
        <div>Loading....</div>
      )}
    </Layout>
  );
}

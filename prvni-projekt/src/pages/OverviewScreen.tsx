import { useEffect, useState } from 'react';
import Layout from '../components/layout/AuthLayout';
import { httpGet } from '../utils/http-client';


type UsersRole = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
};

interface RoleCounts {
  [key: string]: number;
}


function getRoleColor(role: string) {
  // Funkce vrátí barvu pozadí pro zadanou roli
  switch (role) {
    case 'ghost':
      return 'bg-gray-500';
    case 'asset':
      return 'bg-blue-500';
    case 'technician':
      return 'bg-emerald-500';
    case 'manager':
      return 'bg-lime-500';
    default:
      return 'bg-red-500';
  }
}

/**
 * Komponenta představující stránku info hodnotami o uživatelích
 * [pouze přihlášený uživatel]
 */
export default function OverviewScreen() {
  const [usersCount, setUsersCount] = useState<{ total: number }>({ total: 0 });
  const [users, setUsers] = useState<UsersRole[]>([]);
  const [roles, setRoles] = useState<RoleCounts>({});

  const fetchData = async () => {
    const res = await httpGet('users?limit=1000');
    if (res.status === 200) {
      // Získávání dat o uživatelích ze serveru
      setUsersCount(res.data.meta);
      setUsers(res.data.payload);
    }
  };

  useEffect(() => {
    // Načtení dat o uživatelích po načtení stránky
    fetchData();
  }, []);

  useEffect(() => {
    // Spočítání počtu uživatelů pro každou roli
    const roleCounts = users.reduce((acc, user) => {
      return { ...acc, [user.role]: (acc[user.role] || 0) + 1 };
    }, {} as RoleCounts);
    setRoles(roleCounts);
  }, [users]);

  return (
    <Layout>
      {usersCount ? (
        <div className='flex flex-col justify-center items-center min-h-screen'>
          <div className='container mx-auto p-8 rounded-lg shadow-xl'>
            <h1 className='text-4xl font-bold mb-4'>Overview</h1>
            <div className='text-lg mb-4'>
              <span className='font-bold'>Number of Users:</span> {usersCount.total}
              <hr className='my-4' />
            </div>
            <h2 className='text-2xl font-bold mb-4'>User Roles:</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
              {Object.entries(roles).map(([role, count]) => (
                <div
                  key={role}
                  className={`p-4 rounded-md shadow-md ${getRoleColor(role)} transition duration-300 hover:shadow-lg`}
                >
                  <div className='font-bold text-lg'>{role}</div>
                  <div className='text-gray-100'>{count} users</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        // Zobrazení nápisu "Loading" pokud se načítají data o uživatelích
        <div>Loading....</div>
      )}
    </Layout>
  );
}

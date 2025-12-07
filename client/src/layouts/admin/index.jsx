import { Outlet, useNavigate } from 'react-router';
import { useAuthContext } from '../../hooks/use-auth-context';
import { List, Search, User } from 'lucide-react';
import { ADMIN_URL, AUTH_URL } from '../../constant/url';
import { USER_ROLE } from '../../constant/user';
import Button from '../../components/button';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, deleteAuthData } = useAuthContext();

  const navigateItems =
    user.role === USER_ROLE.NORMAL_USER
      ? [
          {
            key: 'my-profile',
            icon: <User />,
            label: 'My Profile',
            url: ADMIN_URL.USER_PROFILE,
          },
          {
            key: 'my-submissions',
            icon: <List />,
            label: 'My Submissions',
            url: ADMIN_URL.SUBMISSIONS,
          },
        ]
      : [
          {
            key: 'submissions',
            icon: <List />,
            label: 'Submissions',
            url: ADMIN_URL.SUBMISSIONS,
          },
        ];

  const logout = () => {
    deleteAuthData();
    navigate(AUTH_URL.LOGIN);
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)',
      }}
    >
      <div className="bg-white fixed right-0 left-0 h-18 pl-5 pr-5 flex items-center justify-between border-b border-(--border-color) z-9999">
        <div className="flex items-center gap-2">
          <img
            className="w-12 h-12"
            src="/customer-service-icon.svg"
            alt="customer-service-icon"
          />
          <div className="text-2xl font-semibold">Simple KYC</div>
        </div>
        <div className="relative">
          <Search
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
            }}
            size={20}
          />
          <input
            className="w-100 px-10 py-2 border border-(--border-color) rounded-md focus:outline-none focus:ring-2 focus:ring-(--secondary-color)"
            placeholder="Search"
          />
        </div>
        <Button handleClick={logout}>Log out</Button>
      </div>
      <div className="bg-white fixed top-0 bottom-0 left-0 mt-18 w-60 p-5 border-r border-(--border-color) flex flex-col z-9999">
        {navigateItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center gap-2 py-3 pl-3 rounded-lg cursor-pointer hover:bg-gray-100 transition"
            onClick={() => {
              navigate(item.url);
            }}
          >
            {item.icon}
            <div>{item.label}</div>
          </div>
        ))}
      </div>
      <div className="pt-22 pr-5 pl-65 pb-5">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

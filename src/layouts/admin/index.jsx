import { Outlet, useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faList } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { ADMIN_URL } from '../../constant/url';

const navigateItems = [
  {
    key: 'my-profile',
    icon: faUser,
    label: 'My Profile',
    url: ADMIN_URL.PERSONAL_INFORMATION,
  },
  {
    key: 'my-submissions',
    icon: faList,
    label: 'My Submissions',
    url: '',
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();

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
          <FontAwesomeIcon
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              color: 'var(--text-color)',
            }}
            icon={faMagnifyingGlass}
          />
          <input
            className="w-100 px-10 py-2 border border-(--border-color) rounded-md focus:outline-none focus:ring-2 focus:ring-(--secondary-color)"
            placeholder="Search"
          />
        </div>
        <div>Right section</div>
      </div>
      <div className="bg-white fixed top-0 bottom-0 left-0 mt-18 w-60 p-5 border-r border-(--border-color) flex flex-col z-9999">
        {navigateItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center gap-2 py-3 pl-3 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => {
              navigate(item.url);
            }}
          >
            <FontAwesomeIcon
              style={{ color: 'var(--text-color)' }}
              icon={item.icon}
            />
            <div>{item.label}</div>
          </div>
        ))}
      </div>
      <div className="pt-22 pr-5 pl-65 pb-5">
        <Outlet />
        <div className="mt-5">
          <div className="bg-white p-6 rounded-lg shadow-md flex gap-5 text-gray-500 text-sm">
            <div>Terms and conditions</div>
            <div>Privacy Policy</div>
            <div>Licensing</div>
            <div>Cookie Policy</div>
            <div>Contact</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

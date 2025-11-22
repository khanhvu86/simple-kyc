import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center gap-7 min-h-screen text-(--text-color)">
      <div className="flex items-center gap-2">
        <img
          className="w-12 h-12"
          src="/customer-service-icon.svg"
          alt="customer-service-icon"
        />
        <div className="text-2xl font-bold">Simple KYC Authentication</div>
      </div>

      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold">Login to platform</h2>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

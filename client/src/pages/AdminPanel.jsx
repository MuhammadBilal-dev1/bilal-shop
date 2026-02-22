import React from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const isAdmin = user?.role === ROLE.ADMIN;

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 shadow-[4px_0_4px_0_rgba(0,0,0,0.1)]">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
          {!isAdmin && (
            <p className="text-xs px-2 py-0.5 mt-1 rounded-full bg-yellow-100 text-yellow-700">
              Read-only
            </p>
          )}
        </div>

        {/* navigation */}
        <div>
          <nav className="grid p-4">
            <Link
              to={"all-users"}
              className="px-2 py-2 hover:bg-slate-100 rounded-lg"
            >
              All Users
            </Link>
            <Link
              to={"all-products"}
              className="px-2 py-2 hover:bg-slate-100 rounded-lg"
            >
              ALL Products
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;

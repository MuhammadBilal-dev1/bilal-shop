import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from "../components/ChangeUserRole";
import { useSelector } from "react-redux";
import ROLE from "../common/role";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });
  const user = useSelector((state) => state?.user?.user);
  const isAdmin = user?.role === ROLE.ADMIN;

  const fetchAllUsers = async () => {
    const res = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });

    const api = await res.json();
    if (api.success) {
      setAllUsers(api.data);
    }
    if (api.error) {
      toast.error(api.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((val, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.role}</td>
                <td>{moment(val.createdAt).format("ll")}</td>
                <td>
                  <button
                    className={`p-2 rounded-full ${isAdmin ? "bg-green-100 hover:bg-green-500 hover:text-white cursor-pointer" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
                    disabled={!isAdmin}
                    title={isAdmin ? "Change role" : "Read-only for users"}
                    onClick={() => {
                      if (!isAdmin) return;
                      setUpdateUserDetails(val);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateRole && isAdmin && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;

import React, { useCallback, useEffect, useState } from "react";
import { apiService } from "../hooks/apiService";
import EditModal from "../components/EditModal";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userSelected, setUserSelected] = useState<any>(null);
  // Datatable states 
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await apiService.get("/api/v1/users");
        setUsers(data as any[]);
        console.log(data);
      } catch (error: any) {
        console.log(error.message);
      }
    }
    fetchUsers();
  }, []);

  // Filter
  const filteredUsers = users.filter((user) =>
    Object.values(user).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aValue = String(a[key]).toLowerCase();
    const bValue = String(b[key]).toLowerCase();

    if (aValue < bValue) {
      return direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = sortedUsers.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(sortedUsers.length / entriesPerPage) || 1;

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) return " ↕";
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  const deleteUser = useCallback(async (id: string) => {
    await apiService.delete(`/api/v1/users/${id}`);
    setUsers(users.filter((user) => user._id !== id));
    toast.success("User deleted successfully");
  }, [users]);

  const editUser = useCallback(async (userToEdit: any) => {
    console.log("editing...", userToEdit);

    await apiService.put(`/api/v1/users/${userToEdit._id}`, userToEdit);
    setUsers(users.map((user) => user._id === userToEdit._id ? { ...user, ...userToEdit } : user));
    setIsEditModalOpen(false);
    setUserSelected(null);
    toast.success("User updated successfully");
  }, [users]);


  const openEditModal = useCallback((userSelected: any) => {
    setUserSelected(userSelected);
    setIsEditModalOpen(true);
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl text-center font-bold mb-8 text-gray-800">Admin Dashboard</h1>
      {isEditModalOpen && <EditModal editUser={editUser} setIsEditModalOpen={setIsEditModalOpen} userSelected={userSelected} />}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        {/* Datatable Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center">
            <span className="mr-2 text-gray-600">Show</span>
            <select
              className="border border-gray-300 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="ml-2 text-gray-600">entries</span>
          </div>

          <div className="flex items-center w-full md:w-auto">
            <label className="mr-3 text-gray-600 font-medium whitespace-nowrap">Search:</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-1.5 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-700 text-sm uppercase font-semibold">
              <tr>
                <th className="p-4 border-b">S.No</th>
                <th className="p-4 border-b cursor-pointer hover:bg-gray-100 transition-colors select-none group" onClick={() => requestSort('_id')}>
                  <div className="flex items-center justify-between">
                    ID <span className="text-gray-400 group-hover:text-gray-700">{getSortIndicator('_id')}</span>
                  </div>
                </th>
                <th className="p-4 border-b cursor-pointer hover:bg-gray-100 transition-colors select-none group" onClick={() => requestSort('name')}>
                  <div className="flex items-center justify-between">
                    Name <span className="text-gray-400 group-hover:text-gray-700">{getSortIndicator('name')}</span>
                  </div>
                </th>
                <th className="p-4 border-b cursor-pointer hover:bg-gray-100 transition-colors select-none group" onClick={() => requestSort('email')}>
                  <div className="flex items-center justify-between">
                    Email <span className="text-gray-400 group-hover:text-gray-700">{getSortIndicator('email')}</span>
                  </div>
                </th>
                <th className="p-4 border-b cursor-pointer hover:bg-gray-100 transition-colors select-none group" onClick={() => requestSort('role')}>
                  <div className="flex items-center justify-between">
                    Role <span className="text-gray-400 group-hover:text-gray-700">{getSortIndicator('role')}</span>
                  </div>
                </th>
                <th className="p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentEntries.length > 0 ? (
                currentEntries.map((user, index) => (
                  <DtRow
                    user={user}
                    key={user._id}
                    index={indexOfFirstEntry + index}
                    deleteUser={deleteUser}
                    openEditModal={openEditModal}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <p className="text-lg font-medium">No records found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination & Info */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredUsers.length === 0 ? 0 : indexOfFirstEntry + 1}</span> to <span className="font-semibold text-gray-900">{Math.min(indexOfLastEntry, filteredUsers.length)}</span> of <span className="font-semibold text-gray-900">{filteredUsers.length}</span> entries
          </div>

          <div className="flex gap-1 items-center">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>

            <div className="flex px-2 space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                let isVisible = false;
                if (totalPages <= 5) isVisible = true;
                else if (page === 1 || page === totalPages) isVisible = true;
                else if (Math.abs(currentPage - page) <= 1) isVisible = true;

                if (!isVisible) {
                  if (page === 2 && currentPage > 3) return <span key={page} className="px-2 py-1 text-gray-500">...</span>;
                  if (page === totalPages - 1 && currentPage < totalPages - 2) return <span key={page} className="px-2 py-1 text-gray-500">...</span>;
                  return null;
                }

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentPage === page
                      ? 'bg-blue-600 text-white border-transparent shadow-sm'
                      : 'border border-transparent text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {page}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DtRow = React.memo(({ user, index, deleteUser, openEditModal }: { user: any, index: number, deleteUser: (id: string) => void, openEditModal: (user: User) => void }) => {
  return (
    <tr className="border-b last:border-0 hover:bg-blue-50/50 transition-colors">
      <td className="p-4 text-sm text-gray-600">{index + 1}</td>
      <td className="p-4 font-mono text-sm text-gray-500">{user._id}</td>
      <td className="p-4 text-sm font-medium text-gray-900">{user.name}</td>
      <td className="p-4 text-sm text-gray-600">{user.email}</td>
      <td className="p-4">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium tracking-wide ${user.role === 'admin'
          ? 'bg-purple-100 text-purple-700 border border-purple-200'
          : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
          }`}>
          {user.role}
        </span>
      </td>
      <td className="p-4 flex gap-2">
        <button className="bg-indigo-50 border border-indigo-200 hover:bg-indigo-600 hover:text-white text-indigo-600 px-3 py-1.5 rounded-md text-sm font-medium transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          onClick={() => openEditModal(user)}
          data-modal-target="edit-modal"
          data-modal-toggle="edit-modal"
        >
          Edit
        </button>
        <button className="bg-red-50 border border-red-200 hover:bg-red-600 hover:text-white text-red-600 px-3 py-1.5 rounded-md text-sm font-medium transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
          onClick={() => deleteUser(user._id)}
        >
          Delete
        </button>
      </td>
    </tr>

  );
});

export default AdminDashboard;
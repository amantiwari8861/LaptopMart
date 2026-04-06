import React, { useState } from "react";

const EditModal = React.memo(
  ({
    editUser,
    setIsEditModalOpen,
    userSelected,
  }: {
    editUser: (user: User) => void;
    setIsEditModalOpen: (open: boolean) => void;
    userSelected: User;
  }) => {
    const [userToEdit, setUserToEdit] = useState<User>(userSelected);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setUserToEdit((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      editUser(userToEdit);
      setIsEditModalOpen(false);
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="text-lg font-semibold">Edit User</h3>
            <button onClick={() => setIsEditModalOpen(false)}>✕</button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            
            {/* ID (disabled) */}
            <div>
              <label className="block text-sm mb-1">User ID</label>
              <input
                type="text"
                name="_id"
                value={userToEdit._id}
                disabled
                className="w-full px-3 py-2 rounded-lg border bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={userToEdit.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={userToEdit.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm mb-1">Role</label>
              <select
                name="role"
                value={userToEdit.role}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border"
              >
                <option value="ROLE_USER">User</option>
                <option value="ROLE_ADMIN">Admin</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
);

export default EditModal;
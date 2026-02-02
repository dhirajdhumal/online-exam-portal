import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import '../../styles/admin/ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load users');
      setLoading(false);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleMakeAdmin = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to make ${userName} an admin?`)) {
      return;
    }

    try {
      setError('');
      setSuccess('');
      await api.put(`/users/${userId}/role`, { role: 'admin' });
      setSuccess(`${userName} has been promoted to admin successfully!`);
      fetchUsers();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user role');
    }
  };

  const handleMakeStudent = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to change ${userName} back to student?`)) {
      return;
    }

    try {
      setError('');
      setSuccess('');
      await api.put(`/users/${userId}/role`, { role: 'student' });
      setSuccess(`${userName} has been changed to student successfully!`);
      fetchUsers();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      return;
    }

    try {
      setError('');
      setSuccess('');
      await api.delete(`/users/${userId}`);
      setSuccess(`${userName} has been deleted successfully!`);
      fetchUsers();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar title="Manage Users" />
        <div className="loading-screen">Loading users...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar title="Manage Users" />
      
      {/* Toast Notifications */}
      {success && <div className="toast-success">{success}</div>}
      {error && <div className="toast-error">{error}</div>}
      
      <div className="users-container">
        <div className="users-header">
          <h1>Manage Users</h1>
          <p>View all registered users and manage their roles</p>
        </div>

        <div className="users-table-container">
          {users.length === 0 ? (
            <p className="no-data">No users found</p>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Standard</th>
                  <th>Division</th>
                  <th>Roll No</th>
                  <th>Phone</th>
                  <th>Registered</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user.standard || '-'}</td>
                    <td>{user.division || '-'}</td>
                    <td>{user.rollNo || '-'}</td>
                    <td>{user.phone || '-'}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="user-actions">
                        {user.role === 'student' ? (
                          <button
                            onClick={() => handleMakeAdmin(user._id, user.name)}
                            className="btn-make-admin"
                          >
                            Make Admin
                          </button>
                        ) : user._id !== currentUser?._id ? (
                          <button
                            onClick={() => handleMakeStudent(user._id, user.name)}
                            className="btn-make-student"
                          >
                            Make Student
                          </button>
                        ) : null}
                        {user._id !== currentUser?._id && (
                          <button
                            onClick={() => handleDeleteUser(user._id, user.name)}
                            className="btn-delete-user"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;

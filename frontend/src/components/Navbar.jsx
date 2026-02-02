import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import '../styles/Navbar.css';

const Navbar = ({ title }) => {
  const { user, logout } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user?.role === 'student') {
      fetchUserDetails();
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchUserDetails = async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUserDetails(data.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-brand">
        <h2>{title || 'Online Examination System'}</h2>
      </div>
      
      {user?.role === 'student' && (
        <div className="navbar-center">
          <Link to="/student/dashboard" className={`nav-link ${isActive('/student/dashboard')}`}>
            Dashboard
          </Link>
          <Link to="/student/exams" className={`nav-link ${isActive('/student/exams')}`}>
            Exams
          </Link>
          <Link to="/student/results" className={`nav-link ${isActive('/student/results')}`}>
            Results
          </Link>
        </div>
      )}
      
      <div className="navbar-user">
        <span className="user-name">{user?.name}</span>
        {user?.role === 'student' && userDetails?.division && (
          <span className="user-division">Div: {userDetails.division}</span>
        )}
        {user?.role === 'admin' && (
          <span className="user-role">(Admin)</span>
        )}
        {user?.role === 'student' && (
          <button onClick={() => navigate('/student/profile')} className="btn-profile">
            My Profile
          </button>
        )}
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

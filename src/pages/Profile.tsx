import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { logout } from "../features/auth/authSlice";

interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get("/auth/profile");
        setProfile(response.data);
      } catch {
        setErrorMessage("Failed to fetch profile. Please log in again.");
        dispatch(logout());
        navigate("/login");
      }
    };

    fetchProfile();
  }, [token, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Profile
        </h2>

        {errorMessage && (
          <div className="mb-4 text-red-600 text-center">{errorMessage}</div>
        )}

        {profile ? (
          <div>
            <p className="mb-2 text-gray-700">
              <strong>First Name:</strong> {profile.firstName}
            </p>
            <p className="mb-2 text-gray-700">
              <strong>Last Name:</strong> {profile.lastName}
            </p>
            <p className="mb-2 text-gray-700">
              <strong>Phone:</strong> {profile.phone}
            </p>
            <p className="mb-2 text-gray-700">
              <strong>Address:</strong> {profile.address}
            </p>
            <p className="mb-4 text-gray-700">
              <strong>Email:</strong> {profile.email}
            </p>
            <button
              onClick={handleLogout}
              className="w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

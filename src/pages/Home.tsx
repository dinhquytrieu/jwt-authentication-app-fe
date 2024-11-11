// // src/pages/Home.tsx
// import React from "react";
// import { Link } from "react-router-dom";

// const Home: React.FC = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <h1 className="text-3xl font-bold text-gray-800 mb-4">
//         Welcome to the User Registration System
//       </h1>
//       <p className="text-lg text-gray-600 mb-6">
//         Please log in or register to access your account.
//       </p>
//       <div className="space-x-4">
//         <Link to="/login">
//           <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
//             Login
//           </button>
//         </Link>
//         <Link to="/register">
//           <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
//             Register
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Home;

// src/pages/Home.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to the User Registration System
      </h1>

      {user ? (
        // If user is logged in, display username and Profile button
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-6">Hello, {user.email}!</p>
          <button
            onClick={() => navigate("/profile")}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Go to Profile
          </button>
        </div>
      ) : (
        // If user is not logged in, display Login and Register buttons
        <div className="space-x-4">
          <Link to="/login">
            <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
              Register
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;

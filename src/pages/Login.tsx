// // src/pages/Login.tsx
// import React from "react";
// import { useForm } from "react-hook-form";
// import axios from "../api/axios";
// import { useNavigate } from "react-router-dom";

// interface LoginFormInputs {
//   email: string;
//   password: string;
// }

// const Login: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormInputs>();
//   const navigate = useNavigate();

//   const onSubmit = async (data: LoginFormInputs) => {
//     try {
//       await axios.post(
//         "https://user-registration-app-1.onrender.com/user/login",
//         // "http://localhost:3000/user/login",
//         data
//       );
//       alert("Login successful");
//       navigate("/"); // Redirect to Home or Dashboard page on success
//     } catch (error: unknown) {
//       const err = error as { response?: { data?: { message?: string } } };
//       alert(err.response?.data?.message || "Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Login
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               {...register("email", { required: "Email is required" })}
//               className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.email && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               {...register("password", { required: "Password is required" })}
//               className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.password && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.password.message}
//               </p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios, { isAxiosError } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post("/auth/login", data);
      const { token, user } = response.data;

      // Dispatch login success action to store user info and token in Redux
      dispatch(loginSuccess({ user, token }));

      alert("Login successful");
      navigate("/"); // Redirect to Home or Dashboard page on success
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMessage(
          (error.response?.data as { message?: string })?.message ||
            "Login failed. Please try again."
        );
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        {errorMessage && (
          <div className="mb-4 text-red-600 text-center">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

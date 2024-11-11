// import { useForm } from "react-hook-form";
// import axios, { isAxiosError } from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// type FormData = {
//   email: string;
//   password: string;
//   confirmPassword: string;
// };

// export default function Register() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm<FormData>();

//   const navigate = useNavigate();
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const password = watch("password");

//   const onSubmit = async (data: FormData) => {
//     try {
//       const response = await axios.post(
//         // "https://user-registration-app-1.onrender.com/user/register",
//         // "http://localhost:3000/user/register",
//         "/auth/register",
//         { email: data.email, password: data.password }
//       );
//       setSuccessMessage(response.data.message); // Show success message
//       setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
//     } catch (error: unknown) {
//       if (isAxiosError(error)) {
//         alert(
//           (error.response?.data as { message: string })?.message ||
//             "Registration failed"
//         );
//       } else {
//         alert("Registration failed");
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Register
//         </h2>

//         {successMessage && (
//           <div className="mb-4 text-green-600 text-center">
//             {successMessage}. Redirecting to login...
//           </div>
//         )}

//         <div className="mb-4">
//           <label className="block text-gray-700">Email</label>
//           <input
//             type="email"
//             {...register("email", {
//               required: "Email is required",
//               pattern: {
//                 value: /^\S+@\S+$/i,
//                 message: "Invalid email format",
//               },
//             })}
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.email && (
//             <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Password</label>
//           <input
//             type="password"
//             {...register("password", { required: "Password is required" })}
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.password && (
//             <p className="mt-1 text-sm text-red-600">
//               {errors.password.message}
//             </p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Confirm Password</label>
//           <input
//             type="password"
//             {...register("confirmPassword", {
//               required: "Please confirm your password",
//               validate: (value) =>
//                 value === password || "Passwords do not match",
//             })}
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.confirmPassword && (
//             <p className="mt-1 text-sm text-red-600">
//               {errors.confirmPassword.message}
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

import { useForm } from "react-hook-form";
import axios, { isAxiosError } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/auth/register", {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        address: data.address,
        email: data.email,
        password: data.password,
      });
      setSuccessMessage(response.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        alert(
          (error.response?.data as { message: string })?.message ||
            "Registration failed"
        );
      } else {
        alert("Registration failed");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        {successMessage && (
          <div className="mb-4 text-green-600 text-center">
            {successMessage}. Redirecting to login...
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            {...register("firstName", { required: "First name is required" })}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            {...register("lastName", { required: "Last name is required" })}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Invalid phone number",
              },
            })}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Register
        </button>
      </form>
    </div>
  );
}

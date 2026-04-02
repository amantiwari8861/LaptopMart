import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router";

// validation schema
const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters long" })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Name can only contain letters and spaces",
    }),
  email: z
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(30),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const submitHandler = async (data: RegisterFormData) => {
    const res = await registerUser(data);
    if (res?.status===201) {
      const data = res.data;
      console.log(data);
      console.log("user registered:", data);
      toast.success("user registered successfully!");
      reset();
      navigate("/login");
    }
  };


  const registerUser = async (userData) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/auth/register`, userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // required if backend uses cookies / remember-me
        }
      );
      console.log(res);
      return res;
    }
    catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex justify-center items-center my-12">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>

          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign up to our platform
          </h5>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium dark:text-white">
              Your Name
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium dark:text-white">
              Your email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium dark:text-white">
              Your password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5 text-center"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom"; // ✅ import Link if using React Router
import axios from "axios";

// ✅ Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain uppercase, lowercase, number & special character"
    )
    .required("Password is required"),
});

function Login() {
  const [hideShow, setHideShow] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="w-full max-w-2xl bg-white p-4 sm:p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values) => {
            try {
              const checkData = await axios.post(
                "http://localhost:1435/web/find",
                values
              );
              if (checkData.data.status === 201) {
                console.log(checkData.data.message);
                alert(checkData.data.message);
              }
            } catch (error) {
              console.log(error.message);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm font-medium">Password</label>
                <Field
                  type={hideShow ? "text" : "password"}
                  name="password"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                <div className="absolute top-9 right-4">
                  {hideShow ? (
                    <IoIosEyeOff
                      className="text-[1.5rem] hover:cursor-pointer"
                      onClick={() => setHideShow(!hideShow)}
                    />
                  ) : (
                    <IoMdEye
                      className="text-[1.5rem] hover:cursor-pointer"
                      onClick={() => setHideShow(!hideShow)}
                    />
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              {/* ✅ Signup Link */}
              <p className="text-center text-sm mt-4">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-500 hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;

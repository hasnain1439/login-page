import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";

// ✅ Validation Schema
const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  fatherName: Yup.string().required("Father's Name is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .positive("Age must be positive")
    .integer("Age must be an integer")
    .required("Age is required"),
  phoneNo: Yup.string()
    .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain uppercase, lowercase, number & special character"
    )
    .required("Password is required"),
});

const SignUp = () => {
  const [hideShow, setHideShow] = useState(false);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="w-full max-w-2xl bg-white p-4 sm:p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center `mb-6">Sign Up</h2>
        <Formik
          initialValues={{
            name: "",
            fatherName: "",
            age: "",
            phoneNo: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { resetForm }) => {
            try{
            const response = await axios.post("http://localhost:1435/web/insert-data", values);
            console.log(response.data)
            alert(response.data)
              resetForm();
            }
            catch(err){
              console.log(err.message)
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium">Name</label>
                <Field
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Father's Name */}
              <div>
                <label className="block text-sm font-medium">
                  Father's Name
                </label>
                <Field
                  type="text"
                  name="fatherName"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="fatherName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium">Age</label>
                <Field
                  type="number"
                  name="age"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="age"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium">
                  Phone Number
                </label>
                <Field
                  type="text"
                  name="phoneNo"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="phoneNo"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  type={hideShow ? "text " : "password"}
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
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>

              {/* ✅ Signup Link */}
              <p className="text-center text-sm mt-4">
                Don’t have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-500 hover:underline font-medium"
                >
                  Lign in
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;

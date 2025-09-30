import { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

function ViewData() {
  const [users, setUsers] = useState([]);
  const [deleteData, setDeletData] = useState();
  const [editDataId, setEditDataId] = useState();
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:1435/web/view")
      .then((res) => setUsers(res.data.viewAllUser))
      .catch((err) => console.log(err));
  }, [users]);
  useEffect(() => {
    axios
      .delete(`http://localhost:1435/web/delete/${deleteData}`)
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err));
  }, [deleteData]);

const updateSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  fatherName: Yup.string().required("Father name is required"),
  age: Yup.number().required("Age is required"),
  phoneNo: Yup.string().required("Phone is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

  const [hideShow, setHideShow] = useState(false);
  return (
    <div className="w-full ">
      <div className="w-11/12 mx-auto mt-10 ">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          User Data
        </h2>

        {/* ✅ Table (Visible on md and larger) */}
        <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="py-3 px-6 text-start">Name</th>
                <th className="py-3 px-6 text-start">Father Name</th>
                <th className="py-3 px-6 text-start">Email</th>
                <th className="py-3 px-6 text-start">Age</th>
                <th className="py-3 px-6 text-start">Phone</th>
                <th className="py-3 px-6 text-start">Password</th>
                <th className="py-3 px-6 text-start">Manage</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.fatherName}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.age}</td>
                    <td className="py-2 px-4">{user.phoneNo}</td>
                    <td className="py-2 px-4">{user.password}</td>
                    <td className="py-2 px-4 flex gap-3">
                      <MdDelete
                        className="p-1 bg-red-500 rounded text-[1.75rem] text-white hover:cursor-pointer "
                        onClick={() => setDeletData(user._id)}
                      />
                      <CiEdit
                        className="p-1 bg-green-500 rounded text-[1.75rem] text-white hover:cursor-pointer "
                        onClick={() => {
                          setEditDataId(user._id);
                          setShowEdit(!showEdit);
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ✅ Card View (Visible on small screens) */}
        <div className="md:hidden space-y-4">
          {users.length > 0 ? (
            users.map((user, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
              >
                <p className="text-gray-700">
                  <span className="font-semibold">Name:</span> {user.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Father Name:</span>{" "}
                  {user.fatherName}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Age:</span> {user.age}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Phone:</span> {user.phoneNo}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Password:</span>{" "}
                  {user.password}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No Data Found</p>
          )}
        </div>
      </div>
      {showEdit ? (
        <div className="absolute w-full flex justify-center items-ceter h-full bg-black opacity-80 op top-0 start-0">
          <div className="w-1/2 my-auto p-4 bg-white p-5 rounded relative">
            <Formik
              initialValues={{
                name: "",
                fatherName: "",
                age: "",
                phoneNo: "",
                email: "",
                password: "",
              }}
              validationSchema={updateSchema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  const response = await axios.put(
                    `http://localhost:1435/web/edit/${editDataId}`,
                    values
                  );
                  console.log(response.data);
                  alert(response.data);
                  resetForm();
                } catch (err) {
                  console.log(err.message);
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
                    <label className="block text-sm font-medium">
                      Password
                    </label>
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
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </Form>
              )}
            </Formik>
            <RxCross2
              className="text-[1.75rem] absolute top-2 end-5 hover:cursor-pointer"
              onClick={() => setShowEdit(!showEdit)}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ViewData;

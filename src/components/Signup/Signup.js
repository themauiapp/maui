import React from "react";
import { useFormik } from "formik";
import { signupSchema } from "../../schemas/auth";
import Button from "../Button/Button";

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    validateOnChange: false,
    onSubmit: (values) => {},
  });

  const fields = [
    {
      name: "first_name",
      type: "text",
    },
    {
      name: "last_name",
      type: "text",
    },
    {
      name: "email",
      type: "email",
    },
    {
      name: "password",
      type: "password",
    },
  ];

  const displayFields = () => {
    const formFields = [...fields];
    return formFields.map((field, index) => {
      return (
        <div key={index} className="w-full px-10 mb-4 flex flex-col">
          {field.type === "select" ? (
            <select
              name={field.name}
              className="p-3"
              onChange={formik.handleChange}
              style={{ border: "1px solid rgba(0,0,0,0.05)" }}
            ></select>
          ) : (
            <input
              id={field.name}
              className="focus:outline-none capitalize p-3 text-gray-700"
              type={field.type}
              name={field.name}
              onChange={formik.handleChange}
              placeholder={field.name.replace(/_/, " ")}
              style={{ border: "1px solid rgba(0,0,0,0.05)" }}
              autoFocus={field.name === "first_name"}
            />
          )}
          {formik.errors?.[field.name] && (
            <p className="mt-2 text-sm text-red">
              {formik.errors?.[field.name]}
            </p>
          )}
        </div>
      );
    });
  };
  return (
    <form noValidate className="w-full pt-8 flex flex-col">
      <p className="text-xl mb-5 px-10 nunito">Get Started</p>
      {displayFields()}
      <div className="mt-2 px-10">
        <Button onClick={formik.handleSubmit}>Signup</Button>
      </div>
      <div className="text-center bg-light-grey text-gray-700 flex justify-center mt-5 py-5">
        signup with{" "}
        <p className="cursor-pointer relative" style={{ left: "5px" }}>
          Google
        </p>
      </div>
    </form>
  );
};

export default Signup;

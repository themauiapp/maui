import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { signupSchema } from "../../schemas/auth";
import setCsrfCookie from "../../services/setCsrfCookie";
import { notifySuccess } from "../../services/notify";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";

const Signup = ({ setError }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      setCookie();
    },
  });

  useEffect(() => {
    const values = Object.values(formik.errors);
    setError(values.length > 0);
  }, [formik.errors, setError]);

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

  const setCookie = async () => {
    setLoading(true);

    try {
      const response = await setCsrfCookie();
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const displayFields = () => {
    const formFields = [...fields];
    return formFields.map((field, index) => {
      return (
        <div key={index} className="w-full px-10 mb-4 flex flex-col">
          <input
            id={field.name}
            className={`focus:outline-none ${
              field.name.includes("name") ? "capitalize" : ""
            } p-3 text-gray-700`}
            type={field.type}
            name={field.name}
            onChange={formik.handleChange}
            placeholder={
              field.name.replace(/_/, " ").charAt(0).toUpperCase() +
              field.name.replace(/_/, " ").slice(1)
            }
            style={{ border: "1px solid rgba(0,0,0,0.05)" }}
            autoFocus={field.name === "first_name"}
          />
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
      <p className="text-lg sm:text-xl mb-5 px-10 nunito">Get Started</p>
      {displayFields()}
      <div className="relative mt-2 mx-10">
        <Button onClick={formik.handleSubmit}>Signup</Button>
        <Loader display={loading} />
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

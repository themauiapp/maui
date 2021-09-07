import React, { useState, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { AuthHomeContext } from "../../contexts/AuthHomeContext";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { useFormik } from "formik";
import { profileSchema } from "../../schemas/user";
import { UPDATEUSER } from "../../graphql/user";
import { useMutation } from "@apollo/client";
import { parseFile } from "../../avatar";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import errorHandler from "../../utilities/errorHandler";
import { notifySuccess } from "../../services/notify";
import { setUserCookie } from "../../services/cookie";

const Profile = () => {
  const { changeUser } = useContext(AppContext);
  const { setDialogs, dialogs } = useContext(AuthHomeContext);
  const [updateUserMutation, { loading }] = useMutation(UPDATEUSER);
  const [avatar, setAvatar] = useState(null);
  const history = useHistory();
  const user = new Cookies().get("maui_user");
  const fields = ["first_name", "last_name", "email", "password"];
  const [first_name, last_name] = user.name.split(" ");
  const formik = useFormik({
    initialValues: { first_name, last_name, email: user.email, password: "" },
    validationSchema: profileSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      if (values.password === "") {
        delete values.password;
      } else {
        values["password_confirmation"] = values.password;
      }

      if (avatar) {
        values["avatar"] = avatar;
      }

      updateUser(values);
    },
  });

  const updateUser = async (variables) => {
    try {
      const response = await updateUserMutation({ variables });
      const data = response.data.updateUser;
      setUserCookie(data, changeUser);
      notifySuccess("Profile Updated Successfully");
    } catch (error) {
      errorHandler(error, history);
    }
  };

  const parseSelectedFile = (event) => {
    const file = event.target.files[0];
    if (parseFile(file)) {
      setAvatar(file);
    }
  };

  const displayFields = () => {
    return fields.map((field, index) => {
      const label = (field.charAt(0).toUpperCase() + field.slice(1)).replace(
        /_/g,
        " "
      );
      return (
        <div key={index} className="w-full mb-5 flex flex-col col-span-6">
          <p className="mb-2">
            {label}
            {field === "email" && (
              <i
                onClick={() => {
                  setDialogs({ ...dialogs, verifyResetEmail: true });
                }}
                className="relative ml-2 cursor-pointer text-sm text-revolver-purple fa fa-edit"
              ></i>
            )}
          </p>
          <input
            id={field}
            className="focus:outline-none border border-faint-rgba-black p-3 text-gray-900"
            type={field !== "password" ? "text" : "password"}
            name={field}
            value={formik.values[field]}
            onChange={formik.handleChange}
            placeholder={label}
            autoFocus={field === "first_name"}
            disabled={field === "email"}
          />
          {formik.errors?.[field] && (
            <p className="mt-2 text-sm text-red">{formik.errors?.[field]}</p>
          )}
        </div>
      );
    });
  };

  return (
    <div className="pb-10">
      <div className="flex flex-row items-end mb-8">
        <div className="w-32 h-32 rounded-full border-4 border-white shadow mr-5">
          <img
            src={
              user.avatar
                ? user.avatar.url
                : "/images/auth-home/DefaultAvatar.png"
            }
            className="maui-avatar w-full h-full object-cover rounded-full"
            alt={user.name}
          />
        </div>
        <p
          onClick={() => {
            document.getElementById("avatarInput").click();
          }}
          className="cursor-pointer underline"
        >
          Change Avatar
        </p>
        <input
          id="avatarInput"
          onChange={parseSelectedFile}
          type="file"
          className="hidden"
        />
      </div>
      <form
        noValidate
        onSubmit={formik.handleSubmit}
        className="p-8 bsm:p-12 mb-8 bg-white shadow grid grid-cols-12 col-gap-5"
      >
        {displayFields()}
        <div className="col-span-6"></div>
        <div className="col-span-6 mt-3 relative w-full">
          <Button submit={true}>Update Profile</Button>
          <Loader display={loading} />
        </div>
      </form>
      <div className="bg-white p-8 bsm:p-12 shadow flex justify-between">
        <p className="text-2xl font-semibold tracking-widest">
          {user.telegram_id}
        </p>
      </div>
    </div>
  );
};

export default Profile;

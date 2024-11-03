import React, { FC, useState } from "react";
import { ButtonWrapper } from "../../components/base/button/Button";

interface CheckBoxes {
  trigger: boolean;
  checkboxes: {
    checkbox1: boolean;
    checkbox2: boolean;
    checkbox3: boolean;
  };
}

interface SignUp {
  email: string;
  password: string;
}

const MainContainer: FC = () => {
  const [formData, setFormData] = useState<SignUp>({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [checkBoxTrigger, setCheckBoxTrigger] = useState<CheckBoxes>({
    trigger: false,
    checkboxes: { checkbox1: false, checkbox2: false, checkbox3: false },
  });
  const numberPattern = /\d/;
  const symbolPattern = /[!@#$%^&*(),.?":{}|<>]/;
  const capitalLetterPattern = /[A-Z]/;

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key == " ") {
      e.preventDefault();
    }
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === "email" && !value.includes("@")) {
      setError("Not a valid Email!");
      setFormData((prevData) => ({
        ...prevData,
        email: e.target.value,
      }));
    } else if (name === "email" && value.includes("@")) {
      setError("");
      setFormData((prevData) => ({
        ...prevData,
        email: e.target.value,
      }));
    }
    if (name == "password") {
      const checkboxes = {
        checkbox1: value.length >= 8,
        checkbox2: capitalLetterPattern.test(value),
        checkbox3: numberPattern.test(value) || symbolPattern.test(value),
      };
      setCheckBoxTrigger((prevData) => ({
        ...prevData,
        trigger: value.length > 0,
        checkboxes,
      }));
      setFormData((prevData) => ({
        ...prevData,
        password: e.target.value,
      }));
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length > 0) return;
    const val =
      checkBoxTrigger.checkboxes.checkbox1 ||
      checkBoxTrigger.checkboxes.checkbox2 ||
      checkBoxTrigger.checkboxes.checkbox3;
    setCheckBoxTrigger((prevData) => ({
      ...prevData,
      trigger: val,
    }));
  };

  const disableButton: boolean =
    !checkBoxTrigger.checkboxes.checkbox1 ||
    !checkBoxTrigger.checkboxes.checkbox2 ||
    !checkBoxTrigger.checkboxes.checkbox3 ||
    error !== "" ||
    formData.email === "" ||
    formData.password === "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const checkboxes = {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
    };
    setCheckBoxTrigger((prevData) => ({
      ...prevData,
      trigger: false,
      checkboxes,
    }));
    setFormData((prevData) => ({
      ...prevData,
      email: "",
      password: "",
    }));
  };
  return (
    <div className="flex-grow h-full mt-2 flex flex-col justify-center items-center tracking-tighter">
      <form
        className="w-full md:w-auto px-10 flex flex-col justify-center items-center tracking-tighter gap-y-9"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Let's get your account set up
        </h1>
        <div className="w-full flex flex-col tracking-normal">
          <div className="mb-3 flex flex-col gap-1">
            <label
              htmlFor="email"
              className="block text-sm text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              className="block w-full px-4 py-3 text-sm text-gray-900 border border-gray-400 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="john.doe@company.com"
              onKeyDown={handleKeyPress}
              onChange={handleOnchange}
              required
            />
            <p className="text-xs text-red-700 font-semibold">{error}</p>
          </div>
          <div className="mb-3 flex flex-col gap-1">
            <label
              htmlFor="password"
              className="block text-sm text-gray-900 dark:text-white"
            >
              Create a Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="block w-full px-4 py-3 text-sm text-gray-900 border border-gray-400 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="•••••••••"
              value={formData.password}
              onKeyDown={handleKeyPress}
              onChange={handleOnchange}
              onFocus={() =>
                setCheckBoxTrigger((prevData) => ({
                  ...prevData,
                  trigger: true,
                }))
              }
              onBlur={handleBlur}
              required
            />
          </div>
          {checkBoxTrigger.trigger && (
            <div className="flex flex-col gap-1 mb-3 tracking-tighter">
              <div className="flex items-center">
                <input
                  checked={checkBoxTrigger.checkboxes.checkbox1}
                  disabled
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded-full  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 text-sm text-gray-600 dark:text-gray-300"
                >
                  At least 8 characters long
                </label>
              </div>
              <div className="flex items-center">
                <input
                  checked={checkBoxTrigger.checkboxes.checkbox2}
                  disabled
                  id="default-checkbox1"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded-full  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-checkbox1"
                  className="ms-2 text-sm text-gray-600 dark:text-gray-300"
                >
                  Contains 1 uppercase character
                </label>
              </div>
              <div className="flex items-center">
                <input
                  checked={checkBoxTrigger.checkboxes.checkbox3}
                  disabled
                  id="default-checkbox2"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded-full  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-checkbox2"
                  className="ms-2 text-sm text-gray-600 dark:text-gray-300"
                >
                  Contains 1 number or symbol
                </label>
              </div>
            </div>
          )}
          <div>
            <ButtonWrapper
              type="submit"
              size="lg"
              color="primary"
              disabled={disableButton}
            >
              Sign Up
            </ButtonWrapper>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center tracking-normal">
          <p className="text-xs text-gray-500 ">
            By proceeding, you agree to{" "}
            <a className="text-blue-700 underline">Our Terms of Service</a>
          </p>
          <hr className="border border-t-0 border-gray-500 w-full" />
          <p className="text-sm">
            Already have an account? <a className="underline">Log in instead</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default MainContainer;
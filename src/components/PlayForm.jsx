import unity from "../assets/unity.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PlayForm = () => {
  const {
    register,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem("username", data.name);
    navigate("/game");
  };

  const checkForUserName = () => {
    const userName = localStorage.getItem("username");
    if (userName) {
      setValue("name", userName);
    }
  };

  useEffect(() => {
    checkForUserName();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-4 flex flex-col justify-center"
    >
      <div>
        <label
          htmlFor="name"
          className={errors.name ? styles.label.error : styles.label.normal}
        >
          Name
        </label>
        <input
          {...register("name", {required: true})}
          aria-invalid={errors.name ? "true" : "false"}
          className={errors.name ? styles.input.error : styles.input.normal}
        />
        {errors.name?.type === "required" && (
          <p
            role="alert"
            className="mt-2 text-center text-sm text-red-600 dark:text-red-500"
          >
            Please enter your name to play
          </p>
        )}
      </div>
      <div className="mt-5 flex justify-center">
        <button
          type="submit"
          className="inline-flex items-center rounded-lg bg-gray-100 px-5 py-2.5 text-center text-base font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-500"
        >
          <img src={unity} alt="unity icon" className="mr-2 -ml-1 h-5 w-5"/>
          Play
        </button>
      </div>
    </form>
  );
};

const styles = {
  label: {
    normal: "block mb-2 text-sm font-medium text-gray-300 text-center",
    error:
      "block mb-2 text-sm font-medium text-red-700 dark:text-red-500 text-center",
  },
  input: {
    normal:
      "text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    error:
      "text-center bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400",
  },
};

export default PlayForm;

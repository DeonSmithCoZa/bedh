import clsx from "clsx";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { isEmpty } from "lodash";

const Input: React.FC<{
  label: string;
  id: string;
  source: string;
  placeholder: string;
  options?: RegisterOptions;
}> = ({ label, id, source, placeholder, options }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = !isEmpty(errors?.[source]);

  return (
    <>
      <div className="mt-4">
        <label
          className={clsx(
            "block mb-2 text-sm font-medium",
            hasError && "text-red-500 dark:text-red-500",
            !hasError && "text-gray-900 dark:text-white"
          )}
        >
          {label}
        </label>
        <input
          type="text"
          id={id}
          className={clsx(
            "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border dark:bg-gray-600 dark:text-white",
            hasError &&
              "border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500 placeholder-red-500 dark:placeholder-red-500",
            !hasError &&
              "focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 border-gray-300 dark:placeholder-gray-400 "
          )}
          placeholder={errors?.[source]?.message?.toString() ?? placeholder}
          {...register(source, options)}
        />
      </div>
    </>
  );
};

export default Input;

import clsx from "clsx";
import { useFormContext } from "react-hook-form";

const TextArea: React.FC<{
  label: string;
  id: string;
  source: string;
  placeholder: string;
}> = ({ label, id, source, placeholder }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = errors[source];

  return (
    <>
      <div className="mt-4">
        <label
          className={clsx(
            "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
            hasError && "text-red-500 dark:text-red-500"
          )}
        >
          {label}
        </label>
        <textarea
          id={id}
          rows={8}
          className={clsx(
            "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            hasError &&
              "border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500"
          )}
          placeholder={placeholder}
          {...register(source, {
            required: {
              value: true,
              message: "Please provide at least 1 name",
            },
          })}
        ></textarea>
      </div>
    </>
  );
};

export default TextArea;

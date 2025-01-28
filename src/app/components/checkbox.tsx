import { useFormContext } from "react-hook-form";

const CheckBox: React.FC<{
  label: string;
  id: string;
  source: string;
}> = ({ label, id, source }) => {
  const { register } = useFormContext();

  return (
    <div className="flex items-center gap-1 justify-end mt-4">
      <input
        type="checkbox"
        className="checkbox checkbox-info"
        id={id}
        {...register(source)}
      />
      <label htmlFor={id} className="label label-text text-base">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;

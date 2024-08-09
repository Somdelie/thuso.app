const TextInput = ({ label, register, name, errors, type = "text" }) => {
  return (
    <div>
      <div className="mb-4">
        <label
          className="block text-gray-500 text-sm font-bold mb-2"
          htmlFor={`${name}`}
        >
          {label}
        </label>
        <input
          {...register(`${name}`, { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
          id={`${name}`}
          name={`${name}`}
          type={type}
        />
        {/* errors will return when field validation fails  */}
        {errors[`${name}`] && (
          <span className="text-red-600 text-sm">{label} is required</span>
        )}
      </div>
    </div>
  );
};

export default TextInput;

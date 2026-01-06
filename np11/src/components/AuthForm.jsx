export default function AuthForm({
  title,
  fields,
  onSubmit,
  submitText,
}) {
  return (
    <div>
      <h2>{title}</h2>

      {fields.map((field) => (
        <input
          key={field.name}
          type={field.type || "text"}
          placeholder={field.placeholder}
          value={field.value}
          onChange={field.onChange}
        />
      ))}

      <button onClick={onSubmit}>{submitText}</button>
    </div>
  );
}

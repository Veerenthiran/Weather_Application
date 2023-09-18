function FormRowlogin({ label, children, error }) {
  return (
    <div className="flex flex-col gap-0.2 py-0 mb-0 text-sm justify-center text-black">
      {label && <label htmlFor={children.props.id}>{label}</label>}
      {children}
      {error && <div className="text-xs text-red  ">{error}</div>}
    </div>
  );
}

export default FormRowlogin;

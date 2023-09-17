
function FormRowVertical({ label,children,error }) {
  return (
    <div className="flex flex-col gap-0.5 py-0 mb-5 text-sm justify-center  ">
      {label && <label htmlFor={children.props.id}>{label}</label>}
      {children}
      {error && <div className="text-xs text-red  ">{error}</div>}
    </div>
  );
}

export default FormRowVertical;

function FormRowButton({ label,children,error }) {
    return (
      <div className="flex flex-row gap-10 mt-4  text-sm justify-center  ">
        {label && <label htmlFor={children.props.id}>{label}</label>}
        {children}
        {error && <div className="text-lg text-red ">{error}</div>}
      
      </div>
    );
  }
  
  export default FormRowButton;
import PropTypes from "prop-types";

function CustomField({ label, value, className }) {
  const classNames = {
    container: className,
    label: "font-bold text-black mb-1",
    valueContainer: "font-light",
    valueSpan:
      "inline-block p-2 rounded-lg border bg-white shadow-lg transition-colors duration-300 hover:bg-primary3 hover:bg-opacity-80",
  };

  return (
    <div className={`mt-4 grid gap-2 ${classNames.container}`}>
      <div className={classNames.label}>{label}</div>
      <div className={classNames.valueContainer}>
        <span className={classNames.valueSpan}>{value}</span>
      </div>
    </div>
  );
}

CustomField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
};

export default CustomField;

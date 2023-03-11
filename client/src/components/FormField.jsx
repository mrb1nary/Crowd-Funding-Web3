import React from "react";

function FormField({
  labelName,
  placeholder,
  inputType,
  value,
  handleChange,
  isTextArea,
}) {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="text-[#808191] text-[14px] font-medium leading-[22px] mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent text-white text-[14px] placeholder:text-[#465264]"
        />
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent text-white text-[14px] placeholder:text-[#465264]"
        />
      )}
    </label>
  );
}

export default FormField;

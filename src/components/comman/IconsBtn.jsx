// import React from "react";

// const IconsBtn = ({
//   text,
//   onclick,
//   children,
//   disabled,
//   outline,
//   customClasses,
//   type,
// }) => {
//   return (
//     <button
//       onClick={onclick}
//       disabled={disabled}
//       type={type}
//       className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${outline ? "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100" : "bg-blue-500 text-white hover:bg-blue-600"} ${customClasses}`}
//     >
//       {children ? (
//         <>
//           <span>{text}</span>
//           {children}
//         </>
//       ) : (
//         { text }
//       )}
//     </button>
//   );
// };

// export default IconsBtn;



import React from "react";

const IconsBtn = ({
  text,
  onclick,
  children,
  disabled,
  outline,
  customClasses,
  type,
}) => {
  return (
    <button
      onClick={onclick}
      disabled={disabled}
      type={type}
      className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
        outline
          ? "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100"
          : "bg-blue-500 text-white hover:bg-blue-600"
      } ${customClasses}`}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default IconsBtn;
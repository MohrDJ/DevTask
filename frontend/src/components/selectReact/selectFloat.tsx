// import React, { useState } from 'react';
// import  { CustomSelect,CustomOption } from './constructor';


// interface FloatingLabelSelectProps {
//     label: string;
//     name: string;
//     options: CustomOption[];
//     value: any;
//     onChange: any;
//     isSearchable: boolean;
//     styles: any;
//     placeholder: string;
// }

// const FloatingLabelSelect: React.FC<FloatingLabelSelectProps> = ({
//     label,
//     name,
//     options,
//     value,
//     onChange,
//     isSearchable,
//     styles,
//     placeholder,
// }) => {
//     const [isActive, setIsActive] = useState(!!value);

//     const handleFocus = () => {
//         setIsActive(true);
//     };

//     const handleBlur = () => {
//         if (!value) {
//             setIsActive(false);
//         }
//     };

//     return (
//         <div className={`floating-label-input ${isActive ? 'active' : ''}`}>
//             <label htmlFor={name} className={`block font-bold text-white-900 transition-transform ${isActive || value ? '-translate-y-5 text-xs text-gray-400' : ''} absolute left-4 top-1/2 transform -translate-y-2/4 ${isActive || value ? 'active' : ''}`}>
//                 {label}
//             </label>
//             <CustomSelect
//                 id={name}
//                 options={options}
//                 value={value}
//                 onChange={onChange}
//                 isSearchable={isSearchable}
//                 styles={{
//                     ...styles,
                   
//                 }}
//                 placeholder={placeholder}
//                 name={name}
//                 label={label}
//             />
//         </div>
//     );
// };

// export default FloatingLabelSelect;

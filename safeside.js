// const [inputType, setInputType] = useState('text');
// const [placeholder, setPlaceholder] = useState('');
// const inputStyles = 'bg-inherit outline-0 mx-2 p-2 w-64 text-sm';
// const fieldsetStyles = 'border border-gray-400 text-left rounded-lg flex justify-center items-center';
// const legendStyles = 'mx-4 text-md font-light px-2';
// const buttonStyles = 'border w-24 border-cyan-600 outline-none rounded-lg p-[4px] transition duration-300 hover:outline-none hover:border-cyan-600 hover:bg-cyan-600 hover:text-white';
// const types = (type, val) => {
//   if (type === 'Email') setEmail(val)
//   else if (type === 'Firstname') setFirst(val)
//   else if (type === 'Lastname') setLast(val)
//   else if (type === 'Password') setPassword(val)
//   else if (type === 'Phone') setPhone(val)
//   else if (type === 'Company') setCompany(val)
//   else if (type === 'employeeid') setEmployeeid(val)
//   else setComment(val)
// }
// const fields = [
//   {name: "Email", type:"email", placeholder: "Enter your email address", value: email},
//   {name: "Firstname", type:"text", placeholder: "Enter your firstname", value: first},
//   {name: "Lastname", type:"text", placeholder: "Enter your lastname", value: last},
//   {name: "Password", type:"password", placeholder: "Enter your password", value: password},
//   {name: "Phone", type:"text", placeholder: "Enter your phone number", value: phone},
//   {name: "Company", type:"text", placeholder: "Enter your company", value: company},
//   {name: "Employee ID", type:"text", placeholder: "Enter your Employee ID", value: company},
//   {name: "Comment", type:"text", placeholder: "Write a comment for your request", value: comment}
// ]
//   return (
//     <>
//       <p className='text-[1.8rem] font-light py-4'>Registration</p>
//       {/* Looping through errors */}
//       {keys.map((key, index) => (
//         errorField[key] ? <li className='text-[0.8rem] text-red-600' key={index}>{errorField[key]}</li> : ''
//       ))}
//       <div className='flex flex-col justify-right items-center w-full h-full space-y-2 mt-2'>
//         {first}
//         {
//           fields.map((obj) => {
//             return (
//               <fieldset className={`${fieldsetStyles}`}>
//                   <legend className={`${legendStyles}`}>{obj.name}</legend>
//                   <input 
//                   className={`${inputStyles}`}
//                   type={obj.type}
//                   placeholder={obj.placeholder}
//                   value={obj.value}
//                   onChange = {(e) => types(obj.name, e.target.value)} required />
//               </fieldset>
//             )})
//         }
//           <button type='submit' 
//           onClick={(e) => handleSubmit(e)} 
//             className={`${buttonStyles}`}>Next <i className='fa fa-angle-right text-lg'></i></button>
//       </div>
//     </> 
// )
// }

            {/* <fieldset className={`${fieldsetStyles}`}>
                <legend className={`${legendStyles}`}>Phone</legend>
                <input 
                className={`${inputStyles}`}
                type="text"
                placeholder='012-345-6789'
                value={phone}
                onChange = {(e) => setPhone(e.target.value)} required />
            </fieldset> */}
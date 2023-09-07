import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../store/constants";
import { get_user_for_an_expense, update_status } from "../features/services/apicalls";
import { selectActiveUserID, selectUsername, selectUserRole, setUserRole } from "../users/store/slice";
import Message  from './Message';

export const DisplayImage = ({images}) => {
    const [current, setCurrent] = useState(0);
    const length = images.length;
    const buttonStyle = 'invisible group-hover/image:visible absolute top-[50%] text-lg font-bold bg-opacity-80 bg-gray-300 p-[5px]'
  
    const nextSlide = () => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    };
  
    const prevSlide = () => {
      setCurrent(current === 0 ? length - 1 : current - 1);
    };
  
    if (!Array.isArray(images) || images.length <= 0) {
      return <div>No images to display</div>;
    }
  
    return (
      <section className='group/image relative flex flex-col justify-center items-center'>
        {images.map((image, index) => {
          return (
            <div key={index} 
            className={`${index === current ? 'opacity-1' : 'opacity-0'} transition duration-700 ease-in-out w-full flex flex-col justify-between items-center`}>
              {index === current && (
                <img src={`${API_URL}${image.image}`} alt={image.image} className='object-contain h-80 w-96 m-auto' ></img>
              )}
              {image.name && <p>{image.name}</p>}
            </div>
          );
        })}
          <button className={`${buttonStyle} left-[1%]`} onClick={prevSlide}><i className="fa fa-angle-left"></i></button>
          <button className={`${buttonStyle} right-[1%]`} onClick={nextSlide}><i className="fa fa-angle-right"></i></button>
      </section>
    );
  };

export const DisplayContent = ({idx, content, type}) => {
    const {id, name, amount, submitted_date, status} = content;
    const userid = useSelector(selectActiveUserID);
    const userRole = useSelector(selectUserRole);
    const [succussMsg, setSuccussMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    setTimeout(() => {
      setSuccussMsg('');
      setErrorMsg('');
  }, 2500);

    const updateStatus = (data) => {

      update_status(data)
      .then(() => {
        // delete from the view
        setSuccussMsg('Updated succussfully')
      })
      .catch(() => {
        setErrorMsg('Update failed!')
      })
    }

    return (
        <div className="flex flex-col">
          <Message msg={succussMsg} type="succuss" />
          <Message msg={errorMsg} type="error" />
            <div className="w-full px-2 flex flex-row justify-between items-center">
                <span className="flex justify-center items-center space-x-2">
                    <span className="w-6  font-light text-gray-600 text-[1rem]"><i className='fa fa-plus'></i></span>
                    {/* <span className="w-6 text-xl font-normal">{idx}</span> */}
                    <span className="w-44 text-xl font-semibold px-2">{name}</span>
                </span>
                <span className="text-lg font-light">{submitted_date}</span>
                <span className="text-lg font-bold">{amount}$</span>
                   
                {
                type === 'myexpenses' ? 
                <span className="">
                  {status === '1' && <span className="text-green-700 font-bold">Approved</span>}
                  {status === '2' && <span className="text-red-600 font-bold">Rejected</span>}
                  {status === '3' && <span className="text-red-600 font-bold">Pending</span>}
                 </span> 
                : 
                  <div className="w-48 py-2 flex justify-center items-center space-x-2">
                    <button type="button" onClick={() => updateStatus({"change":'accept', "id": id, "userid": userid})} className="text-lg p-2 w-20 h-10 bg-green-200 flex justify-center items-center rounded-lg border-none">Approve</button>
                    <button type="button" onClick={() => updateStatus({"change":'reject', "id": id, "userid": userid})} className="text-lg p-2 w-20 h-10 bg-red-200 flex justify-center items-center rounded-lg border-none">Reject</button>
                  </div>
                }
            </div>
        </div>
    )
} 

export const ExpenseHeader = ({text}) => {
  return (
    <span className="w-full text-center p-2 text-3xl font-semibold">{text}</span>
  )
}

export const Display = ({obj, idx, type}) => {
    const tags = obj.tag_expense;
    const images = obj.proof_expense;

    const [detailed, setDetailed] = useState(false);
    const [username, setUsername] = useState('');
    const [company, setCompany] = useState('');
    const [empid, setempid] = useState('');
    const [role, setrole] = useState('');
    const [image, setimage] = useState('');

    const [succussMsg, setSuccussMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const tagStyles = 'py-[5px] px-2 m-2 text-md font-normal rounded-lg shadow-md bg-stone-100'
    setTimeout(() => {
        setSuccussMsg('');
        setErrorMsg('');
    }, 3000);

    useEffect(() => {
      get_user_for_an_expense(obj.id)
      .then((res) => {setUsername(res.data.fullname); setCompany(res.data.company.name); setrole(res.data.role); setimage(res.data.image);})
    }, [obj])

    return (
          <div className=" p-2 w-full h-fit flex flex-col justify-start shadow-md rounded-lg my-2 bg-red-200">
            <div className="w-full">
                <div className="">
                    <DisplayContent idx={idx} content={obj} type={type}/>
                </div>
                {/* <div>
                    {detailed && 
                    <div className="w-full border-t-2 mt-2">
                        <DisplayImage images={images}/>
                    </div>
                    }
                </div>
                <div className="list-none w-[80%] flex flex-row justify-left space-x-4 items-center">
                    {tags.length ? <><b>Tags:</b> {tags.map((tag, idx) => <li className={`${tagStyles}`} key={idx}>{tag.name}</li>)}</> : <></>}
                </div>
              <span className="text-lg font-light">{obj.description}</span>
                <div className="flex flex-row justify-between items-center">
                   <span className="font-light text-sm flex justify-center items-center">
                      <img src={`${API_URL}${image}`} alt="preview" className='object-contain w-10 h-10 rounded-full mx-2'></img> 
                      <span className=''> {username} | {company} | {role}</span>
                    </span>
                    <button onClick={() => setDetailed((prev) => !prev)} className="w-[10%] flex justify-center items-center space-x-4 rounded-lg bg-stone-100 text-md font-normal text-stone-900">{detailed ? 'Hide ' : 'View more '}{detailed ? <i className="fa fa-caret-up text-xl"></i> : <i className="fa fa-caret-down text-xl"></i>}</button>
                </div> */}
              </div>
          </div>
    )
}



// const ExpenseRequests = () => {
//     const navigate = useNavigate();
//     const {userid} = useParams();
//     const [expenseinfo, setExpenseinfo] = useState([]);
//     const userRole = useSelector(selectUserRole);
//     useEffect(() => {
//         get_expenses()
//         .then((res) => setExpenseinfo(res.data))
//         .catch((err) => {console.log(err.status);}) // if status === 401; logout the user})
//     }, [userid])
//     return (
//             <div className='flex flex-col h-screen overflow-scroll overflow-x-hidden'>
//                 {!Array.from(expenseinfo).length && <div>No expenses yet</div>}
//                 {Array.from(expenseinfo).map((expobj, idx) => <Display key={idx} idx={idx+1} obj={expobj}></Display>)}
//             </div>
//         )

// }
// export default ExpenseRequests;
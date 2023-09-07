import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../store/constants";
import Message from "../basepages/Message";
import { selectUsername, selectUserRole } from "../users/store/slice";
import { get_expenses, get_expenses_by_user, submit_expense } from "./services/apicalls";

import { Display, ExpenseHeader } from "../basepages/BaseExpenses";

const MyExpenses = () => {
    const navigate = useNavigate();
    const {userid} = useParams();
    const [expenseinfo, setExpenseinfo] = useState([]);
    const userRole = useSelector(selectUserRole);
    useEffect(() => {
        get_expenses_by_user()
        .then((res) => setExpenseinfo(res.data))
        .catch((err) => {console.log(err.status);}) // if status === 401; logout the user})
    }, [userid])
    return (
        <>
            <div className="w-full flex justify-center items-center"><ExpenseHeader text="My Expenses" /></div>
            <div className='flex flex-col h-screen overflow-scroll overflow-x-hidden'>
                {/* {Array.from(expenseinfo).map((obj, idx) => <li key={idx} >{obj.name}</li>)} */}

                {!Array.from(expenseinfo).length && <div>No expenses yet</div>}
                {Array.from(expenseinfo).map((expobj, idx) => (
                <>
                    {/* <>Display expenses based on userid; USE REDIS FOR CACHING</> */}
                    <Display key={idx} idx={idx+10} obj={expobj} type="myexpenses"></Display>
                </>
                ))}
                {/* {expenseinfo} */}
            </div>
        </>
        )

}
export default MyExpenses;
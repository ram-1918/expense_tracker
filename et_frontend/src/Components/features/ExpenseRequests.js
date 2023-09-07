import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";
import { selectUsername, selectUserRole } from "../users/store/slice";
import { get_expenses } from "./services/apicalls";
import { Display, ExpenseHeader } from "../basepages/BaseExpenses";

const ExpenseRequests = () => {
    const navigate = useNavigate();
    const {userid} = useParams();
    const [expenseinfo, setExpenseinfo] = useState([]);
    const userRole = useSelector(selectUserRole);
    useEffect(() => {
        get_expenses()
        .then((res) => setExpenseinfo(res.data))
        .catch((err) => {console.log(err.status);})
    }, [userid])
    return (
        <>
            <div className="w-full flex justify-center items-center"><ExpenseHeader text="Expense Requests" /></div>
            <div className='flex flex-col h-screen overflow-scroll overflow-x-hidden'>
                {!Array.from(expenseinfo).length && <div>No expenses yet</div>}
                {Array.from(expenseinfo).map((expobj, idx) => <Display key={idx} idx={idx+1} obj={expobj} type="expenserequests"></Display>)}
            </div>
        </>
        )

}
export default ExpenseRequests;
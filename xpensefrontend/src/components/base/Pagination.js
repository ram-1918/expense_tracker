import React from 'react'

const pagenoStyle = 'border border-slate-100 rounded-full shadow-lg w-6 h-6 flex-row-style justify-center bg-slate-100 cursor-pointer hover:scale-[1.2] hover:bg-slate-200';
const pageOptionStye = '';

const Pagination = ({ setPageNumber, setPageLimit }) => {
  return (
    <div className="w-full border-0 flex-row-style justify-center p-2">
        <div className="w-56 flex-row-style justify-around p-2">
            <span className={`${pagenoStyle}`}><i className="fa fa-angle-double-left"></i></span>
            {[1,2,3,4,5].map(
                (obj, idx) => <span onClick={() => {setPageNumber(obj)}} className={`${pagenoStyle}`} key={idx}>{obj}</span>)
            }
            <span className={`${pagenoStyle}`}><i className="fa fa-angle-double-right"></i></span>
        </div> 
        <div>
        <select onChange={(e) => {setPageLimit(e.target.value)}} className="border-0 rounded-full shadow-lg w-12 bg-slate-100 focus:outline-none">
            {[5,10,15,20].map(
                (obj, idx) => <option className={`${pageOptionStye}`} key={idx}>{obj}</option>)
            }
        </select>
        <span> per page</span>
        </div>
    </div>
  )
}

export default Pagination;
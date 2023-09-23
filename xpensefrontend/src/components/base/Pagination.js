
const outerdiv = "w-full border-0 flex-row-style justify-center p-2";
const innerdiv_1 = "w-56 flex-row-style justify-around p-2";
const innerdiv_2_1 = "border-0 rounded-full shadow-lg w-12 ml-4 bg-slate-100 focus:outline-none"
const pagenoStyle = 'border border-slate-100 rounded-full shadow-lg w-6 h-6 flex-row-style justify-center bg-slate-100 cursor-pointer hover:scale-[1.2] hover:bg-slate-200';
const pageOptionStye = '';

const Pagination = ({ setPageNumber, setPageLimit }) => {
    const direction = (option) => <span className={`${pagenoStyle}`}><i className={`fa fa-angle-double-${option}`}></i></span>;
    const numbers = [1,2,3,4,5].map((obj, idx) => <span onClick={() => {setPageNumber(obj)}} className={`${pagenoStyle}`} key={idx}>{obj}</span>);
    const numberoptions = [5,10,15,20].map((obj, idx) => <option className={`${pageOptionStye}`} key={idx}>{obj}</option>); 
  return (
    <div className={outerdiv}>
        <div className={innerdiv_1}>
            {direction('left')}
            {numbers}
            {direction('right')}
        </div> 
        <div>
            <select onChange={(e) => {setPageLimit(e.target.value)}} className={innerdiv_2_1}> {numberoptions} </select>
            <span> per page</span>
        </div>
    </div>
  )
}

export default Pagination;
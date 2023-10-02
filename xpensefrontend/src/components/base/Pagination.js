
const outerdiv = "w-full border-0 flex-row-style justify-center p-2";
const innerdiv_1 = "w-56 border-0 flex-row-style justify-around -space-x-10 p-2";
const innerdiv_2_1 = "border rounded-full shadow-md w-16 h-8 px-2 ml-4 focus:outline-none"
const pagenoStyle = 'border border-slate-200 rounded-full shadow-md w-6 h-6 flex-row-style justify-center cursor-pointer hover:scale-[1.2] hover:bg-slate-100';
const pageOptionStye = '';
const activeStyles = 'scale-[1.2] bg-white';

const Pagination = ({ pageLimit, pageNumber, setPageNumber, setPageSize, pageSize }) => {
    const pagenumbers = [];
    let i = 1;
    const showPagenumbers = pageLimit > 3 ? 3 : pageLimit
    while(i <= showPagenumbers){
      pagenumbers.push(i);
      i++;
    }
    const moveLeft = (
    <span className={`${pagenoStyle}`} onClick={() => setPageNumber(prev => prev > 1 ? prev - 1 : prev)}>
      <i className={`fa fa-angle-double-left`}></i>
    </span>);
    const moveRight = (
      <span className={`${pagenoStyle}`} onClick={() => setPageNumber(prev => prev < pageLimit ? prev + 1 : prev)}>
        <i className={`fa fa-angle-double-right`}></i>
      </span>);
    const numbers = pagenumbers.map((obj, idx) => <span onClick={() => {setPageNumber(obj)}} className={`${pagenoStyle} ${pageNumber === obj && activeStyles}`} key={idx}>{obj}</span>);
    const numberoptions = [1,2,5,10,15,20].map((obj, idx) => <option className={`${pageOptionStye}`} key={idx}>{obj}</option>); 
    const handlePageSize = (e) => {
      setPageSize(e.target.value);
    }
  return (
    <div className={outerdiv}>
        <div className={innerdiv_1}>
            {pageNumber > 1 && moveLeft}
            {numbers}
            {pageNumber !== pageLimit && moveRight}
        </div> 
        <div>
            <select onChange={(e) => {handlePageSize(e)}} className={innerdiv_2_1}> 
              <option default hidden>{pageSize}</option>
              {numberoptions}
             </select>
            <span> per page</span>
        </div>
    </div>
  )
}

export default Pagination;
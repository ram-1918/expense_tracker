
const outerdiv = "w-full border-0 flex-row-style justify-end space-x-6 text-sm";
const innerdiv_1 = " border-0 flex-row-style justify-around space-x-2 ";
const innerdiv_2_1 = "border border-slate-400 rounded shadow-md w-12 h-6 ml-4 focus:outline-none"
const pagenoStyle = 'border border-slate-400 rounded shadow-md w-6 h-6 flex-row-style justify-center cursor-pointer hover:bg-slate-100';

const Pagination = ({args: { pageLimit, pageNumber, setPageNumber, setPageSize, pageSize }}) => {
  const numberoptions = [1,2,5,10,15,20].map((obj, idx) => <option className={``} key={idx}>{obj}</option>); 
  const moveLeft = (
    <span className={`${pagenoStyle}`} onClick={() => setPageNumber(prev => prev > 1 ? prev - 1 : prev)}>
      <i className={`fa fa-angle-left`}></i>
    </span>
    );

  const moveRight = (
    <span className={`${pagenoStyle}`} onClick={() => setPageNumber(prev => prev < pageLimit ? prev + 1 : prev)}>
      <i className={`fa fa-angle-right`}></i>
    </span>
    );
  
  const handlePageSize = (e) => setPageSize(e.target.value);
  const handlePageNumber = (e) => (e.target.value > pageLimit) ?  setPageNumber(pageLimit): setPageNumber(e.target.value);
  
  const numbers = (
    <span>
      <input type="number" className="border border-slate-300 w-8 h-6 text-center outline-none" value={pageNumber} onChange={(e) => {handlePageNumber(e)}} /> of {pageLimit}
    </span>
    )
  
  
  return (
    <div className={outerdiv}>
      <div>
          <select onChange={(e) => {handlePageSize(e)}} className={innerdiv_2_1}> 
            <option default hidden>{pageSize}</option>
            {numberoptions}
            </select>
          <span> per page</span>
      </div>
      <div className={innerdiv_1}>
          {moveLeft}
          {numbers}
          {moveRight}
      </div> 
    </div>
  )
}

export default Pagination;
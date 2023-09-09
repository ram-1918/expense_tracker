// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from '@fortawesome/free-solid-svg-icons';

function Filters({keys}) {
  const eachFilter = 'p-2';
  const filterStyle = `border border-slate-400 min-w-fit rounded-xl flex-row-style justify-center uppercase text-sm font-normal p-2`;

    return (
      <div className="border-b border-slate-200 w-full h-[15%] flex-row-style justify-start flex-wrap px-4 space-x-2 overflow-y-scroll">
          <FontAwesomeIcon icon={faFilter} /> <span className="text-sm">Filter By</span> {keys.map((obj, idx) => <span className={filterStyle} key={idx}>{obj} <i className='fa fa-caret-down px-[4px]'></i></span>)}
      </div>
    );
  }
  
  export default Filters;
  
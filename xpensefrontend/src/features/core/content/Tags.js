// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]

import { useState } from "react";

const tagStyle = 'border rounded-lg bg-gray-50 px-[5px] text-sm cursor-pointer hover:bg-gray-200 ';
const tagSearch = `border-b w-full px-2 bg-inherit outline-none text-md placeholder:text-sm mb-4`;

function Tags({tags, type}) {
  const [tagValue, setTagValue] = useState('');
  const tagData = [];
  

  const expensetags = [
    'Appliances', 'Bags', 'Board', 'Computers', 'Chairs', 'Duster', 
    'Echo dot', 'Fridge', 'Food', 'Tripods', 'Laptop', 'Markers', 'Pens', 'Speaker', 'Walmart',
    'Echo dot', 'Fridge', 'Food', 'Tripods', 'Laptop', 'Markers', 'Pens', 'Speaker', 'Walmart',
    'Echo dot', 'Fridge', 'Food', 'Tripods', 'Laptop', 'Markers', 'Pens', 'Speaker', 'Walmart',
    'Echo dot', 'Fridge', 'Food', 'Tripods', 'Laptop', 'Markers', 'Pens', 'Speaker', 'Walmart',
    'Echo dot', 'Fridge', 'Food', 'Tripods', 'Laptop', 'Markers', 'Pens', 'Speaker', 'Walmart',
  ]
  // tag priority based on the count of the times it is called or used - priority queue
  const usertags = [
    'admin', 'superadmin', 'company', 'age','custom factor', 'like "srinivas"',
    'admin', 'superadmin', 'company', 'age','custom factor', 'like "srinivas"',
    'admin', 'superadmin', 'company', 'age','custom factor', 'like "srinivas"',
    'admin', 'superadmin', 'company', 'age','custom factor', 'like "srinivas"',
    'admin', 'superadmin', 'company', 'age','custom factor', 'like "srinivas"',
]

    return (
      <div className="w-full flex-col-style justify-start">
        <input 
        className={tagSearch} 
        placeholder='Search tags...' 
        type="text" 
        onChange={(e) => setTagValue(e.target.value)} />
        <div className="w-full h-full flex-row-style flex-wrap space-x-4 space-y-2">
          {type === 'users' && usertags.map((obj, idx) => <span className={tagStyle} key={idx}>{obj}</span>)}
          {type === 'expenses' && expensetags.map((obj, idx) => <span className={tagStyle} key={idx}>{obj}</span>)}
        </div>
      </div>
    );
  }
  
  export default Tags;
  
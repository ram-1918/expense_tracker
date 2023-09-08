// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]

import { useState } from "react";


function Tags() {
  const [tagValue, setTagValue] = useState('');
  const tagStyle = 'border rounded-lg bg-gray-100 px-[5px] text-sm';
  const tags = [
    'Appliances', 'Bags', 'Board', 'Computers', 'Chairs', 'Duster', 
    'Echo dot', 'Fridge', 'Food', 'Tripods', 'Laptop', 'Markers', 'Pens', 'Speaker', 'Walmart',
    'Echo dot', 'Fridge', 'Food', 'Tripods', 'Laptop', 'Markers', 'Pens', 'Speaker', 'Walmart',
    'Echo dot', 'Fridge', 'Food', 'Tripods', 'Laptop', 'Markers', 'Pens', 'Speaker', 'Walmart',
    'Echo dot', 'Fridge', 'Food', 'Tripods', 'Laptop', 'Markers', 'Pens', 'Speaker', 'Walmart',
    'Echo dot', 'Fridge', 'Food', 'Tripods', 'Laptop', 'Markers', 'Pens', 'Speaker', 'Walmart',
  ]
  // tag priority based on the count of the times it is called or used - priority queue
  const usertags = ['admin', 'superadmin', 'company', 'age','custom factor', 'like "srinivas"']
    return (
      <div className="border-8 w-full flex-row-style justify-center flex-wrap space-x-4 space-y-2">
        <input className={`border-b w-full px-2 bg-inherit outline-none text-md placeholder:text-sm `} placeholder='Search tags...' type="text" onChange={(e) => setTagValue(e.target.value)} />
        {tags.map((obj, idx) => <span className={tagStyle} key={idx}>{obj}</span>)}
      </div>
    );
  }
  
  export default Tags;
  
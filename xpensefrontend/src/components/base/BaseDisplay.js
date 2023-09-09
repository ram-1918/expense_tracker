// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

import UFilters from "./Filters";
import USavedFilters from "../home/USavedFilters";
import UMain from "../home/UMain";
import USummary from "../home/USummary";
import UFavorites from "../home/UFavorites";

import XFilters from "../xpenses/XFilters";
import XSavedFilters from "../xpenses/XSavedFilters";
import XMain from "../xpenses/XMain";
import XSummary from "./Summary";
import XFavorites from "./Tags";

import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Filters from "./Filters";
import Tags from "./Tags";
import Summary from "../base/Summary";



function getUsersData(){
    const data = [
        {"name":"Ram", "email": "crc.5453@gmail.com", "phone": "716671918", "createdat": "August 29th, 2023", "isactive": true, "role": "admin", "employeeid": 123, "colorTag": "red"},
        {"name":"Chandra", "email": "rcb.23@gmail.com", "phone": "7324748217", "createdat": "September 2th, 2023", "isactive": true, "role": "Superadmin", "employeeid": 423, "colorTag": "green"},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": "blue"},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": "red"},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": "blue"},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": "green"},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": "green"},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": "green"},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233, "colorTag": ""},
    ]
    // axios.get(`${API_URL}/users`)
    // .then((res) => console.log('Succuss'))
    return data
}

function getXpenseData(){
    const data = [
        {"expense":"System repairs", "email": "crc.5453@gmail.com", "submitted_at": "August 29th, 2023", "role": "admin", "mode_of_payment": "cash", "amount": "321.04"},
        {"expense":"Groceries", "email": "rcb.23@gmail.com", "submitted_at": "September 2th, 2023", "role": "Superadmin", "mode_of_payment": "credit card", "amount": "532.034"},
        {"expense":"Appliances", "email": "bhaviri278@gmail.com", "submitted_at": "July 12th, 2023", "role": "employee", "mode_of_payment": "cheque", "amount": "762.47"},
    ]
    // axios.get(`${API_URL}/users`)
    // .then((res) => console.log('Succuss'))
    return data
}

function BaseDisplay() {
    const { type } = useParams();
    const base_title_headers = 'sticky top-0 right-0 w-full flex-row-style justify-between font-medium p-2 bg-white';
    const [data, setData] = useState([]);
    const [keys, setKeys] = useState([]);
    const [showTags, setShowTags] = useState(true);
    const [showSummary, setShowSummary] = useState(true);

    const Xtags = [
        'Appliances', 'Bags', 'Board', 'Computers', 'Chairs', 'Duster', 
        'Echo dot', 'Fridge', 'Food', 'Tripods', 'Laptop', 'Markers', 'Pens', 'Speaker', 'Walmart',
        'Echo dot', 'Fridge', 'Food', 'Tripods', 'Laptop', 'Markers', 'Pens', 'Speaker', 'Walmart',
        'Echo dot', 'Fridge', 'Food', 'Tripods', 'Laptop', 'Markers', 'Pens', 'Speaker', 'Walmart',
        'Echo dot', 'Fridge', 'Food', 'Tripods', 'Laptop', 'Markers', 'Pens', 'Speaker', 'Walmart',
        'Echo dot', 'Fridge', 'Food', 'Tripods', 'Laptop', 'Markers', 'Pens', 'Speaker', 'Walmart',
      ]
      // tag priority based on the count of the times it is called or used - priority queue
      const Utags = [
        'admin', 'superadmin', 'company', 'age','custom factor', 'like "srinivas"',
        'admin', 'superadmin', 'company', 'age','custom factor', 'like "srinivas"',
        'admin', 'superadmin', 'company', 'age','custom factor', 'like "srinivas"',
        'admin', 'superadmin', 'company', 'age','custom factor', 'like "srinivas"',
        'admin', 'superadmin', 'company', 'age','custom factor', 'like "srinivas"',
    ]

    useEffect(() => {
        if(type === 'users'){
            const d = getUsersData();
            setKeys(Object.keys(d[0]))
            setData(d);
        }
        if(type === 'xpenses'){
            const d = getXpenseData();
            // alert(d.length);
            setKeys(Object.keys(d[0]))
            setData(d)
        }
    }, [type])

    return (
        <div className='border-0 w-full h-full flex-row-style justify-center space-x-2 p-2'>
            <div className={`border border-t-0 border-b-0 ${showTags && showSummary ? 'w-[85%]' : 'w-full'} h-full flex-col-style overflow-x-scroll overflow-y-scroll`}>
                <Filters keys={keys} />
                <div className="w-full px-4 overflow-y-scroll">
                    {type === 'xpenses' && <XMain data={data} keys={keys}/>} {type === 'users' && <UMain data={data} keys={keys}/>}
                </div>
            </div>
            <div className={`h-full space-y-4 ${showTags || showSummary ? 'w-[20%] ' : 'w-[10%]'}`}>
                <div className={`border w-full ${showTags ? 'h-[45%]' : 'h-fit'} overflow-y-scroll`}>
                    <div className={`${base_title_headers}`}>
                        <span>Tags</span>
                        {showTags && <span onClick={() => {setShowTags((prev) => !prev)}}><i className="fa fa-minus"></i></span>}
                        {!showTags && <span onClick={() => {setShowTags((prev) => !prev)}}><i className="fa fa-plus"></i></span>}
                    </div>
                    <div className={`w-full h-full ${showTags ? 'flex' : 'hidden'}`}>
                        <Tags type={type} tags={type === 'users' ? Utags : Xtags}/>
                    </div>
                </div>
                <div className={`border w-full ${showSummary ? 'h-[55%]' : 'h-fit'} overflow-y-scroll`}>
                    <div className={`${base_title_headers}`}>
                        <span>Summary</span>
                        {showSummary && <span onClick={() => {setShowSummary((prev) => !prev)}}><i className="fa fa-minus"></i></span>}
                        {!showSummary && <span onClick={() => {setShowSummary((prev) => !prev)}}><i className="fa fa-plus"></i></span>}
                    </div>
                    <div className={`w-full h-full ${showSummary ? 'flex' : 'hidden'}`}>
                        {type === 'xpenses' && <XSummary />} {type === 'users' && <Summary />}
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default BaseDisplay;
  
                    {/* Implement colored tags */}
                        {/* Tags related to component */}
                        {/* Summary of the data from the called component */}

                    {/* Appropriate content from called component ========== 
                    Include Pagination...... and also ONE SEARCH BAR VARIOUS FUCTIONALITY 
                    Any data that enters/that received changes(when updates ot delets]) the expense tabLe its status should be pendinG(3) */}
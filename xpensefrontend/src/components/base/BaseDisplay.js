
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
        {"name":"Ram", "email": "crc.5453@gmail.com", "phone": "716671918", "createdat": "August 29th, 2023", "isactive": true, "role": "admin", "employeeid": 123},
        {"name":"Chandra", "email": "rcb.23@gmail.com", "phone": "7324748217", "createdat": "September 2th, 2023", "isactive": true, "role": "Superadmin", "employeeid": 423},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233},
        {"name":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "isactive": true, "role": "employee", "employeeid": 233},
    ]
    // axios.get(`${API_URL}/users`)
    // .then((res) => console.log('Succuss'))
    return data
}

function getXpenseData(){
    const data = [
        {"expense":"Ram", "email": "crc.5453@gmail.com", "phone": "716671918", "createdat": "August 29th, 2023", "role": "admin", "employeeid": 123},
        {"expense":"Chandra", "email": "rcb.23@gmail.com", "phone": "7324748217", "createdat": "September 2th, 2023", "role": "Superadmin", "employeeid": 423},
        {"expense":"Bhaviri", "email": "bhaviri278@gmail.com", "phone": "9234678323", "createdat": "July 12th, 2023", "role": "employee", "employeeid": 233},
    ]
    // axios.get(`${API_URL}/users`)
    // .then((res) => console.log('Succuss'))
    return data
}

function BaseDisplay() {
    const { type } = useParams();
    const base_title_headers = 'sticky top-0 right-0 w-full text-left font-bold p-2 bg-white';
    const [data, setData] = useState([]);
    const [keys, setKeys] = useState([]);
    // const type = 'users'
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
        <div className='border w-full h-full flex-row-style justify-center space-x-2 p-2'>
            <div className="border w-[85%] h-full flex-col-style overflow-x-scroll overflow-y-scroll">
                <Filters keys={keys} />
                <div className="w-full overflow-y-scroll">
                    {/* Appropriate content from called component ========== 
                    Include Pagination...... and also ONE SEARCH BAR VARIOUS FUCTIONALITY 
                    Any data that enters/that received changes(when updates ot delets]) the expense tabLe its status should be pendinG(3) */}
                    {type === 'xpenses' && <XMain data={data} keys={keys}/>} {type === 'users' && <UMain data={data} keys={keys}/>}
                </div>
            </div>
            <div className="w-[20%] h-full space-y-4">
                <div className="border w-full h-[45%] overflow-y-scroll">
                    <div className={`${base_title_headers}`}>Tags</div>
                    {/* Implement colored tags */}
                    <div className="w-full h-full">
                        {/* Tags related to component */}
                        {type === 'xpenses' && <XFavorites />} {type === 'users' && <Tags />}
                    </div>
                </div>
                <div className="border w-full h-[55%] overflow-y-scroll">
                    <div className={`${base_title_headers}`}>Summary</div>
                    <div className="h-full">
                        {/* Summary of the data from the called component */}
                        {type === 'xpenses' && <XSummary />} {type === 'users' && <Summary />}
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default BaseDisplay;
  
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../store/constants';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL
  });

export const PostData = (url, data) => {
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const postdata = async () => {
            try{
                const result = await axiosInstance.post(url, data);
                setResponse(result.data);
            }
            catch(error){console.log(error)};
        }
        postdata();
    }, [url, data, setResponse]);
    return response;
}


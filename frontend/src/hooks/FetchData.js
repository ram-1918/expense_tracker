import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { API_URL } from '../store/constants';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL
  });

export const FetchUserInfo = (url) => {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchdata = async () => {
            try{
                const result = await axiosInstance.get(url);
                setData(result.data)
            }
            catch {
                console.log("ERROR IN FETCH USER INFO FETCH DATA")
            };
        }
        fetchdata();
    }, [url, dispatch, API_URL]);
    return data;
}

export const FetchUsersList = (url) => {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchdata = async () => {
            try{
                const result = await axiosInstance.get(url);
                setData(result.data)
            }
            catch {
                console.log("ERROR IN FETCH USER INFO FETCH USERS LIST")
            };
        }
        fetchdata();
    }, [url, dispatch, API_URL]);
    return data;
}

export const FetchExpenseList = (url) => {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchdata = async () => {
            try{
                const result = await axiosInstance.get(url);
                setData(result.data)
            }
            catch(error){
                console.log("FETCH EXPENSE LIST")
            };
        }
        fetchdata();
    }, [url, dispatch, API_URL]);
    return data;
}


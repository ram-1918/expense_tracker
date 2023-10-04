import { setUserReport, setUsersList } from "../coreSlice";

export const processUsersDownloadReport = (dispatch, users) => {
    // Dispatcher and data are received as props
    // processes the data accordingly
    const report = (users && users[0]) || null ;
    // Update the state 
    dispatch(setUserReport(report));
}

export const processUsersSearchData = (dispatch, data, setFunc, searchText) => {
    const newData = [data[0]];
    dispatch(setFunc(newData))
}
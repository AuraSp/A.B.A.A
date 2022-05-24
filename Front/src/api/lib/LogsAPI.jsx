import axiosLog from '../apiLogs';
// import axios from "axios";

export async function getAllLogs() {
    const res = await axiosLog.get('/');
    return res;
}



export const addNewLog = (data) => axiosLog.patch(`/addNewLog/`, JSON.stringify(data));
import axiosClient from '../apiTransactions';
import axiosUser from '../apiTransactions';
import axios from "axios"
import Swal from 'sweetalert2'

//User
export async function getAllUsers() {
  const res = await axiosClient.get('/');
  return res;
}

export const createNewUser = (name, password, email, data) => axiosClient.post('/auth/signup', {
    username: name,
    email: email,
    password: password
  })

export const loginUser = (name, password, email, data) => axiosClient.post('/auth/signin', {
  username: name,
  password: password
  // email: email
})
  .then((response) => {
    localStorage.setItem("user",  JSON.stringify(response.data.id))
    localStorage.setItem("name",  JSON.stringify(response.data.username))
    return response;
  });

export const signout = () => axios.post('http://localhost:3000/api/auth/signout')
  .then((response) => {
    console.log(response);
  });

// return res.redirect(/home)

// export async function createNewUser() {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect("/login");
// }

// const register = async (e, data) => {
//     e.preventDefault();

//     await createNewUser(name, password, email)
//   }

export async function deleteUserById(userId) { await axiosClient.patch(`/deleteUser/${userId}`) };

export const updateUser = (data, subId) => axiosClient.patch(`/${subId}/update`, JSON.stringify(data));

//User's transactions
export async function deleteIncomeTransactions(userId, subId) { await axiosClient.patch(`/${userId}/income/delete/${subId}`) };
export async function deleteExpenseTransactions(userId, subId) { await axiosClient.patch(`/${userId}/expense/delete/${subId}`) };

export const findIncomesAndUpdate = (id, subId, data) => axiosUser.patch(`/${id}/income/update/${subId}`, JSON.stringify(data));
export const findExpensesAndUpdate = (id, subId, data) => axiosUser.patch(`/${id}/expense/update/${subId}`, JSON.stringify(data));

export const addNewIncome = (data, userId) => axiosUser.patch(`/${userId}/user/addNewIncome/`, JSON.stringify(data));
export const addNewExpense = (data, userId) => axiosUser.patch(`/${userId}/user/addNewExpense/`, JSON.stringify(data));

export const getUserIncomeByMonth = (userId) => axiosUser.get(`/${userId}/income/getByCurrentMonth`)
export const getUserExpenseByMonth = (userId) => axiosUser.get(`/${userId}/expense/getByCurrentMonth`)

export const getAllUserIncomesOffAllMonth = (userId) => axiosUser.get(`/${userId}/income/getOfAllMonths`)
export const getAllUserExpenseOffAllMonth = (userId) => axiosUser.get(`/${userId}/expense/getOfAllMonths`)
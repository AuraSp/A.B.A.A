import axiosClient from '../apiTransactions';
import axiosUser from '../apiTransactions'

//User
export async function getAllUsers() {
    const res = await axiosClient.get('/');
    return res;
}

export const createNewUser = (data) => axiosClient.post('/register/', JSON.stringify(data));
// return res.redirect(/home)

// export async function createNewUser() {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect("/login");
// }

export const updateUser = (data) => axiosClient.patch('/', JSON.stringify(data));








//User's transactions
export const deleteIncomeTransactions = (userId, subId) => axiosClient.patch(`/${userId}/income/delete/${subId}`);
export const deleteExpenseTransactions = (userId, subId) => axiosClient.patch(`/${userId}/expense/delete/${subId}`);

export const findIncomesAndUpdate = (id, subId, data) => axiosUser.patch(`/${id}/income/update/${subId}`, JSON.stringify(data));
export const findExpensesAndUpdate = (id, subId, data) => axiosUser.patch(`/${id}/expense/update/${subId}`, JSON.stringify(data));

export const addNewIncome = (data, userId) => axiosUser.patch(`/${userId}/user/addNewIncome/`, JSON.stringify(data));
export const addNewExpense = (data, userId) => axiosUser.patch(`/${userId}/user/addNewExpense/`, JSON.stringify(data));
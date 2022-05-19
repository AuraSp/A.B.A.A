import axiosCategory from '../apiCategories';
// import axios from "axios";

export async function getAllCategories() {
    const res = await axiosCategory.get('/');
    return res;
}

export const updateCategories = (data) => axiosCategory.patch('/', JSON.stringify(data));

//Categories
export async function deleteCategories(subId) { await axiosCategory.patch(`/categories/delete/${subId}`) };

export const updateCategory = (subId, data) => axiosCategory.patch(`/628533a8be098f1544108229/categories/update/${subId}`, JSON.stringify(data));

export const addNewCategory = (subId, data) => axiosCategory.patch(`/${subId}/628533a8be098f1544108229/categories/addNewCategory/`, JSON.stringify(data));
import axiosCategory from '../apiCategories';
import axiosUser from '../apiCategories';
import axios from "axios";

export async function getAllCategories() {
    const res = await axiosCategory.get('/');
    return res;
}

export const updateCategories = (data) => axiosCategory.patch('/', JSON.stringify(data));

//Categories
export async function deleteCategories(subId) { await axiosCategory.patch(`/categories/delete/${subId}`) };

export const updateCategory = (id, subId, data) => axiosCategory.patch(`/category/${subId}/update`, JSON.stringify(data));

export const addNewCategory = (data, userId) => axiosCategory.patch(`/${userId}/addNewCategory/`, JSON.stringify(data));
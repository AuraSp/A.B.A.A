import axiosCategory from '../apiCategories';
// import axios from "axios";

export async function getAllCategories() {
    const res = await axiosCategory.get('/');
    return res;
}

export const updateCategories = (data) => axiosCategory.patch('/', JSON.stringify(data));

//Categories
export async function deleteCategory(subId) { await axiosCategory.patch(`/category/${subId}/delete`) };

export const updateCategory = (id, subId, data) => axiosCategory.patch(`/category/${subId}/update`, JSON.stringify(data));

export const addNewCategory = (data) => axiosCategory.patch(`/628533a8be098f1544108229/addNewCategory/`, JSON.stringify(data));

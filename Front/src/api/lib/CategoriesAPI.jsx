import axiosCategory from '../apiCategories';

export const updateCategories = (data) => axiosCategory.patch('/', JSON.stringify(data));

//Categories
export async function deleteCategories(subId) { await axiosCategory.patch(`/categories/delete/${subId}`) };

export const updateCategory = (subId, data) => axiosUser.patch(`/categories/update/${subId}`, JSON.stringify(data));

import axiosCategory from '../apiCategories';

export async function getAllCategories() {
    const res = await axiosCategory.get('/');
    return res;
}

export const updateCategories = (data) => axiosCategory.patch('/', JSON.stringify(data));

//Categories
export async function deleteCategories(subId) { await axiosCategory.patch(`/categories/delete/${subId}`) };

export const updateCategory = (subId, data) => axiosCategory.patch(`/categories/update/${subId}`, JSON.stringify(data));

import { create } from "zustand";
import http from "../../config";
import { Category_Request } from "../../interface/category";


const useCategoryStore = create <Category_Request>((set, get) => ({
    data_category: [],
    count: 0,
    get_all_category: async (data) => {
        try {
            const response = await http.get(`/category/search?search=${data?.search}&limit=${data?.limit}&page=${data?.page}`)
            set({ data_category: response?.data?.data?.categories })
            set({ count: response?.data?.data?.count })
        } catch (err) {
            console.log(err)
        }
    },
    get_all_subcategory: async (data) =>{
        try {
            const response = await http.get(`/category/get-all-subcategory/${data.id}/q?`)
            set({ data_category: response?.data?.categories })
        } catch (err) {
            console.log(err)
        }
    },
    get_id_category: async (data) => {
        try {
            const response = await http.get(`/category/${data.id}`)
            set({ data_category: response?.data?.categories })
        } catch (err) {
            console.log(err)
        }
    },
    create_category: async (data) => {
        try {
            const currentCategories = get().data_category;
            const response = await http.post("/category/create", data);
            if (currentCategories.length != 5) {
                set((prev) => ({
                    data_category: [...prev.data_category, response?.data?.data],
                }));
            }
            return response;
        } catch (err) {
            return err;
        }
    },
    put_category: async (data) => {
        try {
            const response = await http.patch(`/category/update/${data?.id}`, data?.data)
            set((prev) => ({
                data_category: prev.data_category.map((item) => item.id === data.id ? response?.data?.data : item)
            }));
            return response
        } catch (err) {
            return err
        }
    },
    delete_category: async (data) => {
        try {
            const response = await http.delete(`/category/delete/${data.id}`);
            set((prev) => ({
                data_category: prev.data_category.filter((item) => item.id !== data.id)
            }));
            return response
        } catch (err) {
            return err;
        }
    }
  }));

export default useCategoryStore
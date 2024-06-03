import { create } from "zustand";
import http from "../../config";
import { Category_Request } from "../../interface/category";


const useCategoryStore = create <Category_Request>((set) => ({
    data_category: [],
    get_all_category: async () => {
        try {
            const response = await http.get("/category/get-all-category/q?")
            set({ data_category: response?.data?.categories })
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
            const response = await http.get(`/category/get/${data.id}`)
            set({ data_category: response?.data?.categories })
        } catch (err) {
            console.log(err)
        }
    },
    create_category: async (data) => {
        try {
            const response = await http.post("/category/create", data);
            set((prev) => ({
                data_category: [...prev.data_category, response?.data?.category],
            }));
            return response
        } catch (err) {
            return err;
        }
    },
    put_category: async (data) => {
        try {
            const response = await http.put(`/category/update/${data.id}`, data)
            set((prev) => ({
                data_category: prev.data_category.map((item) => item.id === data.id? response?.data?.category : item)
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
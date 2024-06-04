import { create } from "zustand";
import http from "../../config";
import { Brand_Request } from "../../interface/brand";


const useBrandStore = create <Brand_Request>((set) => ({
    data_brand: [],
    get_brands: async () => {
        try {
            const response = await http.get("/brand/get-all/q?")
            set({ data_brand: response?.data?.brands })
        } catch (err) {
            console.log(err)
        }
    },
    post_brand: async (data) => {
        try {
            const response = await http.post("/brand/create", data);
            set((prev) => ({
                data_brand: [...prev.data_brand, response?.data?.brand],
            }));
            return response
        } catch (err) {
            return err;
        }
    },
    put_brand: async (data) => {
        try {
            console.log(data);
            const response = await http.put(`/brand/update/${data.id}`, data);
            set((prev) => ({
                data_brand: prev.data_brand.map((item) => {
                    if (item.id === data.id) {
                        return response?.data?.brand;
                    } else {
                        return item;
                    }
                }),
            }));
            return response
        } catch (err) {
            return err;
        }
    },
    delete_brand: async (data) => {
        try {
            const response = await http.delete(`/brand/delete/${data.id}`);
            set((prev) => ({
                data_brand: prev.data_brand.filter((item) => item.id!== data.id),
            }));
            return response
        } catch (err) {
            return err;
        }
    }
}))

export default useBrandStore
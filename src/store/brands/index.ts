import { create } from "zustand";
import http from "../../config";
import { Brand_Request } from "../../interface/brand";


const useBrandStore = create <Brand_Request>((set) => ({
    count: 0,
    data_brand: [],
    get_brands: async (data) => {
        try {
            const response = await http.get(`/brand/search?search=${data.search}&limit=${data.limit}&page=${data.page}`)
            set({ data_brand: response?.data?.data?.brands })
            set({ count: response?.data?.data?.count })
        } catch (err) {
            console.log(err)
        }
    },
    post_brand: async (data) => {
        try {
            const response = await http.post("/brand/create", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            set((prev) => ({
                data_brand: [...prev.data_brand, response?.data?.data],
            }));
            return response;
        } catch (err) {
            return err;
        }
    },
    put_brand: async (data) => {
        try {
            console.log(data);
            const response = await http.patch(`/brand/update/${data.id}`, data?.formData);
            console.log(response);
            set((prev) => ({
                data_brand: prev.data_brand.map((item) => {
                    if (item.id === data.id) {
                        return response?.data?.data;
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
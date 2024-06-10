import { create } from "zustand";
import http from "../../config";
import { Product_Request } from "../../interface/product";


const useProductStore = create<Product_Request>((set) => ({
    count: 0,
    data_product: [],
    get_product: async (data) => {
        try {
            const response = await http.get(`/products/search?search=${data.search}&limit=${data.limit}&page=${data.page}`)
            set({ data_product: response?.data?.data?.products })
            set({ count: response?.data?.data?.count })
        } catch (err) {
            console.log(err)
        }
    },
    post_product: async (data) => {
        try {
            const response = await http.post("/products/create", data);
            set((prev) => ({
                data_product: [...prev.data_product, response?.data?.data],
            }));
            return response;
        } catch (err) {
            return err;
        }
    },
    put_product: async (data) => {
        try {
            const response = await http.patch(`/products/update/${data.id}`, data?.data);
            set((prev) => ({
                data_product: prev.data_product.map((item) => {
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
    delete_product: async (data) => {
        try {
            const response = await http.delete(`/products/delete/${data.id}`);
            set((prev) => ({
                data_product: prev.data_product.filter((item:any) => item.id!== data.id),
            }));
            return response
        } catch (err) {
            return err;
        }
    },
    get_Product_id: async (id) => {
        try{
            const response = await http.get(`/products/${id}`)
            return response?.data?.data
        }catch(err){
            console.log(err);
        }
    }
}))

export default useProductStore
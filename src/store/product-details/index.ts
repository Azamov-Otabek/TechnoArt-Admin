import { create } from "zustand";
import http from "../../config";
import { details_request } from "../../interface/product-detail";


const useProductDetailStore = create<details_request>((set) => ({
    data_productDetail: [],
    count: 0,
    get_productDetail: async () => {
        try {
            const response = await http.get(`/product-detail`)
            set({ data_productDetail: response?.data?.data })
            set({ count: response?.data?.data?.count })
        } catch (err) {
            console.log(err)
        }
    },
    post_productDetail: async (data) => {
        try {
            const response = await http.post("product-detail/create", data);
            set((prev) => ({
                data_productDetail: [...prev.data_productDetail, response?.data?.data],
            }));
            return response;
        } catch (err) {
            return err;
        }
    },
    put_productDetail: async (data) => {
        try {
            const response = await http.patch(`/product-detail/update/${data.id}`, data?.formData);
            set((prev) => ({
                data_productDetail: prev.data_productDetail.map((item:any) => {
                    console.log(item);
                    console.log(data.id);
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
    delete_productDetail: async (data) => {
        try {
            const response = await http.delete(`/product-detail/delete/${data.id}`);
            set((prev) => ({
                data_productDetail: prev.data_productDetail.filter((item:any) => item.id!== data.id),
            }));
            return response
        } catch (err) {
            return err;
        }
    }
}))

export default useProductDetailStore
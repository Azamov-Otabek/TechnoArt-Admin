import { create } from "zustand";
import http from "../../config";
import { Stock_request } from "../../interface/stock";


const useStockStore = create<Stock_request>((set) => ({
    count: 0,
    data_Stock: [],
    get_Stock: async (data) => {
        try {
            const response = await http.get(`/stock?limit=${data.limit}&page=${data.page}`)
            set({ data_Stock: response?.data?.data?.stocks })
            set({ count: response?.data?.data?.count })
        } catch (err) {
            console.log(err)
        }
    },
    post_Stock: async (data) => {
        try {
            const response = await http.post("/stock/create", data);
            set((prev) => ({
                data_Stock: [...prev.data_Stock, response?.data?.data],
            }));
            return response;
        } catch (err) {
            return err;
        }
    },
    put_Stock: async (data) => {
        try {
            const response = await http.patch(`/stock/update/${data.id}`, data?.data);
            set((prev) => ({
                data_Stock: prev.data_Stock.map((item) => {
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
    delete_Stock: async (data) => {
        try {
            const response = await http.delete(`/stock/delete/${data.id}`);
            set((prev) => ({
                data_Stock: prev.data_Stock.filter((item:any) => item.id!== data.id),
            }));
            return response
        } catch (err) {
            return err;
        }
    },
}))

export default useStockStore
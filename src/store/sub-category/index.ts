import { create } from "zustand";
import http from "../../config";
import { subcategory_request } from "../../interface/subcategory";




const useSubCategoryStore = create<subcategory_request>((set, get) => ({
  data_sub_category: [],
  count: 0,
  get_all_subcategory: async ({ search, limit, page, id }) => {
    try {
      const response = await http.get(`/sub-category/search/${id}?search=${search}&limit=${limit}&page=${page}`);
      set({ 
        data_sub_category: response?.data?.data?.subcategories || [], 
        count: response?.data?.data?.count || 0 
      });
    } catch (err) {
      console.log(err);
    }
  },
  create_subcategory: async (data) => {
    try {
      const currentSubCategories = get().data_sub_category;
      const response = await http.post(`/sub-category/create`, data);
      if (currentSubCategories.length != 5) {
        set((prev) => ({
          data_sub_category: [...prev.data_sub_category, response?.data?.data],
        }));
      }
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  update_subcategory: async (data) => {
    const payload = {
      name: data.name,
      parent_category_id: data.parent_category_id,
    }
    try {
      const response = await http.patch(`/sub-category/update/${data.id}`, payload);
      set((prev) => ({
        data_sub_category: prev.data_sub_category.map((item) => item.id === data.id ? response?.data?.data : item),
      }));
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  delete_subcategory: async ({ id }) => {
    try {
      const response = await http.delete(`/sub-category/delete/${id}`);
      set((prev:any) => ({
        data_sub_category: prev.data_sub_category.filter((item:any) => item.id !== id),
      }));
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
}));

export default useSubCategoryStore;

import { create } from "zustand";
import http from "../../config";
import { brandcategory_request } from "../../interface/brand-category";




const useBrandCategoryStore = create<brandcategory_request>((set, get) => ({
data_brand_category: [],
  count: 0,
  get_all_brandcategory: async ({ limit, page, id }) => {
    try {
      const response = await http.get(`/brand-category/brand/${id}?limit=${limit}&page=${page}`);
      set({ 
        data_brand_category: response?.data?.data?.brandCategories || [], 
        count: response?.data?.data?.count || 0 
      });
    } catch (err) {
      console.log(err);
    }
  },
  create_brandcategory: async (data) => {
    try {
      const currentSubCategories = get().data_brand_category;
      const response = await http.post(`/brand-category/create`, data);
      if (currentSubCategories.length != 5) {
        set((prev) => ({
            data_brand_category: [...prev.data_brand_category, response?.data?.data],
        }));
      }
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  update_brandcategory: async (data) => {
    const payload = {
      name: data.name,
      brand_id: data.brand_id,
    }
    try {
      const response = await http.patch(`/brand-category/update/${data.id}`, payload);
      set((prev) => ({
        data_brand_category: prev.data_brand_category.map((item) => item.id === data.id ? response?.data?.data : item),
      }));
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  delete_brandcategory: async ({ id }) => {
    try {
      const response = await http.delete(`/brand-category/delete/${id}`);
      console.log(response);
      set((prev:any) => ({
        data_brand_category: prev.response?.data?.data.filter((item:any) => item.id !== id),
      }));
      return response;
    } catch (err) {
      return err;
    }
  },
  get_id_brands: async ({ id }) => {
    try {
      const response = await http.get(`/brand-category/brand/${id}?limit=0&page=0`);
      set({ 
        data_brand_category: response?.data?.data?.brandCategories || [], 
        count: response?.data?.data?.count || 0 
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}));

export default useBrandCategoryStore;

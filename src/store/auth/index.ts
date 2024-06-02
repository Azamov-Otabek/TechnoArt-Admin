import { create } from "zustand";
import http from "../../config";
import { AuthRequst } from "../../interface/Auth";

const useAuthStore = create <AuthRequst>(() => ({
    Login: async (data) => {
        try {
            const response = await http.post("/admin/login", data)
            return response
        }catch(err){
            return err
        }
    }
  }));

export default useAuthStore
import { create } from "zustand";
import http from "../../config";
import { AuthRequst } from "../../interface/Auth";

const useAuthStore = create <AuthRequst>(() => ({
    Login: async (data) => {
        try {
            const response = await http.post("/auth/sign-in", data)
            return response
        }catch(err){
            return err
        }
    },
    Singup: async (data) => {
        try {
            const response = await http.post("/auth/admin/sign-up", data)
            return response
        }catch(err){
            return err
        }
    },
    Reset: async (data) => {
        try {
            const response = await http.post("/admin/reset", data)
            return response
        }catch(err){
            return err
        }
    },
    Refresh_Token: async (data) => {
        try {
            const response = await http.post(`/admin/refresh-token/${data.id}`)
            return response
        }catch(err){
            return err
        }
    },
    getAdminbyId: async (id) => {
        try {
            const response = await http.get(`/admin/${id}`)
            return response
        }catch(err){
            return err
        }
    },
    deleteUser: async (id) => {
        try {
            const response = await http.delete(`/admin/${id}`)
            return response
        }catch(err){
            return err
        }
    }
  }));

export default useAuthStore
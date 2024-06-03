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
    },
    Singup: async (data) => {
        try {
            const response = await http.post("/admin/create", data)
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
    Logout: async () => {
        try {
            await http.post("/admin/logout")
        }catch(err){
            console.log(err);
        }
    },
    Refresh_Token: async (data) => {
        try {
            const response = await http.post(`/admin/refresh-token/${data.id}`)
            return response
        }catch(err){
            return err
        }
    }
  }));

export default useAuthStore
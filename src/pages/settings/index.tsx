import { useEffect, useState } from "react"
import useAuthStore from "../../store/auth"
import { getCookies, removeCookies } from "../../utils/cocies"
import { Button, Popover  } from "antd"
import '../../components/ui/global-table/style.css'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { GithubOutlined, GooglePlusOutlined, InstagramOutlined, WhatsAppOutlined } from "@ant-design/icons"

function index() {
  const navigate = useNavigate()
  const {getAdminbyId, deleteUser} = useAuthStore()
  const [data, setData]:any = useState({})
  const [open, setOpen] = useState(false);
  async function getAdmin(){
    const response = await getAdminbyId(String(getCookies("id")))
    setData(response.data)
  }
  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  async function delete_user(){
    const response = await deleteUser(data?.id)
    console.log(response);
    if(response?.data?.message == 'Admin removed successfully'){
      toast.success('Admin deleted successfully', {autoClose: 1100})
      removeCookies('access_token')
      removeCookies('refresh_token')
      removeCookies('first_name')
      setTimeout(() => {
        navigate('/')
      }, 1500);
    }else{
      toast.error('Admin deleted failed', {autoClose: 1100})
    }
  }

  useEffect(() => {
    getAdmin()
  }, [] )
  return (
   <>
   <ToastContainer/>
     <div className="flex gap-[60px] items-center mt-[30px]">
      <div className="flex flex-col items-center p-[40px] bg-[#0A6847] shadow-xl rounded-xl h-[420px] w-[500px]">
        <img className="w-[130px] h-[130px] rounded-[100%] object-cover" src="https://cdn-icons-png.flaticon.com/512/3790/3790055.png" alt="" />
        <p className="font-bold text-[24px] text-[white]">{data?.first_name} {data?.last_name}</p>
        <p className="text-[20px] font-bold text-[#F3CA52]">Front-end Developer</p>
        <p className="text-[20px] font-bold text-[#ffffff]">Uzbekistan, Tashkent Sergeli</p>
      </div>
      <div className="w-full shadow-xl bg-white h-[420px] px-[30px] rounded-xl">
        <div className="flex gap-[100px] py-[20px] px-[10px]">
          <p className="w-[120px] font-bold">FUll Name</p>
          <p className="font-bold text-[#00000060]">{data?.first_name} {data?.last_name  }</p>
        </div>
        <hr/>
        <div className="flex gap-[100px] py-[20px] px-[10px]">
          <p className="w-[120px] font-bold">Email</p>
          <p className="font-bold text-[#00000060]">{data?.email}</p>
        </div>
        <hr/>
        <div className="flex gap-[100px] py-[20px] px-[10px]">
          <p className="w-[120px] font-bold">Phone Number</p>
          <p className="font-bold text-[#00000060]">{data?.phone_number}</p>
        </div>
        <hr/>
        <div className="flex gap-[100px] py-[20px] px-[10px]">
          <p className="w-[120px] font-bold">Is Active ?</p>
          <p className="font-bold text-[#00000060]">{data?.is_active ? 'Online' : "OFF" }</p>
        </div>
        <hr/>
        <div className="flex gap-[100px] py-[20px] px-[10px]">
          <p className="w-[120px] font-bold">Role</p>
          <p className="font-bold text-[#00000060]">{data?.is_superadmin ? 'Super Admin' : "Admin" }</p>
        </div>
        <hr/>
        <div className="flex gap-[100px] py-[20px] px-[10px]">
          <p className="w-[120px] font-bold">Created At</p>
          <p className="font-bold text-[#00000060]">{data?.createdAt?.slice(0, 10)}</p>
        </div>
        <div className="flex gap-[20px] justify-end">
          <Button className="custom-button">Edit</Button>
          <Popover
              content={<div className="h-[50px] flex justify-end items-end gap-[15px]">
                  <Button className="custom-button" onClick={hide}>Cancel</Button>
                  <Button className="custom-button" onClick={() => delete_user()}>Delete</Button>
                </div>
              }
              title="Are you sure you want to delete your account?"
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
          > 
              <Button className="custom-button">Delete Accaunt</Button>
          </Popover>
        </div>
      </div>
      <div>
          
      </div>
    </div>
    


    <div className="flex gap-[60px] items-center mt-[30px]">
      <div className="flex flex-col p-[20px] bg-[#0A6847] shadow-xl rounded-xl h-[200px] w-[600px]">
           <div className="flex text-white justify-between items-center mb-[10px]">
             <p className="w-[150px] text-[20px] flex gap-[5px] font-semibold"><GithubOutlined />Github</p>
             <p className="font-medium">https://github.com/Azamov-Otabek</p>
           </div>
           <div className="flex text-white justify-between items-center mb-[10px]">
             <p className="w-[150px] text-[20px] flex gap-[5px] font-semibold"><InstagramOutlined />Instagram</p>
             <p className="font-medium">@otabek.azam0v</p>
           </div>
           <div className="flex text-white justify-between items-center mb-[10px]">
             <p className="w-[150px] text-[20px] flex gap-[5px] font-semibold"><WhatsAppOutlined />Whatsap</p>
             <p className="font-medium">+998939305210</p>
           </div>
           <div className="flex text-white justify-between items-center mb-[10px]">
             <p className="w-[150px] text-[20px] flex gap-[5px] font-semibold"><GooglePlusOutlined />Google</p>
             <p className="font-medium">otabek.azamov@mail.ru</p>
           </div>
      </div>
      <div className="w-full h-[220px] px-[30px] rounded-xl">
      </div>
    </div>
   </>
  )
}

export default index
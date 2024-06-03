import './login/style.css'
import {auth_pages} from '../../router/root';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function index() {
  const backgroundImage = 'https://p.w3layouts.com/demos_new/template_demo/06-03-2019/triple_forms-demo_Free/1611343419/web/images/b4.jpg';
  const {pathname} = useLocation()
  return (
    <>
    <ToastContainer />
      <div 
        className="image-container overflow" 
        style={{ backgroundImage: `url(${backgroundImage})` }}>

        <h1 className='text-[60px] text-white font-bold text-center mx-auto pt-[50px] max-w-[800px] leading-[60px]'>Welcome to TexnoArt Admin Panel</h1>
          <div className='flex justify-center gap-[50px] mt-[100px] max-lg:flex-col max-lg:max-w-[600px] max-lg:mx-auto max-lg:gap-0'>
          <div className='max-w-[500px] flex max-lg:order-2'>
            <img className=' max-lg:hidden w-[300px] h-[430px] object-cover' src="https://p.w3layouts.com/demos_new/template_demo/06-03-2019/triple_forms-demo_Free/1611343419/web/images/m.jpg" alt="IMG " />
            <div className=' max-lg:flex max-lg:w-[600px] max-lg:ml-[50px] max-sm:m-0'>
              {auth_pages?.map((e,i) => {
                return (           
                   <NavLink to={e.path} key={i}>
                     <div className={`flex items-center justify-center flex-col gap-[10px] h-[143px] w-[200px] max-lg:h-[70px] max-lg:max-w-[167px] shadow-lg cursor-pointer text-[26px] ${pathname == e.path ? 'bg-[#00AD45] text-white duration-300' : 'bg-white'}`}>
                      {e.icon}
                      <h1 className={`text-center text-[20px] font-medium text-gray-700 ${pathname == e.path && 'text-white duration-300'} `}>
                        {e.title}
                      </h1>
                    </div>
                   </NavLink>
                )
              })}
            </div>
          </div>
          <div className='max-w-[500px] max-lg:mx-auto'>
              <Outlet/>
          </div>
        </div>
      </div>
    </>
  )
}


export default index
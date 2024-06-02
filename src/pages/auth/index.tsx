import './login/style.css'
import {auth_pages} from '../../router/root';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

function index() {
  const backgroundImage = 'https://p.w3layouts.com/demos_new/template_demo/06-03-2019/triple_forms-demo_Free/1611343419/web/images/b4.jpg';
  const {pathname} = useLocation()
  return (
    <>
      <div 
        className="image-container overflow-hidden" 
        style={{ backgroundImage: `url(${backgroundImage})` }}>

        <h1 className='text-[60px] text-white font-bold text-center mx-auto mt-[50px] w-[800px] leading-[60px]'>Welcome to TexnoArt Admin Panel</h1>
          <div className='flex justify-center gap-[50px] mt-[100px]'>
          <div className='w-[500px] flex'>
            <img className='w-[300px] h-[430px] object-cover' src="https://p.w3layouts.com/demos_new/template_demo/06-03-2019/triple_forms-demo_Free/1611343419/web/images/m.jpg" alt="IMG " />
            <div>
              {auth_pages?.map((e,i) => {
                return (           
                   <NavLink to={e.path} key={i}>
                     <div className={`flex items-center justify-center flex-col gap-[10px] h-[143px] w-[200px] bg-white shadow-lg cursor-pointer text-[26px] ${pathname == e.path && 'bg-[#00AD45] text-white duration-300'}`}>
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
          <div className='w-[500px]'>
              <Outlet/>
          </div>
        </div>
      </div>
    </>
  )
}


export default index
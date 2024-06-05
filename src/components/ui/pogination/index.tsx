import { Pagination } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

function index(props:any) {
    const navigate = useNavigate()
    const location = useLocation()
    
    function onchange(e:number){
        props.setPage(e)
        const searchparams = new URLSearchParams(location.search)
        searchparams.set('page', String(e))
        navigate(`?${searchparams}`)
    }


    return <Pagination current={props.page} onChange={(e) => onchange(e)} total={props.count} pageSize={5} />;
}

export default index
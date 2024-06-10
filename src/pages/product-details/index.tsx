import {  ProductStore } from "@store";
import { useEffect, useState } from "react";
import { Tooltip } from "antd"; // Importing required components from Ant Design
import "../../components/ui/global-table/style.css";
import { Detail_modal } from "@ui";
import {  useParams } from "react-router-dom";
import {  ToastContainer } from "react-toastify";
import { MinusOutlined, PlusOutlined, QuestionCircleOutlined, ShoppingOutlined } from "@ant-design/icons";

function Index() {
  const { get_Product_id } = ProductStore();
  const { detail } = useParams();
  const [product, setproduct]: any = useState({});
  const [data_detail, setdetail]: any = useState({});
  const [count, setCount]: any = useState(1);
  const sale = Number(product.price) - ((Number(product.price) / 100) * 10)
  const [istrue, setistrue]:any = useState(false);

  const text = 'Мы доставляем товары на следующий день после заказа до собственных пунктов выдачи. Выберите на этапе оформления заказа наиболее удобный для вас адрес.'

  async function getData() {
    const response = await get_Product_id(Number(detail));
    setproduct(response?.product);
    setdetail(response?.product_detail);
    if(response?.product_detail.id)
      setistrue(true)
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ToastContainer />

    {istrue ?   <div className="flex justify-center gap-[100px]">
        <div>
          {data_detail?.images?.map((e: any, i: number) => {
            return <img key={i} src={e} className="w-[200px] h-[200px]" />;
          })}
        </div>
        <div className="w-[600px]">
          <div className="flex justify-between items-center">
            <div className="flex gap-[10px]">
              <p className="text-[13px] text-[#00000084]">4.5 ( 61 оценка )</p>
              <p className="text-[13px] text-[#00000084]">Более 600 заказов</p>
            </div>
          </div>
          <h1 className="text-[24px] text-center font-bold">{product?.name}</h1>
          <p className="mt-[20px] mb-[10px] text-[24px] font-medium">
            {data_detail?.description}
          </p>
          <div className="flex gap-[30px] mb-[10px]">
            <p className="w-[100px] text-[15px] text-[#000000d2]">Продавец:</p>
            <p>ComFore</p>
          </div>
          <div className="flex gap-[30px] mb-[10px]">
            <div className="w-[100px] flex gap-2">
              <p className="text-[15px] text-[#000000d2]">Доставка:</p>
              <Tooltip placement="top" title={text}>
                <QuestionCircleOutlined />
              </Tooltip>
            </div>
            <p className="text-[#000000d2]">1 день, бесплатно</p>
          </div>
          <hr />


          <p className="mt-[20px]">Количество:</p>
          <div className="flex mt-[10px] gap-[30px] items-center">
            <div className="flex border p-[10px] gap-[20px]">
              {count == 1 ? (
                <MinusOutlined disabled />
              ) : (
                <MinusOutlined onClick={() => setCount(count - 1)} />
              )}
              <p>{count}</p>
              {count == data_detail?.quantity ? (
                <PlusOutlined disabled />
              ) : (
                <PlusOutlined onClick={() => setCount(count + 1)} />
              )}
            </div>
            <p className="text-[16px] text-[#4fac3f]">В наличии {data_detail?.quantity}</p>
          </div>
          <p className="mt-[20px] mb-[10px]">Цена:</p>
          <div className="flex gap-[30px] mb-[20px] items-center">
            <p className="font-bold text-[20px]">{sale * count} сум</p>
            <p
              className="text-[#000000ad] font-medium"
              style={{ textDecoration: "line-through" }}
            >
              {Number(product?.price)} сум
            </p>
            <p className="bg-[yellow] p-1 font-medium">Распродажа</p>
          </div>
          <Detail_modal getData={getData} data={data_detail} title={'Update'}/>
          <div className="border rounded-xl px-[10px] py-[15px] mt-[25px]">
            <div className="mb-[10px]">
              <p className="font-semibold">Быстрая доставка от 1 дня</p>
              <p className="text-[15px] text-[#000000a1]">
                В пункты выдачи Uzum или курьером
              </p>
            </div>
            <hr />
            <div className="mt-[10px] mb-[10px]">
              <p className="font-semibold">
                Безопасная оплата удобным способом
              </p>
              <p className="text-[15px] text-[#000000a1]">
                Оплачивайте картой, наличными или в рассрочку
              </p>
            </div>
            <hr />
            <div className="mt-[10px]">
              <p className="font-semibold">Простой и быстрый возврат</p>
              <p className="text-[15px] text-[#000000a1]">
                Примем товары в течение 10 дней и сразу вернём деньги
              </p>
            </div>
          </div>
          <div className="mt-[20px] flex gap-[10px] px-[20px] py-[10px] bg-[#FFF8E6]">
            <ShoppingOutlined className="text-[22px]" />
            <p>371 человек купил на этой неделе</p>
          </div>
          
          <p className="mt-[30px] mb-[10px]">Кратко о товаре:</p>
          <ul>
            <li>Цвет: {data_detail.colors}</li>
          </ul>
        </div>
      </div> : <div className="w-[300px] border p-[20px] mx-auto">
      <div className="flex justify-between items-center">
        <p>name:</p>
        <p className="font-bold text-[19px]">{product?.name}</p>
      </div>
      <div className="flex justify-between items-center mb-[20px]">
        <p>price:</p>
        <p className="font-bold text-[19px]">{product?.price}</p>
      </div>
      <Detail_modal getData={getData} title={'Create Product Detail'}/>
        </div>}
    </>
  );
}

export default Index;

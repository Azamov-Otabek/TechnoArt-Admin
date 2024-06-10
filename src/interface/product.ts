export interface data_products{
    id: number;
    createdAt: string;
    lastupdated: string;
    name: string;
    price: string;
} 

export interface post_product{
    name: string;
    price: number;
    category_id: number;
    brand_category_id: number;
    brand_id: number;
}

export interface get_Data{
    page: number;
    limit: number;
    search: string;
    id: number;
}

export interface delete_product{
    id: number;
}

export interface patch_product{
    id: number;
    data: post_product
}


export interface Product_Request{
    count: number;
    data_product: data_products[];
    post_product: (data: post_product) => any;
    delete_product: (data: delete_product) => any;
    put_product: (data: patch_product) => any;
    get_product: (data: get_Data) => any;
    get_Product_id: (data: number) => any
}
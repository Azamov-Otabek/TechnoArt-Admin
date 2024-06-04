export interface post_brand{
    brand_name: string;
    brand_description: string;
    position: number;
    image: string;
}


export interface data_brand extends post_brand{
    id: number | null;
}


export interface delete_brand{
    id: number | null;
}

export interface Brand_Request{
    data_brand: data_brand[];
    post_brand: (data: post_brand) => any;
    delete_brand: (data: delete_brand) => any;
    get_brands: () => any;
    put_brand: (data: data_brand) => any;
}


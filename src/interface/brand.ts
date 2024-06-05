export interface post_brand{
    brand_name: string;
    brand_description: string;
    file: any;
}


export interface data_brand extends post_brand{
    id: number | null;
}


export interface delete_brand{
    id: number | null;
}

export interface GetDatas{
    page: number;
    limit: number;
    search: string;
}

export interface Brand_Request{
    count: number,
    data_brand: data_brand[];
    post_brand: (data: any) => any;
    delete_brand: (data: delete_brand) => any;
    get_brands: (data:GetDatas) => any;
    put_brand: (data: any) => any;
}


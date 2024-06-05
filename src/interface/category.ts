export interface createCategory{
    category_name: string;
    parent_category_id: number | null;
    positon: number | null;
}

export interface category_data extends createCategory{
    id: number | null;
}

export interface search_category_get{
    id: number | null;
}

export interface delete_category{
    id: number | null;
}


export interface patch_category{
    name: string;
    parent_category_id: number | null;
}

export interface update_category{
    data: patch_category;
    id: number | null;
}

export interface GetDatas{
    page: number;
    limit: number;
    search: string;
}

export interface Category_Request{
    data_category: category_data[],
    count: number;
    get_all_category: (data:GetDatas) => any;
    get_all_subcategory: (data: search_category_get) => any;
    get_id_category: (data: search_category_get) => any;
    create_category: (data: createCategory) => any
    put_category: (data: update_category) => any;
    delete_category: (data: delete_category) => any;
}
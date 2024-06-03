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

export interface update_category{
    data: category_data
}

export interface Category_Request{
    data_category: category_data[],
    get_all_category: () => any;
    get_all_subcategory: (data: search_category_get) => any;
    get_id_category: (data: search_category_get) => any;
    create_category: (data: createCategory) => any
    put_category: (data: category_data) => any;
    delete_category: (data: delete_category) => any;
}
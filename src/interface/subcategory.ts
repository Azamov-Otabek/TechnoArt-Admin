export interface get_sub_categories{
    page: number,
    limit: number,
    search: string
    id: number
}

export interface data_subcategories{
    id: number,
    createdAt: string,
    lastUpdateAt: string,
    name: string,
    parent_category_id: {
        id: number,
        createdAt: string,
        lastUpdateAt: string,
        name: string,
    }
}

export interface createCategory{
    name: string;
    parent_category_id: number | null;
}

export interface update_subcategory extends createCategory{
    id: number;
}

export interface delete_subcategory{
    id: number;
}


export interface subcategory_request{
    data_sub_category: data_subcategories[],
    count: number,
    get_all_subcategory: (data: get_sub_categories) => any;
    create_subcategory: (data: createCategory) => any
    update_subcategory: (data: update_subcategory) => any;
    delete_subcategory: (data: delete_subcategory) => any;
}
export interface get_brand_categories{
    page: number,
    limit: number,
    search: string
    id?: number
}

export interface data_brandcategories{
    id: number,
    createdAt: string,
    lastUpdateAt: string,
    name: string,
    brand_id: {
        id: number,
        createdAt: string,
        lastUpdateAt: string,
        name: string,
        image: string,
        description: string
    }
}

export interface createCategory{
    name: string;
    brand_id: number
}

export interface update_subcategory extends createCategory{
    id: number;
}

export interface delete_subcategory{
    id: number;
}


export interface brandcategory_request{
    data_brand_category: data_brandcategories[],
    count: number,
    get_all_brandcategory: (data: get_brand_categories) => any;
    create_brandcategory: (data: createCategory) => any
    update_brandcategory: (data: update_subcategory) => any;
    delete_brandcategory: (data: delete_subcategory) => any;
}
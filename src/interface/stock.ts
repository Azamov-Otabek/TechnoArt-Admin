interface getData{
    page: number,
    limit: number
}

interface post_stock{
    category_id: number
    brand_id: number
    product_id: number
    quantity: number
}

interface data_stock{
    id: number
    brand_id: number
    quantity: number
    createdAt: string
    lastUpdateAt: string
}

interface patch_stock{
    id: number
    data: post_stock
}

interface delete_stock{
    id: number
}

export interface Stock_request{
    count: number
    data_Stock: data_stock[]
    get_Stock: (data:getData) => any
    post_Stock: (data:post_stock) => any
    put_Stock: (data:patch_stock) => any
    delete_Stock: (data:delete_stock) => any
}   


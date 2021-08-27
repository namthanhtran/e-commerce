import axiosClient from "./axiosClient";

const productApi = {
  async getAll(params){
    // transform _page to _start
    const newParams = {...params};
    newParams._start = !params._page || params._limit <= 1 ? 0 : (params._page - 1) * (params._limit || 50);
  
    // Remove un-needed keys
    delete newParams._page;

    // Fetch product list + count
    const product = await axiosClient.get('/products', {params: newParams});
    const count = await axiosClient.get('/products/count', {params: newParams});


    return {
      data: product,
      pagination: {
        page: params._page,
        limit: params._limit,
        total: count
      }
    }
  },
  get(id){
    const url = `product/${id}`;
    return axiosClient.get(url);
  }
}

export default productApi;
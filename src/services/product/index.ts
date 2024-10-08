import api from '@/lib/request'

class ProductService {
  async getAllProducts() {
    const { data } = await api.get('products')
    return data
  }
}

export default new ProductService()

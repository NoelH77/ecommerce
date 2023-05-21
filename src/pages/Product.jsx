import { Link, useParams } from 'react-router-dom'
import ProductDetail from '../components/product/ProductDetail'

const Product = () => {
 
  const {id} = useParams()

  return (
    <main>
    
      <ProductDetail productId={id} />

    </main>
  )
}

export default Product
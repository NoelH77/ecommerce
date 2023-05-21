import React, { useEffect, useState } from 'react'
import { axiosEcommerce } from '../../utils/configAxios'
import ProductCard from "../home/ProductCard";

const SimilarProduct = ({categoryId, productId}) => {

    const [similarProducts, setSimilarProducts] = useState([])

    useEffect(() => {
        if(categoryId){
            axiosEcommerce.get(`products?categoryId=${categoryId}`)
                .then((res) => {
                    const otherProducts = res.data.filter((product) => product.id !== productId)
                    setSimilarProducts(otherProducts)
                })
                .catch((err) => console.log(err))
        }
    },[categoryId, productId])

  return (
    <section className='px-2'>
        <h2 className='text-red-500 font-bold text-2xl mb-6 text-center'>Discover similar items</h2>

        <section className='grid gap-12 px-10 lg:max-w-[1000px] mx-auto 
        auto-rows-auto grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] py-4 
        grid-cols'>
            {
                similarProducts.map(product => <ProductCard key={product.id} product={product} />)
            }
        </section>
    </section>
  )
}

export default SimilarProduct
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { changeIsShowCart } from '../../store/slices/cart.slice'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
  
  const { token } = useSelector((store => store.userInfo))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickChangeShowCart = () => {
    if(!token) return navigate("/login")
    dispatch(changeIsShowCart())
  }

  return (
    <section className='flex justify-between items-center lg:border-b-2'>
      <Link to="/" >
        <h1 className='font-bold text-red-500 text-2xl lg:text-3xl pl-5'>e-commerce</h1>
      </Link>

      <nav className='flex text-2xl text-gray-400 
      font-bold text-center '>
        <Link to="/login" >
         <div className='p-4 w-48 lg:border-x-[1px] max-[700px]:w-16'>
          <i className='bx bx-user'></i>
         </div>
        </Link>
        <Link to="/purchases" >
          <div className='p-4 w-48 lg:border-x-[1px] max-[700px]:w-16'>
            <i className='bx bxs-box'></i>
          </div>
        </Link>
        <button onClick={handleClickChangeShowCart}>
          <div className='p-4 w-48 lg:border-x-[1px] max-[700px]:w-16'>
            <i className='bx bx-cart'></i>
          </div>
        </button>
      </nav>
    </section>
  )
}

export default Header
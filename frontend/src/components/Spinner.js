import React, { useEffect, useState } from 'react'
import loading from "../image/loading.gif"
import { useNavigate, useLocation } from 'react-router-dom'

const Spinner = () => {
    const [count, setCount] = useState(5)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prevValue) => --prevValue);
        },1000);
        count === 0 && navigate('/login', {
          state: location.pathname
        });
        return () => clearInterval(interval)
    }, [count, navigate, location])

  return (
    <>
    <div className='text-center'>
        <img style={{width: '100px', paddingTop: "40vh"}} src= {loading} alt='loading' />
        <h1>Redirecting to you in {count} Secand</h1>
        </div>
    </>
  )
}

export default Spinner

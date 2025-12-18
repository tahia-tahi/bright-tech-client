import React from 'react';
import { useNavigate } from 'react-router';
import user_group from '../assets/user_group.png'

const Banner = () => {
    const navigate = useNavigate()
    return (
        <div
            style={{ backgroundImage: `url(${"/src/assets/banner-bg.png"})` }}
            className="
    px-4 sm:px-20 xl:px-32 
    min-h-screen bg-cover bg-center bg-no-repeat
    flex flex-col justify-center
  "
        >


            <div className='text-center mb-6'>
                <h1 className='text-3xl sm:text-5xl md:6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>Read Peoples' Thought <br></br> with <span className=' text-primary'> Blog Sphere</span></h1>
                <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-white'>Transform your tech learnings with our platform. Write blog posts, learn and enhance your knowledge.</p>
            </div>

            <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs '>
                <button onClick={() => navigate('/auth/signup')} className='bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer'>Start Now</button>
                <button className='bg-white text-primary px-10 py-3 rounded-lg border border-gray-300 hover:scale-102 active:scale-95 transition cursor-pointer'>Read Posts</button>
            </div>

            <div className='flex items-center mt-8 gap-4 text-white mx-auto'>
                <img src={user_group} alt="" className='h-8' />Trusted by 10k+ people
            </div>

        </div>
    )
}

export default Banner;
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination } from 'swiper/modules'
import Slide from './Slide'

export default function Banner() {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}

                modules={[Autoplay, Pagination]}
                className='mySwiper rounded-xl'
            >
                <SwiperSlide>
                    <Slide
                        image={'https://i.ibb.co/CWXFSTJ/1-1.jpg'}

                        text2='Revolutionary AI Tools for the Modern Age'
                        textp='Discover the power of artificial intelligence with our cutting-edge tools designed to streamline your workflow and enhance productivity.'
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={'https://i.ibb.co/7YRN7yq/2.jpg'}

                        text2='Innovative Mobile Apps for Every Need'
                        textp='Explore our wide range of mobile applications tailored to meet your personal and professional demands, available for both Android and iOS.'
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={'https://i.ibb.co/cwhFmZF/3.jpg'}

                        text2='Versatile Software Solutions and Engaging Games'
                        textp='From business applications to entertaining games, find the perfect software solutions to boost your efficiency and enjoyment.'
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
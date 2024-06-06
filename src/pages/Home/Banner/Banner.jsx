// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination } from 'swiper/modules'
import Slide from './Slide'

import bgimg1 from '../../../assets/banner/1.jpg'
import bgimg2 from '../../../assets/banner/2.jpg'
import bgimg3 from '../../../assets/banner/3.jpg'

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
                        image={bgimg1}

                        text2='Affordable Price For Car Servicing'
                        textp='There are many variations of passages of  available, but the majority have suffered alteration in some form'
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={bgimg2}

                        text2='Affordable Price For Car Servicing'
                        textp='There are many variations of passages of  available, but the majority have suffered alteration in some form'
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={bgimg3}

                        text2='Affordable Price For Car Servicing'
                        textp='There are many variations of passages of  available, but the majority have suffered alteration in some form'
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
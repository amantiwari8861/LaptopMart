// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


function HeroSlider() {
    return (
        <Swiper
            slidesPerView={1}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            loop={true}
            modules={[Autoplay, Pagination, Navigation]}
        >
            <SwiperSlide>
                <img src="https://mylaptopspares.com/cdn/shop/files/acer_adapter_main_banner.jpg" alt="" />
            </SwiperSlide>

            <SwiperSlide>
                <img src="https://mylaptopspares.com/cdn/shop/files/dell_battery_main_banner.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://mylaptopspares.com/cdn/shop/files/lapgrade_main_banner_1.jpg" alt="" />
            </SwiperSlide>

        </Swiper>
    );
};
export default HeroSlider
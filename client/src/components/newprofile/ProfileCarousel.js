import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import icon from '../../img/icon.png';
import img1 from '../../img/showcase.jpg';
import img2 from '../../img/showcase2.jpg';
import img3 from '../../img/showcase3.jpg';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import 'swiper/css';

import './profile.css';

const imgs = [img1, img2, img3];

const ProfileCarousel = () => {
  return (
    <Swiper
      modules={[Autoplay, EffectCoverflow, Pagination]}
      onSwiper={(swiper) => (window.swiper = swiper)}
      threshold={2}
      spaceBetween={10}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={2}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      className='swiper'
      loop={true}
    >
      {imgs.map((i, index) => (
        <SwiperSlide className='slide' key={index}>
          <img
            src={i}
            alt='ProjectImages'
            style={{
              color: '#e31616',
              objectFit: 'contain',
              borderRadius: '18px',
            }}
          ></img>
          <h1 className='carousel-text'>ProHub {index}</h1>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

ProfileCarousel.propTypes = {};

export default ProfileCarousel;

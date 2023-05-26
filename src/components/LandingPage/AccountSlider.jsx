import React, { useEffect } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import "./AccountSlider.scss"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const AccountSlider = () => {
  useEffect(() => {
    const swiper = new Swiper('.blog-slider', {
      autoplay: {
        delay: 5000,
      },
      spaceBetween: 30,
      effect: 'fade',
      loop: true,
      mousewheel: {
        invert: false,
      },
      pagination: {
        el: '.blog-slider__pagination',
        clickable: true,
      },
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <div className='ehemehem'>
    <div className="blog-slider">
      <div className="blog-slider__wrp swiper-wrapper">
        <div className="blog-slider__item swiper-slide">
          <div className="blog-slider__img">
            <img src="https://www.masterpiecehospital.com/wp-content/uploads/resized/b22cd2c9a5a5f0e6b227729f2bb5bca5/Ads-Nov-boost_%E0%B9%91%E0%B9%99%E0%B9%91%E0%B9%91%E0%B9%90%E0%B9%96_0001.jpg" alt="" />
          </div>
          <div className="blog-slider__content">
            <span className="blog-slider__code">26 December 2019</span>
            <div className="blog-slider__title">Lorem Ipsum Dolor</div>
            <div className="blog-slider__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?</div>
            <a href="#" className="blog-slider__button">READ MORE</a>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="blog-slider__img">
            <img src="https://www.masterpiecehospital.com/wp-content/uploads/resized/5d990fd5dc6e159a581c9f89ec0b2fbc/Ads-Nov-boost_%E0%B9%91%E0%B9%99%E0%B9%91%E0%B9%91%E0%B9%90%E0%B9%96_0002.jpg" alt="" />
          </div>
          <div className="blog-slider__content">
            <span className="blog-slider__code">26 December 2019</span>
            <div className="blog-slider__title">Lorem Ipsum Dolor2</div>
            <div className="blog-slider__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?</div>
            <a href="#" className="blog-slider__button">READ MORE</a>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="blog-slider__img">
            <img src="https://www.masterpiecehospital.com/wp-content/uploads/resized/673a6d2cd04a4ca61d896f4363c9b000/Ads-Nov-boost_%E0%B9%91%E0%B9%99%E0%B9%91%E0%B9%91%E0%B9%90%E0%B9%96_0003.jpg" alt="" />
          </div>
          <div className="blog-slider__content">
            <span className="blog-slider__code">26 December 2019</span>
            <div className="blog-slider__title">Lorem Ipsum Dolor</div>
            <div className="blog-slider__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?</div>
            <a href="#" className="blog-slider__button">READ MORE</a>
          </div>
        </div>
        {/* Add more slides here */}
      </div>
      <div className="blog-slider__pagination"></div>
    </div>
    </div>
  );
};

export default AccountSlider;

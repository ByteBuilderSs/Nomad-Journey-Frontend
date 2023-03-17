import { useState } from "react"

const Slider = ({slides}) => {

    const [currentIndex, setCurrentIndex] = useState(0)

    const sliderStyles = {
        height : "100%",
        position : "relative" ,
    }

    const slideStyles = {
        width : '100%',
        height : '100%',
        borderRadius : '10px',
        backgroundPosition : 'center',
        backgroundSize : 'cover',
        backgroundImage : `url(${slides[currentIndex].url})`
    }

    const leftArrowStyles = {
        position : "absolute",
        top : "50%",
        transform : "translate(0, -50%)",
        left : '32px',
        fontSize : '45px',
        color : '#fff',
        zIndex : 1,
        cursor : "pointer",
    }

    const rightArrowStyles = {
        position : "absolute",
        top : "50%",
        transform : "translate(0, -50%)",
        right : '32px',
        fontSize : '45px',
        color : '#fff',
        zIndex : 1,
        cursor : "pointer",
    }

    const dotsContainerStyles = {
        display : "flex", 
        justifyContent : "center"

    }

    const dotStyles = {
        margin : '0 5px',
        cursor : 'pointer',
        fontSize : '20px'
    }

    const gotoPrevious = () => {
        const isFirstSlide = currentIndex === 0 ;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1 ;
        setCurrentIndex(newIndex)
    }

    const gotoNext = () => {
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    const gotoSlide = (slideIndex) => {
        setCurrentIndex(slideIndex)
    }

    return(
        <div style = {sliderStyles}>
            <div style = {leftArrowStyles} onClick = {gotoPrevious}>❰</div>
            <div style = {rightArrowStyles} onClick = {gotoNext}>❱</div>
            <div style = {slideStyles}></div>
            <div style = {dotsContainerStyles}>
                {slides.map((slide, slideIndex) => {
                    return(
                        <div
                            key = {slideIndex} 
                            style = {dotStyles} 
                            onClick = {() => gotoSlide(slideIndex)}
                        >
                            ●
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Slider
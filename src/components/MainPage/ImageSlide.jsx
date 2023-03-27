import * as React from 'react';
import "./ImageSlide.scss"
import { Button } from '@material-ui/core';
// const Slider = ({slides}) => {

//     const [currentIndex, setCurrentIndex] = useState(0)

//     const sliderStyles = {
//         height : "100%",
//         position : "relative" ,
//     }

//     const slideStyles = {
//         width : '100%',
//         height : '100%',
//         borderRadius : '10px',
//         backgroundPosition : 'center',
//         backgroundSize : 'cover',
//         backgroundImage : `url(${slides[currentIndex].url})`
//     }

//     const leftArrowStyles = {
//         position : "absolute",
//         top : "50%",
//         transform : "translate(0, -50%)",
//         left : '32px',
//         fontSize : '45px',
//         color : '#fff',
//         zIndex : 1,
//         cursor : "pointer",
//     }

//     const rightArrowStyles = {
//         position : "absolute",
//         top : "50%",
//         transform : "translate(0, -50%)",
//         right : '32px',
//         fontSize : '45px',
//         color : '#fff',
//         zIndex : 1,
//         cursor : "pointer",
//     }

//     const dotsContainerStyles = {
//         display : "flex", 
//         justifyContent : "center"

//     }

//     const dotStyles = {
//         margin : '0 5px',
//         cursor : 'pointer',
//         fontSize : '20px'
//     }

//     const gotoPrevious = () => {
//         const isFirstSlide = currentIndex === 0 ;
//         const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1 ;
//         setCurrentIndex(newIndex)
//     }

//     const gotoNext = () => {
//         const isLastSlide = currentIndex === slides.length - 1
//         const newIndex = isLastSlide ? 0 : currentIndex + 1
//         setCurrentIndex(newIndex)
//     }

//     const gotoSlide = (slideIndex) => {
//         setCurrentIndex(slideIndex)
//     }

//     return(
//         <div style = {sliderStyles}>
//             <div style = {leftArrowStyles} onClick = {gotoPrevious}>❰</div>
//             <div style = {rightArrowStyles} onClick = {gotoNext}>❱</div>
//             <div style = {slideStyles}></div>
//             <div style = {dotsContainerStyles}>
//                 {slides.map((slide, slideIndex) => {
//                     return(
//                         <div
//                             key = {slideIndex} 
//                             style = {dotStyles} 
//                             onClick = {() => gotoSlide(slideIndex)}
//                         >
//                             ●
//                         </div>
//                     )
//                 })}
//             </div>
//         </div>
//     )
// }

// export default Slider

const slides = [
    {
      title: "Tehran",
      subtitle: "Iran",
      description: "Adventure is never far away",
      image:"http://localhost:3000/Tehran.jpeg"
        
    },
    {
      title: "Chamonix",
      subtitle: "France",
      description: "Let your dreams come true",
      image:
        "https://images.unsplash.com/photo-1581836499506-4a660b39478a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
    },
    {
      title: "Mimisa Rocks",
      subtitle: "Australia",
      description: "A piece of heaven",
      image:
        "https://images.unsplash.com/photo-1566522650166-bd8b3e3a2b4b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
    },
    {
      title: "Four",
      subtitle: "Australia",
      description: "A piece of heaven",
      image:
        "https://images.unsplash.com/flagged/photo-1564918031455-72f4e35ba7a6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
    },
    {
      title: "Five",
      subtitle: "Australia",
      description: "A piece of heaven",
      image:
        "https://images.unsplash.com/photo-1579130781921-76e18892b57b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
    }
  ];
  
  function useTilt(active) {
    const ref = React.useRef(null);
  
    React.useEffect(() => {
      if (!ref.current || !active) {
        return;
      }
  
      const state = {
        rect: undefined,
        mouseX: undefined,
        mouseY: undefined
      };
  
      let el = ref.current;
  
      const handleMouseMove = (e) => {
        if (!el) {
          return;
        }
        if (!state.rect) {
          state.rect = el.getBoundingClientRect();
        }
        state.mouseX = e.clientX;
        state.mouseY = e.clientY;
        const px = (state.mouseX - state.rect.left) / state.rect.width;
        const py = (state.mouseY - state.rect.top) / state.rect.height;
  
        el.style.setProperty("--px", px);
        el.style.setProperty("--py", py);
      };
  
      el.addEventListener("mousemove", handleMouseMove);
  
      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
      };
    }, [active]);
  
    return ref;
  }
  
  const initialState = {
    slideIndex: 0
  };
  
  const slidesReducer = (state, event) => {
    if (event.type === "NEXT") {
      return {
        ...state,
        slideIndex: (state.slideIndex + 1) % slides.length
      };
    }
    if (event.type === "PREV") {
      return {
        ...state,
        slideIndex:
          state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1
      };
    }
  };
  
  function Slide({ slide, offset }) {
    const active = offset === 0 ? true : null;
    const ref = useTilt(active);
  
    return (
      <div
        ref={ref}
        className="slide"
        data-active={active}
        style={{
          "--offset": offset,
          "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1
        }}
      >
        <div
          className="slideBackground"
          style={{
            backgroundImage: `url('${slide.image}')`
          }}
        />
        <div
          className="slideContent"
          style={{
            backgroundImage: `url('${slide.image}')`
          }}
        >
          <div className="slideContentInner">
            <h2 className="slideTitle">{slide.title}</h2>
            <h3 className="slideSubtitle">{slide.subtitle}</h3>
            <p className="slideDescription">{slide.description}</p>
            <h2 className='slidebutton'> <Button variant="contained">Explore</Button> </h2>
          </div>
        </div>
      </div>
    );
  }
  
  export default function App() {

    const [state, dispatch] = React.useReducer(slidesReducer, initialState);
  
    return (
      <div className="slides">
        <button onClick={() => dispatch({ type: "NEXT" })}>‹</button>
  
        {[...slides, ...slides, ...slides].map((slide, i) => {
          let offset = slides.length + (state.slideIndex - i);
          return <Slide slide={slide} offset={offset} key={i} />;
        })}
        <button onClick={() => dispatch({ type: "PREV" })}>›</button>
      </div>
    );

  }

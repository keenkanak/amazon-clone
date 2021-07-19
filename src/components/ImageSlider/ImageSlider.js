import React, { useState, useEffect } from "react";
import "./ImageSlider.css";
import { ImageData } from "./ImageData";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const length = ImageData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    }, 6000);
    return () => {
      clearTimeout(identifier);
    };
  }, [current]);

  return (
    <section className="slider">
      <AiFillCaretLeft className="left-arrow" onClick={prevSlide} />
      <AiFillCaretRight className="right-arrow" onClick={nextSlide} />
      {ImageData.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img className="home__slider" src={slide.image} alt="" />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;

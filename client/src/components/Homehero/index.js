import React from 'react';
import './homehero.css';

const image = require('../../assets/Tutoring.gif');

const HomeHero = (params) => {
    //get bgColor from parent component
    const bgColor = params.bgColor;
    return (
        <>
            <section
                className="bg-blue"
                ref={(el) => {
                    if (el) {
                        el.style.setProperty(
                            "background-color",
                            bgColor,
                            "important"
                        );
                    }
                }}
                style={{ overflow: "hidden" }}
            >
                 <h1 className="display-2">
                                The <b>first place</b> to look when you
                                    study.
                    </h1>
                        <span >
                        <img src={image} alt='books' />
                    </span>
            
                </section>    
        </>
    );
};

export default HomeHero;



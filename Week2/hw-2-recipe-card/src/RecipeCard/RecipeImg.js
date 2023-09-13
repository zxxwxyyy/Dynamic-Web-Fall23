import React from "react";

export default function RecipeImg(props){
    const {imgSrc} = props
    return(
        <img src={imgSrc} className='img' alt="Chicken Wings with Salted Egg Yoke" />
    )
}
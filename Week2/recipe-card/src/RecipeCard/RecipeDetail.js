import React from "react";

export default function RecipeDetail(props){
    const{prepTime, cookTime, Serving} = props
    return (
        <div>
            <h3 className="detail-title">Prep Time</h3>
            <p className="detail-text">{prepTime}</p>
            <h3 className="detail-title">Cook Time</h3>
            <p className="detail-text">{cookTime}</p>
            <h3 className="detail-title">Serving</h3>
            <p className="detail-text">{Serving}</p>
        </div>
    )
}
import React from "react";

export default function RecipeInfo(props){
    const{title, description} = props
    return (
        <div>
            <div className="title">
                <h1 className="title-text">{title}</h1>
            </div>
            <p className="description">{description}</p>

        </div>
    )
}
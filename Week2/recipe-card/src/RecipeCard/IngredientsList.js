import React from "react";

export default function IngredientsList(props){
    const {ingredients} = props
    return(
        <div className="ingredients">
            <h3 className="ingredients-title">Ingredients</h3>
            <ol className="ingredients-list">
                {ingredients.map((i, index) => (
                <li key={index} className="ingredients-text">{i}</li>
                ))}
            </ol>
        </div>
    )
}
import React from "react";

export default function InstructionsList(props){
    const {instructions} = props
    return(
        <div className="instructions">
            <h3 className="instructions-title">Instructions</h3>
            <ol className="instructions-list">
                {instructions.map((i, index) => (
                <li key={index} className="instructions-text">{i}</li>
                ))}
            </ol>
        </div>
    )
}
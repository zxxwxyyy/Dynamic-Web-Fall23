import React from 'react'
import { RECIPE } from './recipe-data'
import RecipeInfo from './RecipeInfo'
import Card from './Card'
import RecipeImg from './RecipeImg'
import InstructionsList from './InstructionsList'
import IngredientsList from './IngredientsList'
import RecipeDetail from './RecipeDetail'
import './recipecard.css'

export default function RecipeCard(){
    return (
        <>
            <Card>
                <RecipeImg imgSrc={RECIPE.imgSrc} />
                <div className='contents'>
                    <RecipeInfo title={RECIPE.title} description={RECIPE.description} />
                    <div className='instructions-ingredients-container'>
                        <IngredientsList ingredients={RECIPE.ingredients} />
                        <InstructionsList instructions={RECIPE.instructions} />
                        <RecipeDetail prepTime={RECIPE.prepTime} cookTime={RECIPE.cookTime} Serving={RECIPE.Serving}/>
                    </div>
                </div>
            </Card>
        </>
    )
}

import React, { useState } from 'react'
import RecipeInfo from './RecipeInfo'
import RecipeImg from './RecipeImg'
import IngredientsList from './IngredientsList'
import InstructionsList from './InstructionsList'
import Card from './Card'
import UserRating from './UserRating'
import styles from './RecipeCard.module.css'

export default function RecipeCard(props) {
  const { recipe, isExpanded, onExpand, expandedCard, index } = props;
  // State to track the current rating value
  const [rating, setRating] = useState(0)
  return (
    <>
      <Card className={`
          ${styles.card} 
          ${expandedCard !== index ? styles.dimmed : ''}`
          } onClick={onExpand}>
        <RecipeImg imgSrc={recipe.imgSrc} />
        <div className={styles.recipe_wrapper}>
          {/* Display the star rating on preview(not clickable on the non-expanded card) */}
          <UserRating value={rating} onChange={(value) => setRating(value)} isClickable = {isExpanded} />
          <RecipeInfo title={recipe.title} description={recipe.description} />
        </div>
      </Card>

      {isExpanded && (
        <Card className={`${styles.card} ${styles.expanded}`} onClick={onExpand}>
          <RecipeImg imgSrc={recipe.imgSrc} />
          <div className={styles.recipe_wrapper}>
            <UserRating value={rating} onChange={(value) => setRating(value)} isClickable = {isExpanded} />
            <RecipeInfo title={recipe.title} description={recipe.description} />
            <div className={styles.recipe_details}>
              <IngredientsList ingredients={recipe.ingredients} />
              <InstructionsList instructions={recipe.instructions} />
            </div>
            {/* <UserRating value={rating} onChange={(value) => setRating(value)} /> */}
          </div>
        </Card>
      )}
    </>
  );
}

import React from 'react'
import RecipeCard from './RecipeCard'
import {RECIPE_LIST} from './RecipeCard/recipe-data'
import styles from './RecipeCard/RecipeCard.module.css'
import { useState } from 'react'

function App() {
  const [expandedCard, setExpandedCard] = useState(null);
  return (
    <div className={styles.card_container}>
      {RECIPE_LIST.map((recipe, index) => (
        <RecipeCard 
        recipe={recipe} 
        key={index} 
        index={index}
        expandedCard={expandedCard}
        isExpanded = {expandedCard === index}
        onExpand = {() => setExpandedCard(index)}
        />
      ))}
    </div>
  )
}

export default App

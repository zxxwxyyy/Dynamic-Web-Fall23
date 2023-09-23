import {useState} from 'react'
import styles from './RecipeCard.module.css'
import Star from './star'

export default function UserRating(props) {
  // array destructuring, this is a nice way to access a piece of state and its setting
  // count is out piece of state
  // setCounter is our setter for count
  // useState(0) defines the initial count at 0, aka our default state for when the component loads
  const [hoverValue, setHoverValue] = useState(0)
  const { value, onChange } = props
  const handleClick = (value) => {
      onChange(value)
  }
  return (
    <div className={styles.ratings_wrapper}>
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          index={index}
          value={hoverValue || value}
          onHover={() => setHoverValue(index)}
          onLeaveHover={() => setHoverValue(0)}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  )
}

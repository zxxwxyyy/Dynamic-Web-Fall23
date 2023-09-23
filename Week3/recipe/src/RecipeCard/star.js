import React from 'react';
import { ReactComponent as FullStarIcon } from '@material-design-icons/svg/filled/star.svg';
import { ReactComponent as HalfStarIcon } from '@material-design-icons/svg/filled/star_half.svg';
import { ReactComponent as EmptyStarIcon } from '@material-design-icons/svg/filled/star_outline.svg';
import styles from './RecipeCard.module.css'

export default function Star(props) {
    const { index, value, onHover, onLeaveHover, onClick } = props;
  
    let StarIcon;
    if (value >= index) {
      StarIcon = FullStarIcon;
    } else if (value >= index - 0.5) {
      StarIcon = HalfStarIcon;
    } else {
      StarIcon = EmptyStarIcon;
    }
  
    return (
      <StarIcon
        className={styles.Star}
        onMouseEnter={onHover}
        onMouseLeave={onLeaveHover}
        onClick={onClick}
        alt="star"
      />
    );
}

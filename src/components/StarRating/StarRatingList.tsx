import { useStarRate } from '@/hooks/useStarRate/useStarRate'
import StarRatingItem from './StarRatingItem'

const StarRatingList = () => {
  const { changeStar, rates } = useStarRate()

  return (
    <div className="flex gap-2">
      {rates.map((rate, index) => (
        <StarRatingItem
          initFill={rate}
          handleChangeStar={() => changeStar(index)}
          key={index}
        />
      ))}
    </div>
  )
}

export default StarRatingList
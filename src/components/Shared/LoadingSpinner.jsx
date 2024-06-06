import PropTypes from 'prop-types'
import { ScaleLoader } from 'react-spinners'

const LoadingSpinner = () => {
    return (
        <div
            className="
      flex 
      flex-col 
      justify-center 
      items-center "
        >
            <ScaleLoader size={100} color='red' />
        </div>
    )
}

LoadingSpinner.propTypes = {
    smallHeight: PropTypes.bool,
}

export default LoadingSpinner

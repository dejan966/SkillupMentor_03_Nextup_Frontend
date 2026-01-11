import DivCentered from './DivCentered'

const LoadingCircle = () => {
  return (
    <DivCentered className="w-full">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-black border-t-transparent"></div>
    </DivCentered>
  )
}

export default LoadingCircle

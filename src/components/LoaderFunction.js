import React from "react"
import { Loader } from "semantic-ui-react"

/**
 * Displays loading action
 * @return {JSX.Element} Loading Funtion
 */
const LoaderFunction = () => (
  <Loader active size="large" className="color: blue" inline="centered" />
)

export default LoaderFunction

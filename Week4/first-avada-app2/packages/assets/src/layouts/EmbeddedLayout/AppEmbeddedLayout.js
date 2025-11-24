import React from 'react'
import PropTypes from 'prop-types'
import { useStore } from '@assets/reducers/storeReducer'
import { Frame } from '@shopify/polaris'

/**
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function AppEmbeddedLayout ({ children }) {
  const { state, dispatch } = useStore()
  const { loading, toast } = state

  return (
    <Frame>
      {children}
    </Frame>
  )
}

AppEmbeddedLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default AppEmbeddedLayout

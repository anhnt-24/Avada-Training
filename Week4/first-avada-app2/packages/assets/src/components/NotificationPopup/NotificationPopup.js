import React from 'react'
import './NoticationPopup.scss'

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hood',
  timestamp = 'a day ago',
  productImage = 'data:image/jpeg;base64,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',
  settings = {}
}) => {
  const truncateProductClass = settings.truncateProductName && 'Avada__Truncate'
  return (
    <div className="Avava-SP__Wrapper fadeInUp animated" style={{ fontFamily: settings.fontFamily }}>
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container ">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              {!settings.hideCloseIcon &&
                <div className="Avada-SP__Close-icon">
                  ×
                </div>
              }
              <div className={`Avada-SP__Title ${truncateProductClass}`}>
                {firstName} in {city}, {country}
              </div>
              <div className={`Avada-SP__Subtitle ${truncateProductClass}`}>purchased {productName}</div>
              <div className={'Avada-SP__Footer'}>
                {!settings.hideTimeAgo && timestamp}
                <span className="uni-blue">
                  <i className="fa fa-check" aria-hidden="true"/> by Avada
                </span>
              </div>

            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

NotificationPopup.propTypes = {}

export default NotificationPopup

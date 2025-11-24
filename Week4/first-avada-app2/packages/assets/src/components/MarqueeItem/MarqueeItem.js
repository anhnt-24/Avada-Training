import React from 'react'

const MarqueeItem = ({ title, subheading, typography }) => {
  return (
    <div className="marquee-item">
      <p
        style={{
          fontWeight: 'bold',
          color: typography.title.color,
          fontFamily: typography.font,
          fontSize: `${typography.title.size}px`,
          margin: 0,
          textAlign: 'center',
          whiteSpace: 'wrap'
        }}
      >
        {title || 'Your announcement text here'}
      </p>

      {subheading && (
        <p
          style={{
            color: typography.subtitle.color,
            fontSize: `${typography.subtitle.size}px`,
            fontFamily: typography.font,
            margin: '4px 0 0 0',
            textAlign: 'center',
            whiteSpace: 'wrap'
          }}
        >
          {subheading}
        </p>
      )}
    </div>
  )
}

export default MarqueeItem

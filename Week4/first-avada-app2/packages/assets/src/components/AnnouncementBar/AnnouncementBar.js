import React from 'react'
import MarqueeItem from '@assets/components/MarqueeItem/MarqueeItem'
import './AnnoucementBar.scss'

const AnnouncementBar = ({ form, onClose, announcement }) => {

  const buttonBackground =
    form.design.button.background.type === 'gradient'
      ? `linear-gradient(${form.design.button.background.angle}deg, ${form.design.button.background.colors.join(', ')})`
      : form.design.button.background.colors[0]

  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
      <div className="marquee-container" style={{ flex: form.content.type === 'running' && 1 }}>
        {form.content.type === 'running' &&
          <div className="marquee-wrapper">
            {[0, 1, 2].map(i => (
              <MarqueeItem
                key={i}
                title={form.content.title}
                subheading={form.content.subheading}
                typography={form.design.typography}
              />
            ))}
          </div>
        }
        {form.content.type === 'simple' &&
          <MarqueeItem
            title={form.content.title}
            subheading={form.content.subheading}
            typography={form.design.typography}
          />
        }
        {form.content.type === 'rotating' &&
          <MarqueeItem
            title={announcement.title}
            subheading={announcement.subheading}
            typography={form.design.typography}

          />
        }

      </div>

      {form.content.cta.type === 'button' && (
        <button
          style={{
            fontWeight: 'semibold',
            background: buttonBackground,
            border: `${form.design.button.border.size}px solid ${form.design.button.border.color}`,
            borderRadius: form.design.button.cornerRadius,
            color: form.design.button.background.colors[1],
            fontSize: `${form.design.button.size}px`,
            padding: '6px 16px',
          }}
        >
          {form.content.cta.textBtn || 'Click me'}
        </button>
      )}
    </div>

  )
}

export default AnnouncementBar

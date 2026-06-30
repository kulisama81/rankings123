import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at 50% 30%, rgba(182, 242, 60, 0.15) 0%, #0a0b0f 100%)',
          position: 'relative',
        }}
      >
        {/* Outer ring for premium badge feel */}
        <div
          style={{
            position: 'absolute',
            width: '168px',
            height: '168px',
            borderRadius: '84px',
            border: '3px solid rgba(182, 242, 60, 0.6)',
            display: 'flex',
          }}
        />

        {/* "123" numerals - ascending diagonal layout */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: '24px',
          }}
        >
          {/* "1" - top left, smaller */}
          <div
            style={{
              position: 'absolute',
              top: '30px',
              left: '28px',
              fontSize: '38px',
              fontWeight: 900,
              color: '#ffffff',
              opacity: 0.75,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            1
          </div>

          {/* "2" - middle center, medium */}
          <div
            style={{
              position: 'absolute',
              top: '65px',
              left: '58px',
              fontSize: '48px',
              fontWeight: 900,
              color: '#ffffff',
              opacity: 0.85,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            2
          </div>

          {/* "3" - bottom right, largest (hero) */}
          <div
            style={{
              position: 'absolute',
              bottom: '22px',
              right: '28px',
              fontSize: '60px',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-1px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            3
          </div>

          {/* Live pulse dot - top right corner */}
          <div
            style={{
              position: 'absolute',
              top: '18px',
              right: '18px',
              width: '28px',
              height: '28px',
              background: '#ffffff',
              borderRadius: '50%',
              border: '3px solid #b6f23c',
              boxShadow: '0 0 25px rgba(182, 242, 60, 0.8), 0 0 45px rgba(182, 242, 60, 0.4)',
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '26px',
              right: '26px',
              width: '12px',
              height: '12px',
              background: '#b6f23c',
              borderRadius: '50%',
              display: 'flex',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  )
}

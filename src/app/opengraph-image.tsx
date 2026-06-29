import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Rankings123 — Live Sports Rankings'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0b0f',
          position: 'relative',
        }}
      >
        {/* Gradient accent background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 40%, rgba(182, 242, 60, 0.15), transparent 50%)',
          }}
        />

        {/* Rank Pulse icon (larger) - distinct per-sport colors */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '24px',
            marginBottom: '48px',
            position: 'relative',
          }}
        >
          {/* Bar 1 - World Cup green */}
          <div
            style={{
              width: '56px',
              height: '88px',
              background: '#22c55e',
              borderRadius: '16px',
              border: '2px solid rgba(0,0,0,0.15)',
            }}
          />
          {/* Bar 2 - WTA magenta */}
          <div
            style={{
              width: '56px',
              height: '143px',
              background: '#f472b6',
              borderRadius: '16px',
              border: '2px solid rgba(0,0,0,0.15)',
            }}
          />
          {/* Bar 3 - ATP lime */}
          <div
            style={{
              width: '56px',
              height: '220px',
              background: '#b6f23c',
              borderRadius: '16px',
              border: '2px solid rgba(0,0,0,0.15)',
            }}
          />
          {/* Pulse dot */}
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              right: '12px',
              width: '40px',
              height: '40px',
              background: '#ffffff',
              borderRadius: '50%',
              border: '3px solid #b6f23c',
              boxShadow: '0 0 40px rgba(182, 242, 60, 0.9), 0 0 80px rgba(182, 242, 60, 0.5)',
            }}
          />
        </div>

        {/* Brand text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: '96px',
              fontWeight: 900,
              color: '#f5f7fa',
              letterSpacing: '-0.02em',
            }}
          >
            RANKINGS 123
          </div>
          <div
            style={{
              fontSize: '36px',
              fontWeight: 600,
              color: '#9aa3b2',
              letterSpacing: '0.02em',
            }}
          >
            Live Sports Rankings
          </div>
          <div
            style={{
              display: 'flex',
              gap: '24px',
              marginTop: '16px',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#b6f23c',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  width: '12px',
                  height: '12px',
                  background: '#b6f23c',
                  borderRadius: '50%',
                }}
              />
              ATP/WTA
            </div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#22c55e',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  width: '12px',
                  height: '12px',
                  background: '#22c55e',
                  borderRadius: '50%',
                }}
              />
              World Cup
            </div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#fbbf24',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  width: '12px',
                  height: '12px',
                  background: '#fbbf24',
                  borderRadius: '50%',
                }}
              />
              Cycling
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}

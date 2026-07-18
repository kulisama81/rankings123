import { ImageResponse } from 'next/og'
import { getLiveData } from '@/lib/liveFeed'

export const runtime = 'edge'
export const alt = 'WTA Live Rankings — Rankings123'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function WtaOpenGraphImage() {
  const snapshot = await getLiveData('wta')
  const topPlayer = snapshot.players[0]

  // Sport accent color - WTA magenta
  const accentColor = '#f472b6'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0a0b0f',
          position: 'relative',
          padding: '64px',
        }}
      >
        {/* Subtle accent gradient wash */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '60%',
            height: '100%',
            background: `radial-gradient(circle at 80% 30%, ${accentColor}20, transparent 60%)`,
          }}
        />

        {/* Header: Logo + Live Dot + Sport Label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '80px',
          }}
        >
          {/* Logo text */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 800,
                color: '#f5f7fa',
                letterSpacing: '-0.02em',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              RANKINGS <span style={{ color: accentColor }}>123</span>
            </div>
          </div>

          {/* Live dot + sport label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                background: accentColor,
                borderRadius: '50%',
                boxShadow: `0 0 20px ${accentColor}80, 0 0 40px ${accentColor}40`,
              }}
            />
            <div
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#9aa3b2',
                letterSpacing: '0.05em',
              }}
            >
              WTA RANKINGS
            </div>
          </div>
        </div>

        {/* Main content: Rank + Name + Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          {/* Rank + Name */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '32px', marginBottom: '24px' }}>
            <div
              style={{
                fontSize: '160px',
                fontWeight: 900,
                color: accentColor,
                lineHeight: 1,
                fontFamily: 'system-ui',
              }}
            >
              #{topPlayer.liveRank}
            </div>
            <div
              style={{
                fontSize: '72px',
                fontWeight: 700,
                color: '#f5f7fa',
                lineHeight: 1.1,
                fontFamily: 'system-ui',
              }}
            >
              {topPlayer.name}
            </div>
          </div>

          {/* Points + Movement */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
            <div
              style={{
                fontSize: '40px',
                fontWeight: 600,
                color: '#9aa3b2',
                fontFamily: 'monospace',
              }}
            >
              {topPlayer.livePoints.toLocaleString()} points
            </div>
            {topPlayer.movement && topPlayer.movement !== 0 && (
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  color: topPlayer.movement > 0 ? '#34d399' : '#f87171',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {topPlayer.movement > 0 ? '▲' : '▼'} {Math.abs(topPlayer.movement)}
              </div>
            )}
          </div>
        </div>

        {/* Accent divider line */}
        <div
          style={{
            width: '100%',
            height: '2px',
            background: `linear-gradient(90deg, ${accentColor}, transparent)`,
            marginBottom: '32px',
          }}
        />

        {/* Footer: URL */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#9aa3b2',
          }}
        >
          rankings123.com
        </div>
      </div>
    ),
    { ...size }
  )
}

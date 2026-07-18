import { ImageResponse } from 'next/og'
import { getTdfSnapshot } from '@/lib/cyclingFeed'

export const runtime = 'edge'
export const alt = 'Tour de France 2026 Live — Rankings123'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function CyclingOpenGraphImage() {
  const tdfData = await getTdfSnapshot()

  // Get yellow jersey leader (GC leader)
  const gcLeader = tdfData.jerseys?.find(j => j.jersey === 'yellow')

  // Sport accent color - Cycling amber
  const accentColor = '#fbbf24'

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
              TOUR DE FRANCE 2026
            </div>
          </div>
        </div>

        {/* Main content: Race status + Leader */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          {/* Race status / Stage */}
          <div
            style={{
              fontSize: '36px',
              fontWeight: 600,
              color: '#9aa3b2',
              marginBottom: '16px',
            }}
          >
            {tdfData.raceStatus === 'active' && tdfData.currentStage
              ? `Stage ${tdfData.currentStage}`
              : tdfData.raceStatus === 'upcoming'
                ? 'Starting July 4, 2026'
                : 'Yellow Jersey Leader'}
          </div>

          {/* Leader name or race title */}
          <div
            style={{
              fontSize: '88px',
              fontWeight: 800,
              color: '#f5f7fa',
              lineHeight: 1.1,
              marginBottom: '32px',
              fontFamily: 'system-ui',
            }}
          >
            {gcLeader?.rider || 'General Classification'}
          </div>

          {/* Team if available */}
          {gcLeader?.team && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '28px', fontWeight: 600, color: '#9aa3b2' }}>
                  Team
                </div>
                <div
                  style={{
                    fontSize: '40px',
                    fontWeight: 700,
                    color: accentColor,
                  }}
                >
                  {gcLeader.team}
                </div>
              </div>
            </div>
          )}
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

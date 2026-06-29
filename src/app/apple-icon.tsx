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
          background: '#0a0b0f',
          borderRadius: '36px',
        }}
      >
        {/* Three ascending bars with distinct per-sport colors */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', position: 'relative' }}>
          {/* Bar 1 - World Cup green (40%) */}
          <div
            style={{
              width: '32px',
              height: '48px',
              background: '#22c55e',
              borderRadius: '10px',
              border: '1.5px solid rgba(0,0,0,0.15)',
            }}
          />
          {/* Bar 2 - WTA magenta (65%) */}
          <div
            style={{
              width: '32px',
              height: '78px',
              background: '#f472b6',
              borderRadius: '10px',
              border: '1.5px solid rgba(0,0,0,0.15)',
            }}
          />
          {/* Bar 3 - ATP lime (100%) */}
          <div
            style={{
              width: '32px',
              height: '120px',
              background: '#b6f23c',
              borderRadius: '10px',
              position: 'relative',
              border: '1.5px solid rgba(0,0,0,0.15)',
            }}
          />
          {/* Pulse dot with glow */}
          <div
            style={{
              position: 'absolute',
              top: '-18px',
              right: '8px',
              width: '24px',
              height: '24px',
              background: '#ffffff',
              borderRadius: '50%',
              border: '2px solid #b6f23c',
              boxShadow: '0 0 20px rgba(182, 242, 60, 0.9), 0 0 40px rgba(182, 242, 60, 0.5)',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  )
}

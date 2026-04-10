import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Beyond Borders – Immigration & Study Abroad Consultants'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a3faa 0%, #e8321a 60%, #f97316 100%)',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Logo badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '18px',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              fontWeight: 900,
              color: '#1a3faa',
            }}
          >
            BB
          </div>
          <span style={{ color: 'white', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px' }}>
            BEYOND BORDERS
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            color: 'white',
            fontSize: '64px',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '24px',
            maxWidth: '900px',
          }}
        >
          Your Dream of Living Abroad{' '}
          <span style={{ color: '#f97316' }}>Starts Here</span>
        </div>

        {/* Subtext */}
        <div
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '26px',
            fontWeight: 400,
            maxWidth: '780px',
            lineHeight: 1.4,
            marginBottom: '48px',
          }}
        >
          India's trusted immigration & study abroad consultancy. 5000+ visas approved.
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', gap: '24px' }}>
          {['✅ 5000+ Visas', '✅ 98% Success Rate', '✅ Free Assessment'].map((item) => (
            <div
              key={item}
              style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50px',
                padding: '12px 24px',
                color: 'white',
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Domain watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '80px',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '20px',
          }}
        >
          beyondbordersimmigration.in
        </div>
      </div>
    ),
    { ...size },
  )
}

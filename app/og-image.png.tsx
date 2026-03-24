import { ImageResponse } from 'next/og';

// Route metadata
export const runtime = 'edge';

// Image metadata
export const alt = 'Nimish Juvekar — Lecturer & Industry Expert at University of East London';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1A1A2E 0%, #0A66C2 50%, #1A1A2E 100%)',
          position: 'relative',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.3,
          }}
        />
        
        {/* Content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            padding: '60px',
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: 16,
              letterSpacing: '-0.02em',
            }}
          >
            Nimish Juvekar
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: '#E0ECFA',
              marginBottom: 40,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Lecturer & Industry Expert
          </div>

          {/* Institution */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '16px 32px',
              borderRadius: 12,
              backdropFilter: 'blur(10px)',
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                backgroundColor: '#0A66C2',
                borderRadius: '50%',
              }}
            />
            <div
              style={{
                fontSize: 24,
                fontWeight: 500,
                color: '#FFFFFF',
              }}
            >
              University of East London
            </div>
          </div>

          {/* Credentials */}
          <div
            style={{
              marginTop: 32,
              fontSize: 20,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.1em',
            }}
          >
            AFHEA · MSc · fCMgr · 15+ Years Experience
          </div>
        </div>

        {/* Decorative corner */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 300,
            height: 300,
            background: 'linear-gradient(135deg, transparent 50%, rgba(10,102,194,0.3) 50%)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

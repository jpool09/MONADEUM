"use client";

const EMBER_COLORS = ["#FF6B35", "#7C3AED", "#FFD700", "#A855F7", "#FF4500"];

function generateEmbers(count: number) {
  const embers = [];
  for (let i = 0; i < count; i++) {
    const n = i * 17 + 7;
    embers.push({
      x: `${((n * 23 + 11) % 100)}%`,
      startY: 80 + ((n * 13) % 20),
      size: 2 + ((n * 7) % 4),
      duration: 4 + ((n * 11) % 6),
      delay: ((n * 3) % 50) / 10,
      drift: -15 + ((n * 19) % 30),
      color: EMBER_COLORS[i % EMBER_COLORS.length],
      opacity: 0.4 + ((n * 5) % 6) / 10,
    });
  }
  return embers;
}

const embers = generateEmbers(35);

export function EmberParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {embers.map((ember, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: ember.x,
            bottom: `${ember.startY}%`,
            width: ember.size,
            height: ember.size,
            backgroundColor: ember.color,
            boxShadow: `0 0 ${ember.size * 3}px ${ember.color}`,
            opacity: ember.opacity,
            animation: `ember-rise ${ember.duration}s ease-out ${ember.delay}s infinite`,
            ["--ember-drift" as string]: `${ember.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

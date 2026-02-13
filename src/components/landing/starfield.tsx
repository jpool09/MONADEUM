"use client";

const colors = ["#7C3AED", "#A855F7", "#C084FC"];

function generateStars(count: number, seed: number) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const n = seed * 1000 + i;
    stars.push({
      x: `${((n * 17 + 31) % 97)}%`,
      y: `${((n * 13 + 47) % 93)}%`,
      size: 1 + ((n * 7) % 3) * 0.5,
      delay: `${((n * 11) % 40) / 10}s`,
      dur: `${3 + ((n * 19) % 25) / 10}s`,
      anim: 1 + ((n * 3) % 3),
      color: colors[(n * 5) % 3],
    });
  }
  return stars;
}

const defaultStars = generateStars(25, 1);
const denseStars = generateStars(60, 2);

export function Starfield({ dense = false }: { dense?: boolean }) {
  const stars = dense ? denseStars : defaultStars;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}60`,
            animation: `twinkle-${star.anim} ${star.dur} ease-in-out ${star.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

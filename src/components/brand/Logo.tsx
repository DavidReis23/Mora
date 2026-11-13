type LogoProps = {
  size?: number;
  plain?: boolean;
};

export default function Logo({ size = 64, plain = false }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logo do Mora"
    >
      {!plain && <rect width="64" height="64" rx="14" fill="#2563EB" />}

      <g
        stroke={plain ? "#11458F" : "#FFFFFF"}
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Telhado */}
        <path d="M17.5 29.5L32 17.5L46.5 29.5" />

        {/* Estrutura da casa */}
        <path d="M22 28.5V43.5C22 45.2 23 46 24.5 46H39.5C41 46 42 45.2 42 43.5V28.5" />

        {/* Porta */}
        <path d="M29 46V35C29 34.4 29.4 34 30 34H34C34.6 34 35 34.4 35 35V46" />
      </g>
    </svg>
  );
}

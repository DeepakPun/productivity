import React from 'react'

export type IconName =
  | 'shell'
  | 'frontend'
  | 'backend'
  | 'fullstack'
  | 'devops'
  | 'cloud'
  | 'cicd'
  | 'development'
  | 'appmesh'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName
  className?: string
}

const iconPaths: Record<IconName, { strokeWidth: number; paths: string[] }> = {
  shell: {
    strokeWidth: 2,
    paths: [
      'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    ],
  },
  frontend: {
    strokeWidth: 2,
    paths: [
      'M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    ],
  },
  backend: {
    strokeWidth: 2,
    paths: [
      'M4 7V4a1 1 0 011-1h14a1 1 0 011 1v3M4 7h16M4 7c0 1.657 3.582 3 8 3s8-1.343 8-3M4 14v-3a1 1 0 011-1h14a1 1 0 011 1v3M4 14h16M4 14c0 1.657 3.582 3 8 3s8-1.343 8-3M4 20v-3a1 1 0 011-1h14a1 1 0 011 1v3M4 20h16M4 20c0 1.657 3.582 3 8 3s8-1.343 8-3',
    ],
  },
  fullstack: {
    strokeWidth: 1.75,
    paths: ['M12 3L2 8l10 5 10-5-10-5z', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5'],
  },
  devops: {
    strokeWidth: 2,
    paths: [
      'M16.5 7.5c2.485 0 4.5 2.015 4.5 4.5s-2.015 4.5-4.5 4.5c-2.121 0-4.056-1.507-4.5-3.5-.444 1.993-2.379 3.5-4.5 3.5A4.5 4.5 0 013 12a4.5 4.5 0 014.5-4.5c2.121 0 4.056 1.507 4.5 3.5.444-1.993 2.379-3.5 4.5-3.5z',
    ],
  },
  cicd: {
    strokeWidth: 2,
    paths: [
      'M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17',
      'M20 20v-5h-.581m-15.356-2A8.001 8.001 0 112.79 16H7',
    ],
  },
  development: {
    strokeWidth: 2,
    paths: ['M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'],
  },
  cloud: {
    strokeWidth: 2,
    paths: [
      'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
    ],
  },
  appmesh: {
    strokeWidth: 1.5,
    paths: [
      'M12 21a9 9 0 100-18 9 9 0 000 18z',
      'M3.6 9h16.8M3.6 15h16.8',
      'M11.5 3a17 17 0 000 18M12.5 3a17 17 0 000 18',
    ],
  },
}

export const Icon: React.FC<IconProps> = ({
  name,
  className = 'w-6 h-6',
  ...props
}) => {
  const iconData = iconPaths[name]

  if (!iconData) return null

  return React.createElement(
    'svg',
    {
      xmlns: 'http://w3.org',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor',
      strokeWidth: iconData.strokeWidth,
      className: className,
      'aria-hidden': 'true',
      ...props,
    },
    iconData.paths.map((path, index) =>
      React.createElement('path', {
        key: index,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        d: path,
      }),
    ),
  )
}

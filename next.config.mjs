import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from 'next/constants.js';

/** @type {import('next').NextConfig} */
function configureNext(phase) {
  // when started in development mode `next dev` or `npm run dev`
  // regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';

  const env = {
    GRAPHQL_SERVER_URL: (() => {
      if (isDev) return 'http://localhost:8000/';
      if (isProd) return '';

      return 'GRAPHQL_SERVER_URL:not (isDev && isProd)';
    })(),
  };

  // next.config.js object
  return {
    env,
    reactStrictMode: true,

    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'removeTitle',
                    active: false,
                  },
                  {
                    // Make SVG responsive
                    name: 'removeViewBox',
                    active: false,
                  },
                  {
                    name: 'removeDimensions',
                    active: true,
                  },
                ],
              },
            },
          },
        ],
      });

      return config;
    },
  };
}

export default configureNext;

export function CSPHeader() {
  return (
    <meta
      httpEquiv="Content-Security-Policy"
      content="
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data: https://vercel.live;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data: https: blob:;
        connect-src 'self' https://vercel.live;
        frame-src 'self' https://vercel.live;
        worker-src 'self' blob:;
      "
    />
  )
}

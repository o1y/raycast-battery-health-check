export function getBatteryIcon(percentage: number): string {
  const icon = `
    <svg width="132" height="65" viewBox="0 0 132 65" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="2.5" y="2.5" width="112.957" height="59.1489" rx="12.5" stroke="white" stroke-opacity="0.5" stroke-width="5"/>
<path d="M124.511 43.0851C128.647 43.0851 132 38.3698 132 32.5532C132 26.7366 128.647 22.0213 124.511 22.0213V43.0851Z" fill="white" fill-opacity="0.5"/>
<rect x="9" y="9" width="${percentage}" height="46" rx="7" fill="white"/>
</svg>`;

  return "data:image/svg+xml;base64," + Buffer.from(icon, "utf8").toString("base64");
}

import type { FeatureCollection, Polygon } from 'geojson'

/**
 * Simplified Tehran outline (~39 pts), derived from
 * `tehran-area-coordinate.json` (radial envelope + Douglas–Peucker).
 */
export const tehranArea: FeatureCollection<Polygon> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Tehran',
        nameFa: 'تهران',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [51.16427, 35.70833],
            [51.21835, 35.68937],
            [51.27268, 35.67689],
            [51.29804, 35.63932],
            [51.32486, 35.62033],
            [51.34392, 35.61572],
            [51.37662, 35.62542],
            [51.39027, 35.61433],
            [51.42348, 35.56176],
            [51.45172, 35.57712],
            [51.47927, 35.56127],
            [51.46245, 35.61411],
            [51.50647, 35.60542],
            [51.50132, 35.61581],
            [51.50996, 35.63564],
            [51.50183, 35.66011],
            [51.47574, 35.69176],
            [51.49488, 35.69315],
            [51.51256, 35.70737],
            [51.60484, 35.7405],
            [51.60604, 35.74391],
            [51.56527, 35.76502],
            [51.55299, 35.795],
            [51.54106, 35.81241],
            [51.52509, 35.81185],
            [51.4917, 35.82479],
            [51.47771, 35.82305],
            [51.46218, 35.82925],
            [51.40175, 35.81818],
            [51.39643, 35.81338],
            [51.35317, 35.80064],
            [51.34098, 35.8025],
            [51.32775, 35.78708],
            [51.26215, 35.82235],
            [51.24944, 35.7984],
            [51.18256, 35.77326],
            [51.09192, 35.77437],
            [51.08917, 35.7431],
            [51.16427, 35.70833],
          ],
        ],
      },
    },
  ],
}

/** Leaflet [lat, lng] */
export const tehranCenter: [number, number] = [35.69526, 51.34761]

/** Leaflet bounds [[south, west], [north, east]] */
export const tehranBounds: [[number, number], [number, number]] = [
  [35.56127, 51.08917],
  [35.82925, 51.60604],
]

export const tehranMapZoom = 11

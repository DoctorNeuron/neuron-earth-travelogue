import Transportation, { TransportationProps } from '@/components/blog/transportation/Transportation'
import React from 'react'

export default function SandboxPage() {
  
  let transp: TransportationProps = {
    name: "Route A",
    routes: [
      {
        name: "1",
        route: ["Bundaran HI", "Tosari", "Dukuh Atas", "Bendungan Hilir", "Polda Metro Jaya", "Gelora Bung Karno"]
      },
      {
        name: "Intermediate",
        route: ["Bendungan Hilir", "Semanggi"]
      },
      {
        name: "9",
        route: ["Semanggi", "Senayan JCC"]
      }
    ]
  }
  
  return (
    <div>
      <p>Hello</p>
      <Transportation name={transp.name} routes={transp.routes} />
    </div>
  )
}

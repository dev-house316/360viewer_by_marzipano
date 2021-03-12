import { Component, OnInit } from '@angular/core';
import * as Marzipano from 'marzipano'

@Component({
  selector: 'app-tiles',
  template: '<div #tiles id="tiles"></div>'
})
export class TilesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const panoElement = document.querySelector('#tiles')
    const viewer = new Marzipano.Viewer(panoElement, { stage: { progressive: true } })

    // Create source.
    const source = Marzipano.ImageUrlSource.fromString("../../assets/tiles/{z}/{f}/{y}/{x}.jpg", {
      cubeMapPreviewUrl: "../../assets/tiles/preview.jpg"
    })

    // Create geometry.
    const geometry = new Marzipano.CubeGeometry([
      {
        "tileSize": 256,
        "size": 256,
        "fallbackOnly": true
      },
      {
        "tileSize": 512,
        "size": 512
      },
      {
        "tileSize": 512,
        "size": 1024
      }
    ])

    // Create view.
    const limiter = Marzipano.RectilinearView.limit.traditional(1024, 100 * Math.PI / 180, 120 * Math.PI / 180)
    const view = new Marzipano.RectilinearView({
      "pitch": 0,
      "yaw": 0,
      "fov": 1.5707963267948966
    }, limiter)

    // Create scene.
    const scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true
    })

    // Display scene.
    scene.switchTo()
  }
}
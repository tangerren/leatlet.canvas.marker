import { Canvas, CircleMarker, LatLngExpression, CircleMarkerOptions, Bounds } from 'leaflet';

// 示例加载1000个点
// for (let i = 0; i < 1000; i++) {
//   const p = latLng(29 + Math.random() * 2, 106 + Math.random() * 2);
//   new CanvasMarker(p, {
//     icon: {
//       url: 'assets/images/star-fill.png',
//       size: [15, 15]
//     },
//     color: '#27ae60'
//   }).addTo(this.map).on('click', (e) => {
//     console.log(e.target);
//   });
// }

export class CanvasMarker extends CircleMarker {

  options: CanvasMarkerOptions;
  _pxBounds: Bounds;
  constructor(position: LatLngExpression, options: CanvasMarkerOptions) {
    super(position, options);
    this.options = options;
    this.options.interactive = true;
    if (!this.options.icon.offset) {
      this.options.icon.offset = {
        x: 0,
        y: 0
      };
    }
    if (!options.radius && options.icon && options.icon.size) {
      options.radius = Math.ceil(Math.max(options.icon.size[0]) / 2);
    }
    if (options.pane) {
      delete options.pane;
    }
  }

  setScale(isScale: boolean): void {
    this.options.scaleByZoom = isScale;
  }

  setIcon(icon: any): void {
    this.options.icon = icon;
    this.redraw();
  }

  getIcon(): any {
    return this.options.icon;
  }

  showLabel(): void {
    this.options.label.show = true;
    this.redraw()
  }

  hideLabel(): void {
    this.options.label.show = false;
    this.redraw()
  }

  setLabel(label: any): void {
    this.options.label = label;
    this.redraw();
  }

  getLabel(): LeaftLabel {
    return this.options.label;
  }

  removeLabel(): void {
    this.options.label = null;
    this.redraw();
  }

  _updatePath(): void {
    if (this.options.icon && this.options.icon.url) {
      if (this.options.icon.el) {
        // 默认是ico的bounds，没考虑label大小
        // 扩大canvasmarker的bounds，固定外扩200px
        this._pxBounds.min.x -= 200;
        this._pxBounds.min.y -= 200;
        this._pxBounds.max.x += 200;
        this._pxBounds.max.y += 200;
        const re: any = this._map.getRenderer(this);
        re._updateCanvasMarkerImg(this);
      } else {
        const iconImg: any = document.createElement('img');
        iconImg.src = this.options.icon.url;
        this.options.icon.el = iconImg;
        iconImg.onload = () => {
          this.redraw();
        };
        iconImg.onerror = () => {
          this.options.icon = null;
        };
      }
    }
  }
}


Canvas.include({
  _updateCanvasMarkerImg(layer): void {
    const { icon, label } = layer.options;
    const p = layer._point.round();
    if (icon.offset) {
      p.x += icon.offset.x;
      p.y += icon.offset.y;
    }
    // icon size
    let scale = 1;
    let iconSizeW = icon.size[0];
    let iconSizeH = icon.size[1];
    if (layer.options.scaleByZoom) {
      scale = this.getScaleFromZoom(this._map.getZoom());
      iconSizeW = icon.size[0] * scale;
      iconSizeH = icon.size[1] * scale;
    }
    // icon position
    const X = p.x - iconSizeW / 2;
    const Y = p.y - iconSizeH / 2;
    // icon
    this._ctx.globalAlpha = 1;
    this._ctx.drawImage(icon.el, X, Y, iconSizeW, iconSizeH);
    if (label && label.show) {
      // leble size
      const lWidth = (label.text.length * label.fontSize + 10) * scale;
      const lHeight = (label.fontSize + 10) * scale;
      // label position
      const lPx = X - lWidth / 2 + iconSizeW / 2;
      const lPy = Y - lHeight;
      // draw label
      this._ctx.fillStyle = label.bgColor;
      this._ctx.fillRect(lPx, lPy - 5, lWidth, lHeight);
      this._ctx.font = label.fontSize * scale + 'px Yahei';
      this._ctx.fillStyle = label.color;
      this._ctx.fillText(label.text, lPx + 5, Y - 15 * scale);
    }
  },
  getScaleFromZoom(zoom: number): number {
    let scale;
    if (zoom >= 0 && zoom < 5) {
      scale = 0.1;
    } else if (zoom >= 5 && zoom < 8) {
      scale = 0.3;
    } else if (zoom >= 8 && zoom < 9) {
      scale = 0.4;
    } else if (zoom >= 9 && zoom < 10) {
      scale = 0.5;
    } else if (zoom >= 10 && zoom < 11) {
      scale = 0.6;
    } else if (zoom >= 11 && zoom < 12) {
      scale = 0.7;
    } else if (zoom >= 12 && zoom < 13) {
      scale = 0.8;
    } else if (zoom >= 13 && zoom < 14) {
      scale = 0.9;
    } else if (zoom >= 14) {
      scale = 1;
    }
    return scale;
  }
});

export interface CanvasMarkerOptions extends CircleMarkerOptions {
  id?: string;
  scaleByZoom?: boolean;
  icon: {
    el?: any;
    size: number[];
    url: string;
    offset?: {
      x: number;
      y: number;
    }
  };
  properties?: any;
  label?: {
    show: boolean;
    color: string;
    bgColor: string;
    fontSize: number;
    text: string
  };
}

const cavasOption: CanvasMarkerOptions = {
  icon: {
    url: '',
    size: []
  }
};

export type LeaftLabel = typeof cavasOption.label;

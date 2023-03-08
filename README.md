# leatlet.canvas.marker
Inherit from CircleMarker

## usage
#### demo for add 10000 points
```javascript
for (let i = 0; i < 10000; i++) {
  const p = latLng(29 + Math.random() * 2, 106 + Math.random() * 2);
  new CanvasMarker(p, {
    icon: {
      url: 'assets/images/star.png',
      size: [15, 15]
    },
    label: {
        show: true,
        color: 'rgb(229, 230, 3)',
        bgColor: 'rgba(55, 71, 72, 0.8)',
        fontSize: 16,
        text: "i am label " + i,
      },
  }).addTo(this.map).on('click', (e) => {
    console.log(e.target);
  });
}
```
## 功能
### 自定义图标ico
- url 设置图标路径
- size 设置图标大小
- offset 设置偏移距离
### 自定义标注label
- show 是否显示标注
- color 自定义颜色
- bgColor 自定义背景颜色
- fontSize 自定义字体大小，px
- text 自定义文字内容
### 自定义marker颜色
### 自定义marker是否随缩放变换大小

# leatlet.canvas.marker
# 继承自CircleMarker


#### 示例加载1000个点
```
for (let i = 0; i < 1000; i++) {
  const p = latLng(29 + Math.random() * 2, 106 + Math.random() * 2);
  new CanvasMarker(p, {
    icon: {
      url: 'assets/images/star-fill.png',
      size: [15, 15]
    },
    label: {
        show: options.showLabel,
        color: 'rgb(229, 230, 3)',
        bgColor: 'rgba(55, 71, 72, 0.8)',
        fontSize: 16,
        text: " 我是标签" + i,
      },
  }).addTo(this.map).on('click', (e) => {
    console.log(e.target);
  });
}
```

### 自定义图标ico
- url 设置图标路径
- size 设置图标大小
- offset 设置偏移距离
### 自定义标注label
- show 是否显示
- color 自定义颜色
- bgColor 自定义背景颜色
- fontSize 自定义字体大小，px
- text 自定义文字内容
### 自定义marker颜色
### 自定义marker是否随缩放变换大小

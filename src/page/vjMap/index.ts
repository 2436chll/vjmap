// https://vjmap.com/demo/#/demo/map/web/09baiduCadLayerFourparam
import vjmap from '!vjmap'
import 'vjmap/dist/vjmap.min.css'

export const MAP_ID = 'vjMapContainer'

export const initVjMap = async() => {

  // 设置环境配置，包括服务 URL 和访问令牌
  const env = {
    serviceUrl: "https://vjmap.com/server/api/v1", // vjmap 服务的 API 地址
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiVXNlcm5hbWUiOiJyb290MSIsIk5pY2tOYW1lIjoicm9vdDEiLCJBdXRob3JpdHlJZCI6InJvb3QiLCJCdWZmZXJUaW1lIjo4NjQwMCwiZXhwIjoxOTQyMzA1MjQxLCJpc3MiOiJ2am1hcCIsIm5iZiI6MTYyNjk0NDI0MX0.29OAA4Cnjtw780VxIxWqduLtszp1EtpSNHAmWjiL_OM",
    exampleMapId:MAP_ID
  };

  // --天地图与 CAD 图叠加[天地图为底图]--以天地图为坐标系
  // 创建服务对象，用于与 vjMap 服务进行交互
  let svc = new vjmap.Service(env.serviceUrl, env.accessToken)

  // 创建经纬度投影坐标系对象，用于将平面坐标转换为地理坐标
  let prj = new vjmap.LnglatProjection();

  // 创建地图对象
  let map = new vjmap.Map({
    container:MAP_ID, // 地图容器的 ID
    style: {
      version: svc.styleVersion(), // 获取样式版本
      sources: {
        // 定义天地图的两个图层（矢量图层和注记图层）
        tdt1: {
          type: 'raster',
          tiles: ["https://t3.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=7baeffb96bf61861b302d0f963cfda66"],
          // 要使用影像请用这个地址
          // tiles: ["https://t3.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=7baeffb96bf61861b302d0f963cfda66"]
        },
        tdt2: {
          type: 'raster',
          tiles: ["https://t3.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=7baeffb96bf61861b302d0f963cfda66"],
        }
      },
      // 定义图层，将 sources 中的内容渲染到地图上
      layers: [{
        id: 'tdt1',
        type: 'raster',
        source: 'tdt1', // 使用矢量图层
      },{
        id: 'tdt2',
        type: 'raster',
        source: 'tdt2',  // 使用矢量注记图层
      }]
    },
    center: prj.toLngLat([117.21242940465396, 39.196783504641644]), // 设置地图中心点
    zoom: 15, // 设置地图缩放级别
    pitch: 0, // 设置地图的俯仰角度
    renderWorldCopies: false // 不显示多屏地图（即在全局地图上只显示一个世界副本）
  });

  // 将服务对象和投影对象关联到地图
  map.attach(svc, prj);

  // 根据地图本身范围自动缩放地图至全图显示
  // map.fitMapBounds(); // 如果需要自动缩放地图，可以取消注释此行

  // 等待地图加载完成
  await map.onLoad();

  // https://vjmap.com/app/cloud/#/  在这里上传新的dwg文件

  // 要叠加的 CAD 图的地图 ID
  let cadMapId = "c3ae4bdf65df";

  // 获取 CAD 图的样式对象，设置背景颜色为白色
  let style = await svc.createStyle({
      backcolor: 0xFFFFFF // 浅色主题
  }, cadMapId)

  // 获取 WMS 服务的 URL，用于加载 CAD 图
  let wmsurl = svc.wmsTileUrl({
    mapid: cadMapId,
    version:"v1", // WMS 服务版本
    layers: style.stylename, // 使用获取的样式名
    srs: "EPSG:3857", // 设置天地图的坐标系为 EPSG:3857
    crs: "EPSG:4548",  // CAD 图的坐标系为 EPSG:4548 (CGCS2000)
    // 如果 CAD 图使用自定义投影，可以使用 proj4 表达式来定义 crs
    // fourParameter: "-390,0,1,0" // 用四参数调节 CAD 图的位置（如有必要）
  })

  // 添加 WMS 图层到地图
  map.addSource('wms-test-source', {
    'type': 'raster',
    'tiles': [
        wmsurl
    ],
    'tileSize': 256  // 设置瓦片大小
  });

  // 在地图上添加并显示 WMS 图层
  map.addLayer({
      'id': 'wms-test-layer',
      'type': 'raster',
      'source': 'wms-test-source',  // 指定使用的 source
      'paint': { "raster-opacity": 1 }  // 设置图层的不透明度
    }
  );
}
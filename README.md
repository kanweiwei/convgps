##根据html5 Geolocation API 提供的地理位置信息，转换成对应的实际地址。
----

该插件是jQery插件，使用前请先引用jQuery类库。<br>

例(cdn)：<br>
\<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.js" type="text/javascript" charset="utf-8">\</script> <br>

###用法<br>
$.convgps({<br>
  apis:"qq",<br>
  contentarea:"otherSelector",<br>
  key:"",<br>
  des:'距离计算',<br>
  destination：'30.123123,120,42321'
});<br>

###参数options<br>
1.apis 地图API，暂时默认"qq"，即腾讯地图API<br>
2.contentarea 显示地址的对应的jq元素选择器<br>
3.key 开发者密钥（暂时只有用腾讯地图，所以填的腾讯地图的开发者密钥）<br>

其他的地图API,以后丰富。<br>

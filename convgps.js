(function($) {
	/*
	 * options 参数对象
	 * callback 回调函数
	 */
	
	$.extend({
		convgps:function(options,callback) {
			//默认参数
			var defaluts = {
				apis: "qq"
			};
			//覆盖默认参数
			var options = $.extend({}, defaluts, options);
			var apis = options.apis;
			var key = options.key;
			var des = options.des;
			var destination = options.destination;
			
			//声明变量获取gps坐标
			var gpsStr; 
			
			//声明需要返回的变量
			var address ,distance;
			
			
			//支持h5获取地理位置信息
			if(window.navigator.geolocation) {
				var geooptions = {
					enableHighAccuracy: true,
				};
				window.navigator.geolocation.getCurrentPosition(handleSuccess, handleError, geooptions);
				
			} else {
				//不支持h5获取地理位置信息
				alert("浏览器不支持html5来获取地理位置信息");
			}
			
			//html5定位接口调用成功
			function handleSuccess(position) {
				// 获取到当前位置经纬度  本例中是chrome浏览器取到的是google地图中的经纬度
				var lng = position.coords.longitude; //经度
				var lat = position.coords.latitude; //纬度
				gpsStr = lat + ',' + lng; //gps坐标
				//alert(gpsStr);
				if(!gpsStr) {
					alert("gps坐标未获取到");
				} else {
					//document.write(gpsStr);
				}
				//腾讯地图
				//逆地址解析的API
				if(apis == "qq" && des =='逆地址解析') {
					var url = 'http://apis.map.qq.com/ws/geocoder/v1/?location=' + gpsStr + '&coord_type=1&get_poi=1&key=' + key + '&output=jsonp&callback=?';
					$.ajax({
						type:'get',
						url:url,
						dataType:'jsonp',
						success:function(data){
							address =data["result"]["address"];
							//var recommend = data["result"]["formatted_addresses"]["recommend"];
							callback({'mess':'调用成功','address':address});
						},
						error:function(error){
							
						}
					})
					$.getJSON(url, function(data) {
						
						//alert(address);
					});
				}
				//距离计算的API
				if(apis == 'qq' && des == '距离计算' && destination.indexOf(',')!= -1){
					var url = 'http://apis.map.qq.com/ws/distance/v1/?from='+gpsStr+'&to='+destination+'&output=jsonp'+'&key='+key;
					$.ajax({
						type:'get',
						url:url,
						dataType:'jsonp',
						success:function(data){
							if(data.status==0){
								if(data.result.elements.length == 1){
									distance = data.result.elements[0].distance;
									callback({'mess':'调用成功','distance':distance});
									return ;
								}
							}
							if(data.status ==373){
								callback({'mess':data.message,'distance':distance});
								return ;
							}
							callback({'mess':'调用失败，参数错误','distance':distance});
							return ;
						},
						error:function(error){
							callback({'mess':'调用失败','distance':distance});
							return ;
						}
					});
				}
			}
			//html5定位接口调用失败
			function handleError(error) {
				switch(error.code) {
					case error.TIMEOUT:
						alert(" 连接超时，请重试 ");
						break;
					case error.PERMISSION_DENIED:
						alert(" 您拒绝了使用位置共享服务，查询已取消 ");
						break;
					case error.POSITION_UNAVAILABLE:
						alert(" 亲爱的火星网友，非常抱歉，我们暂时无法为您所在的星球提供位置服务 ");
						break;
				}
			}
		}
	});
	
})(jQuery);

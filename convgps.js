(function($) {
	/*
	 * 坐标转换成当前地址，会有一点偏差
	 * 默认用腾讯地图API，其他暂未实现
	 */
	/*
	 * 参考写法
	$("selector").convlocation({
		apis:"qq",
		contentarea:"otherSelector"
	});
	*/
	$.fn.convgps = function(options) {
		var self = this; //调用本方法的jquery对象
		var gpsStr; //获取gps坐标
		var key =options.key;//获取密钥
		//默认参数
		var defaluts = {
			apis: "qq"
		};
		//覆盖默认参数
		var options = $.extend({},defaluts, options);
		
		if(window.navigator.geolocation) {
			var geooptions = {
				enableHighAccuracy: true,
			};
			window.navigator.geolocation.getCurrentPosition(handleSuccess, handleError, geooptions);
		} else {
			alert("浏览器不支持html5来获取地理位置信息");
		}
		//html5定位接口调用成功
		function handleSuccess(position) {
			// 获取到当前位置经纬度
			var lng = position.coords.longitude; //经度
			var lat = position.coords.latitude; //纬度
			gpsStr = lat+ ',' + lng; //gps字符串
			
			if(!gpsStr) {
				alert("gps坐标未获取到");
				return;
			}
			var apiurl ='http://apis.map.qq.com/ws/geocoder/v1/?location=' + gpsStr + '&coord_type=1&get_poi=1&key=' + key + '&output=jsonp&callback=?';
			
			//腾讯地图逆地址解析api
			if(options.apis == "qq") {
				$.getJSON(apiurl, function(data) {
					var address = data["result"]["address"];
					//var recommend = data["result"]["formatted_addresses"]["recommend"];
					$(options["contentarea"]).html(address);
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
		return this;
	}
})(jQuery);

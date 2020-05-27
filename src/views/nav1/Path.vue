<template>
    <div style="width: 100%;height: 100%">
        <el-row :gutter="20">
        <el-col :span="6" style="height:600px;background-color: #F0F0F0">
            <el-button type="primary" plain @click="search">配送</el-button>
        </el-col>
        <el-col :span="18">
            <div style="width:860px;height:600px;border:1px solid gray" id="allmap"></div>
        </el-col>
        </el-row>
    </div>
</template>

<script>
    import BMap from 'BMap';
    var map;
    export default {
        name: 'search',
        data: function () {
            return {
                carNum:'',
                from: null,
                to: null
            }
        },
        mounted () {
            map = new BMap.Map("allmap");
            map.enableScrollWheelZoom(true);
            map.centerAndZoom(new BMap.Point(119.980563,31.817432), 11);
            var myGeo = new BMap.Geocoder();
            var geolocation = new BMap.Geolocation();
            this.getCarNum();
        },
        methods: {//定义方法
            getCarNum(){
                this.$http.get("http://localhost:3000/cars").then(function (response) {
                    console.log(response);
                    this.carNum = response.body.length;
                })
            },
            run: function () {
                map.clearOverlays() // 清除地图上所有的覆盖物
                var walking = new BMap.WalkingRoute(map) // 创建步行实例
                walking.search(this.from, this.to) // 第一个步行搜索
                let that = this;
                walking.setSearchCompleteCallback(function () {
                    console.log('completeCallback start!');
                    var pts = walking.getResults().getPlan(0).getRoute(0).getPath() // 通过步行实例，获得一系列点的数组

                    var polyline = new BMap.Polyline(pts)
                    map.addOverlay(polyline)
                    console.log('pollyline!', polyline);
                    var m1 = new BMap.Marker(that.from) // 创建2个marker
                    var m2 = new BMap.Marker(that.to)
                    map.addOverlay(m1)
                    map.addOverlay(m2)

                    var lab1 = new BMap.Label('起点', {position: that.from}) // 创建2个label
                    var lab2 = new BMap.Label('终点', {position: that.to})
                    map.addOverlay(lab1)
                    map.addOverlay(lab2)
                    console.log('setTimeout!');
                    setTimeout(function () {
                        map.setViewport([that.from, that.to]) // 调整到最佳视野
                    }, 1000)
                })
            },
            search(){
                var wayPointIconHtml='<div style="position: absolute; margin: 0px; padding: 0px; width: 36px; height: 40px; overflow: hidden;"><img src="http://api0.map.bdimg.com/images/way-points.png" style="display: none; border:none;margin-left:-11px; margin-top:-35px; "></div>'
                var startIcon=new BMap.Icon("./location.png", new BMap.Size(40,50));
                var flag=[1];
                flag[0]=this.carNum;
                    if(4 ==flag[0]) {
                        var end = new BMap.Point(119.989959, 31.791976);//红星美凯龙
                        var peisong1=new BMap.Point(120.009855,31.790236)//家家爱国际家具
                        //百货大楼 ：邮电大厦 ，机电大厦，恒利大厦；
                        var points1 = [new BMap.Point(119.970989, 31.788833), new BMap.Point(119.963727, 31.787257),new BMap.Point(119.970939, 31.780026) ];
                        map.clearOverlays();
                        var driving = new BMap.DrivingRoute(map, {renderOptions: {map: map},onMarkersSet:function(res) {    //标注点完成回调
                        map.removeOverlay(res[0].marker); //删除起点
                        console.log(res[1]);
                        for (var i=0;i<points1.length;i++){
                            map.removeOverlay(res[i+1].Tm.Bc);
                            var opts = {
                                position : points1[i],    // 指定文本标注所在的地理位置
                                offset   : new BMap.Size(0,0)    //设置文本偏移量
                            }
                            var label = new BMap.Label(("配送点"+(i+1)), opts);  // 创建文本标注对象
                            label.setStyle({
                                color : "black",
                                fontSize : "12px",
                                height : "20px",
                                lineHeight : "20px",
                                fontFamily:"微软雅黑"
                            });
                            map.addOverlay(label);
                            var tempo = new BMap.Marker(points1[i],{icon:startIcon});
                            map.addOverlay(tempo);
                        }
                        var optend= {position : end}
                        var ll=new BMap.Label("中央配送点",optend);
                        ll.setStyle({
                            color : "red",
                            fontSize : "20px",
                            height : "20px",
                            lineHeight : "20px",
                            fontFamily:"微软雅黑"
                        });
                        map.addOverlay(ll);
                        var myEnd = new BMap.Marker(end,{icon:startIcon});
                        map.removeOverlay(res[res.length-1].marker);//删除终点
                        map.addOverlay(myEnd);
                    }});
                        driving.search(end, end, {waypoints: points1});
                        var points2 = [new BMap.Point(119.98922, 31.800813), new BMap.Point(119.998767, 31.792328)];//翠竹新村，凯旋城
                        var driving1 =  new BMap.DrivingRoute(map, {renderOptions: {map: map},onMarkersSet:function(res) {    //标注点完成回调
                        map.removeOverlay(res[0].marker); //删除起点
                        console.log(res[1]);
                        for (var i=0;i<points2.length;i++){
                            map.removeOverlay(res[i+1].Tm.Bc);
                            var opts = {
                                position : points2[i],    // 指定文本标注所在的地理位置
                                offset   : new BMap.Size(0,0)    //设置文本偏移量
                            }
                            var label = new BMap.Label(("配送点"+(i+1)), opts);  // 创建文本标注对象
                            label.setStyle({
                                color : "black",
                                fontSize : "12px",
                                height : "20px",
                                lineHeight : "20px",
                                fontFamily:"微软雅黑"
                            });
                            map.addOverlay(label);
                            var tempo = new BMap.Marker(points2[i],{icon:startIcon});
                            map.addOverlay(tempo);
                        }
                        var myEnd = new BMap.Marker(end,{icon:startIcon});
                        map.removeOverlay(res[res.length-1].marker);//删除终点
                        map.addOverlay(myEnd);
                    }});
                driving1.search(end, end, {waypoints: points2});
                var points3=[new BMap.Point(119.999151,31.785393),new BMap.Point(119.997039,31.789257)];//九龙雅苑 红东一村小区
                var driving2 =  new BMap.DrivingRoute(map, {renderOptions: {map: map},onMarkersSet:function(res) {    //标注点完成回调
                        map.removeOverlay(res[0].marker); //删除起点
                        for (var i=0;i<points3.length;i++){
                            map.removeOverlay(res[i+1].Tm.Bc);
                            var opts = {
                                position : points3[i],    // 指定文本标注所在的地理位置
                                offset   : new BMap.Size(0,0)    //设置文本偏移量
                            }
                            var label = new BMap.Label(("配送点"+(i+1)), opts);  // 创建文本标注对象
                            label.setStyle({
                                color : "black",
                                fontSize : "12px",
                                height : "20px",
                                lineHeight : "20px",
                                fontFamily:"微软雅黑"
                            });
                            map.addOverlay(label);
                            var tempo = new BMap.Marker(points3[i],{icon:startIcon});
                            map.addOverlay(tempo);
                        }
                        var myEnd = new BMap.Marker(end,{icon:startIcon});
                        map.removeOverlay(res[res.length-1].marker);//删除终点
                        map.addOverlay(myEnd);
                    }});
                        driving2.search(end,end,{waypoints:points3});
                    }else if(3==flag[0]) {
                        var end = new BMap.Point(119.989959, 31.791976);//红星美凯龙
                        var peisong1=new BMap.Point(120.009855,31.790236)//家家爱国际家具
                        //百货大楼 ：邮电大厦 ，机电大厦，恒利大厦；
                        var points1 = [new BMap.Point(119.970989, 31.788833), new BMap.Point(119.963727, 31.787257),new BMap.Point(119.970939, 31.780026) ];
                        map.clearOverlays();
                        var driving = new BMap.DrivingRoute(map, {renderOptions: {map: map},onMarkersSet:function(res) {    //标注点完成回调
                        map.removeOverlay(res[0].marker); //删除起点
                        console.log(res[1]);
                        for (var i=0;i<points1.length;i++){
                            map.removeOverlay(res[i+1].Tm.Bc);
                            var opts = {
                                position : points1[i],    // 指定文本标注所在的地理位置
                                offset   : new BMap.Size(0,0)    //设置文本偏移量
                            }
                            var label = new BMap.Label(("配送点"+(i+1)), opts);  // 创建文本标注对象
                            label.setStyle({
                                color : "black",
                                fontSize : "12px",
                                height : "20px",
                                lineHeight : "20px",
                                fontFamily:"微软雅黑"
                            });
                            map.addOverlay(label);
                            var tempo = new BMap.Marker(points1[i],{icon:startIcon});
                            map.addOverlay(tempo);
                        }
                        var optend= {position : end}
                        var ll=new BMap.Label("中央配送点",optend);
                        ll.setStyle({
                            color : "red",
                            fontSize : "20px",
                            height : "20px",
                            lineHeight : "20px",
                            fontFamily:"微软雅黑"
                        });
                        map.addOverlay(ll);
                        var myEnd = new BMap.Marker(end,{icon:startIcon});
                        map.removeOverlay(res[res.length-1].marker);//删除终点
                        map.addOverlay(myEnd);
                    }});
                        driving.search(end, end, {waypoints: points1});
                    }else if(5==flag[0]) {
                        var end = new BMap.Point(119.989959, 31.791976);//红星美凯龙
                        //百货大楼 ：邮电大厦 ，机电大厦，恒利大厦；
                        var points1 = [new BMap.Point(119.970989, 31.788833), new BMap.Point(119.963727, 31.787257),new BMap.Point(119.970939, 31.780026) ];
                        map.clearOverlays();
                        var driving = new BMap.DrivingRoute(map, {renderOptions: {map: map},onMarkersSet:function(res) {    //标注点完成回调
                            map.removeOverlay(res[0].marker); //删除起点
                            console.log(res[1]);
                            for (var i=0;i<points1.length;i++){
                                map.removeOverlay(res[i+1].Tm.Bc);
                                var opts = {
                                    position : points1[i],    // 指定文本标注所在的地理位置
                                    offset   : new BMap.Size(0,0)    //设置文本偏移量
                                }
                                var label = new BMap.Label(("配送点"+(i+1)), opts);  // 创建文本标注对象
                                label.setStyle({
                                    color : "black",
                                    fontSize : "12px",
                                    height : "20px",
                                    lineHeight : "20px",
                                    fontFamily:"微软雅黑"
                                });
                                map.addOverlay(label);
                                var tempo = new BMap.Marker(points1[i],{icon:startIcon});
                                map.addOverlay(tempo);
                            }
                            var optend= {position : end}
                            var ll=new BMap.Label("中央配送点",optend);
                            ll.setStyle({
                                color : "red",
                                fontSize : "20px",
                                height : "20px",
                                lineHeight : "20px",
                                fontFamily:"微软雅黑"
                            });
                            map.addOverlay(ll);
                            var myEnd = new BMap.Marker(end,{icon:startIcon});
                            map.removeOverlay(res[res.length-1].marker);//删除终点
                            map.addOverlay(myEnd);
                        }});
                        driving.search(end, end, {waypoints: points1});
                        var points2 = [new BMap.Point(119.98922, 31.800813), new BMap.Point(119.998767, 31.792328)];//翠竹新村，凯旋城
                        var driving1 =  new BMap.DrivingRoute(map, {renderOptions: {map: map},onMarkersSet:function(res) {    //标注点完成
                        map.removeOverlay(res[0].marker); //删除起点
                        console.log(res[1]);
                        for (var i=0;i<points2.length;i++){
                            map.removeOverlay(res[i+1].Tm.Bc);
                            var opts = {
                                position : points2[i],    // 指定文本标注所在的地理位置
                                offset   : new BMap.Size(0,0)    //设置文本偏移量
                            }
                            var label = new BMap.Label(("配送点"+(i+1)), opts);  // 创建文本标注对象
                            label.setStyle({
                                color : "black",
                                fontSize : "12px",
                                height : "20px",
                                lineHeight : "20px",
                                fontFamily:"微软雅黑"
                            });
                            map.addOverlay(label);
                            var tempo = new BMap.Marker(points2[i],{icon:startIcon});
                            map.addOverlay(tempo);
                        }
                        var myEnd = new BMap.Marker(end,{icon:startIcon});
                        map.removeOverlay(res[res.length-1].marker);//删除终点
                        map.addOverlay(myEnd);
                    }});
                    driving1.search(end, end, {waypoints: points2});
                    var points3=[new BMap.Point(119.999151,31.785393),new BMap.Point(119.997039,31.789257)];//九龙雅苑 红东一村小区
                    var driving2 =  new BMap.DrivingRoute(map, {renderOptions: {map: map},onMarkersSet:function(res) {    //标注点完成回调
                        map.removeOverlay(res[0].marker); //删除起点
                        for (var i=0;i<points3.length;i++){
                            map.removeOverlay(res[i+1].Tm.Bc);
                            var opts = {
                                position : points3[i],    // 指定文本标注所在的地理位置
                                offset   : new BMap.Size(0,0)    //设置文本偏移量
                            }
                            var label = new BMap.Label(("配送点"+(i+1)), opts);  // 创建文本标注对象
                            label.setStyle({
                                color : "black",
                                fontSize : "12px",
                                height : "20px",
                                lineHeight : "20px",
                                fontFamily:"微软雅黑"
                            });
                            map.addOverlay(label);
                            var tempo = new BMap.Marker(points3[i],{icon:startIcon});
                            map.addOverlay(tempo);
                        }
                        var myEnd = new BMap.Marker(end,{icon:startIcon});
                        map.removeOverlay(res[res.length-1].marker);//删除终点
                        map.addOverlay(myEnd);
                    }});
                    driving2.search(end,end,{waypoints:points3});
                    //常州福利院 月星大厦  工益大厦 常州市德安医院  朝阳二村 朝阳一村
                    var points4=[new BMap.Point(119.982068,31.770484),new BMap.Point(119.978923,31.763113),new BMap.Point(119.985127,31.762483),new BMap.Point(119.985127,31.762483),new BMap.Point(119.985615,31.76712),new BMap.Point(119.985598,31.769511)];
                    var driving4 =  new BMap.DrivingRoute(map, {renderOptions: {map: map},onMarkersSet:function(res) {    //标注点完成回调
                        map.removeOverlay(res[0].marker); //删除起点
                        for (var i=0;i<points4.length;i++){
                            map.removeOverlay(res[i+1].Tm.Bc);
                            var opts = {
                                position : points4[i],    // 指定文本标注所在的地理位置
                                offset   : new BMap.Size(0,0)    //设置文本偏移量
                            }
                            var label = new BMap.Label(("配送点"+(i+1)), opts);  // 创建文本标注对象
                            label.setStyle({
                                color : "black",
                                fontSize : "12px",
                                height : "20px",
                                lineHeight : "20px",
                                fontFamily:"微软雅黑"
                            });
                            map.addOverlay(label);
                            var tempo = new BMap.Marker(points4[i],{icon:startIcon});
                            map.addOverlay(tempo);
                        }
                        var myEnd = new BMap.Marker(end,{icon:startIcon});
                        map.removeOverlay(res[res.length-1].marker);//删除终点
                        map.addOverlay(myEnd);
                    }});
                    driving4.search(end,end,{waypoints:points4});
                    //169创意工厂 绿地世纪城 馨和园 星港花苑  景瑞英郡  梧桐香郡花园
                    var points5=[new BMap.Point(119.931827,31.822977),new BMap.Point(119.929789,31.827868), new BMap.Point(119.901564,31.831348),
                    new BMap.Point(119.897375,31.813954) ,new BMap.Point(119.899816,31.809643),new BMap.Point(119.895258,31.798207)];
                    var driving5 =  new BMap.DrivingRoute(map, {renderOptions: {map: map},onMarkersSet:function(res) {    //标注点完成回调
                        map.removeOverlay(res[0].marker); //删除起点
                        for (var i=0;i<points5.length;i++){
                            map.removeOverlay(res[i+1].Tm.Bc);
                            var opts = {
                                position : points5[i],    // 指定文本标注所在的地理位置
                                offset   : new BMap.Size(0,0)    //设置文本偏移量
                            }
                            var label = new BMap.Label(("配送点"+(i+1)), opts);  // 创建文本标注对象
                            label.setStyle({
                                color : "black",
                                fontSize : "12px",
                                height : "20px",
                                lineHeight : "20px",
                                fontFamily:"微软雅黑"
                            });
                            map.addOverlay(label);
                            var tempo = new BMap.Marker(points5[i],{icon:startIcon});
                            map.addOverlay(tempo);
                        }
                    }});
                    driving5.search(end,end,{waypoints:points5});
                    //世贸香槟湖 香树湾名苑 小湖新村 力康医药公司 秀江南国墅 常州环球恐龙城维景国际大酒店
                    var points6=[new BMap.Point(120.005297,31.821001),new BMap.Point(120.001014,31.842814),new BMap.Point(120.004969,31.86196),new BMap.Point(119.993902,31.835959),
                    new BMap.Point(120.018745,31.832642),new BMap.Point(120.016769,31.82416)];
                    var driving6 =  new BMap.DrivingRoute(map, {renderOptions: {map: map},onMarkersSet:function(res) {    //标注点完成回调
                    map.removeOverlay(res[0].marker); //删除起点
                    for (var i=0;i<points6.length;i++){
                        map.removeOverlay(res[i+1].Tm.Bc);
                        var opts = {
                            position : points6[i],    // 指定文本标注所在的地理位置
                            offset   : new BMap.Size(0,0)    //设置文本偏移量
                        }
                        var label = new BMap.Label(("配送点"+(i+1)), opts);  // 创建文本标注对象
                        label.setStyle({
                            color : "black",
                            fontSize : "12px",
                            height : "20px",
                            lineHeight : "20px",
                            fontFamily:"微软雅黑"
                        });
                        map.addOverlay(label);
                        var tempo = new BMap.Marker(points6[i],{icon:startIcon});
                        map.addOverlay(tempo);
                    }
                }});
                    driving6.search(end,end,{waypoints:points6});
                }
            }
        }
    }
</script>

<style scoped>
</style>


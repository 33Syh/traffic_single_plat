webpackJsonp([15],{"2/oC":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("mvHQ"),i=s.n(a),n=s("Xxa5"),o=s.n(n),r=s("exGp"),c=s.n(r),_={data:function(){return{playerOptions:[],playerOptionsflag:{height:"100",sources:[{type:"rtmp/mp4",src:"rtmp://192.168.245.37:1935/mylive/test1"}],notSupportedMessage:"此视频暂无法播放，请稍后再试",techOrder:["flash"],autoplay:!0,fluid:!0,controls:!1,flash:{swf:"static/video-js.swf"},controlBar:{timeDivider:!0,durationDisplay:!0,remainingTimeDisplay:!1,fullscreenToggle:!0}},personList:[],crossList:[],sumInfo:[],cameraLists:[],videoInfoList:[{camera_num:"",direct_type:"",id:1,model:"",type:1}],cameraData:[],roadInfo:{cross_name:"",longitude:"",latitude:"",cross_type:""},camerInfo:{},isShow:!1,videoIndex:0,videoId:0}},sockets:{connect:function(){},camera_response:function(t){var e=this;try{var s=JSON.parse(t.data);if(this.crossList=[],s.length<1||!s)return;s.map(function(t){e.directSwitch(t),t.sum_info&&(t.sum_info.flow_avg_sum=t.sum_info.flow_avg_sum.toFixed(0),t.sum_info.queeze_length_avg=t.sum_info.queeze_length_avg.toFixed(0),t.sum_info.speed_avg_sum=t.sum_info.speed_avg_sum.toFixed(2),t.sum_info.car_type_sum.big=t.sum_info.car_type_sum.big.toFixed(0),t.sum_info.car_type_sum.small=t.sum_info.car_type_sum.small.toFixed(0)),e.crossList.push(t)}),this.cameraLists.forEach(function(t){e.crossList.forEach(function(s){s.direct_type===t.direct_type&&(t.socketData=s,e.$forceUpdate())})}),this.videoInfoList.forEach(function(t){e.crossList.forEach(function(s){s.direct_type===t.direct_type&&(t.socketData=s,e.$forceUpdate())})})}catch(t){}},walk_camera_response:function(t){var e=this;try{var s=JSON.parse(t.data);if(this.personList=[],!s||s.length<1)return;s.map(function(t){t.direct_list.length<1||(t.direct_list.map(function(t){t.walk_calculate.person_exist=t.walk_calculate.person_exist.toFixed(0),t.walk_calculate.person_volume=t.walk_calculate.person_volume.toFixed(0)}),e.directSwitch(t),e.personList.push(t))}),this.cameraLists.forEach(function(t){e.personList.forEach(function(s){s.direct_type===t.direct_type&&(t.socketData=s,e.$forceUpdate())})}),this.videoInfoList.forEach(function(t){e.crossList.forEach(function(s){s.direct_type===t.direct_type&&(t.socketData=s,e.$forceUpdate())})})}catch(t){}}},created:function(){this.init()},mounted:function(){},methods:{init:function(){var t=this;return c()(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getRoadInfo();case 2:return e.next=4,t.getCameraList();case 4:return e.next=6,t.play(0,t.cameraLists[0]);case 6:case"end":return e.stop()}},e,t)}))()},getCameraList:function(){var t=this;return c()(o.a.mark(function e(){var s,a,i;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("phaselist/");case 2:if(s=e.sent,a=s.data.camera_list,t.cameraData=a,i=[],a.map(function(e){t.directSwitch(e),""===e.camera_num&&(e.camera_num="未关联"),e.id&&(i.push(e),i.socketData={})}),t.cameraLists=i,t.cloneVideo(),!(i.length<1)){e.next=11;break}return e.abrupt("return");case 11:t.getCamerInfo(i[0].id);case 12:case"end":return e.stop()}},e,t)}))()},getCamerInfo:function(t){var e=this;return c()(o.a.mark(function s(){var a;return o.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,e.$http.get("camerainfo/"+t+"/");case 2:a=s.sent,e.camerInfo=a.data,e.directSwitch(e.camerInfo);case 5:case"end":return s.stop()}},s,e)}))()},getRoadInfo:function(){var t=this;return c()(o.a.mark(function e(){var s,a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("crossroadinfo/");case 2:s=e.sent,a=s.data,t.roadInfo.cross_name=a.cross_name,t.roadInfo.equipment_type=a.equipment_type+"",t.roadInfo.longitude=a.longitude,t.roadInfo.latitude=a.latitude,t.roadInfo.cross_type=a.cross_type+"",1===a.cross_type?t.roadInfo.cross_type="十字形":2===a.cross_type?t.roadInfo.cross_type="Y字形":3===a.cross_type&&(t.roadInfo.cross_type="T字形");case 10:case"end":return e.stop()}},e,t)}))()},changeVideo:function(t,e){var s=this;return c()(o.a.mark(function a(){var i;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(s.isShow=!s.isShow,s.videoId=e.id,!s.isShow){a.next=9;break}s.getCamerInfo(e.id),s.videoInfoList[0]=s.cameraLists[t],s.playerOptions[0]=s.playerOptions[t],s.playerOptions[0].autoplay=!0,a.next=12;break;case 9:return a.next=11,s.getCameraList();case 11:for(i=0;i<s.cameraLists.length;i++)e.id===s.cameraLists[i].id&&(s.play(i,s.cameraLists[i]),s.playerOptions[i].autoplay=!0);case 12:case"end":return a.stop()}},a,s)}))()},cloneVideo:function(){for(var t=0;t<this.cameraLists.length;t++)this.playerOptions[t]=JSON.parse(i()(this.playerOptionsflag)),this.playerOptions[t].sources[0].src=this.cameraLists[t].src},play:function(t,e){this.videoIndex=t,e&&this.getCamerInfo(e.id);for(var s=document.querySelectorAll(".video_mask"),a=0;a<this.cameraLists.length;a++)s[a].style.display="block",s[a].parentElement.style.height=s[t].parentElement.clientWidth/16*9+"px",s[a].firstChild.style.display="block";this.playerOptions.length<1||(this.playerOptions[t].sources[0].src=this.cameraLists[t].src,s[t].style.display="none",s[t].firstChild.style.display="none",this.playerOptions[t].autoplay=!0)},directSwitch:function(t){1===t.direct_type?t.direct_type="东进口":2===t.direct_type?t.direct_type="西进口":3===t.direct_type?t.direct_type="南进口":4===t.direct_type?t.direct_type="北进口":5===t.direct_type?t.direct_type="东行人":6===t.direct_type?t.direct_type="西行人":7===t.direct_type?t.direct_type="南行人":8===t.direct_type&&(t.direct_type="北行人")}},beforeDestroy:function(){}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"monitor"},[s("div",{staticClass:"main-layout"},[t._m(0),t._v(" "),s("el-row",{attrs:{gutter:24}},[t.isShow?t._e():s("el-col",{attrs:{span:18}},[s("el-card",{staticClass:"monitor_layout",attrs:{shadow:"always"}},[t.cameraLists.length>0?s("el-row",{attrs:{gutter:20}},t._l(t.cameraLists,function(e,a){return s("div",{key:a},[e.id?s("el-col",{attrs:{span:8}},[s("el-card",{staticClass:"video_layout",attrs:{shadow:"always"}},[s("div",{staticClass:"camera_direct"},[s("span",{staticClass:"tag_line"},[t._v(t._s(e.direct_type))]),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:!(t.isShow&&t.videoId===e.id),expression:"!(isShow && videoId === item.id)"}],on:{click:function(s){return t.changeVideo(a,e)}}}),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:t.isShow&&t.videoId===e.id,expression:"isShow && videoId === item.id"}],on:{click:function(s){return t.changeVideo(a,e)}}})]),t._v(" "),s("div",{staticClass:"video_box"},[t.videoIndex===a?s("video-player",{ref:"videoPlayer",refInFor:!0,staticClass:"video-js vjs-big-play-centered vjs-fluid",attrs:{controls:"",preload:"auto",playsinline:!0,options:t.playerOptions[a]}}):t._e(),t._v(" "),s("span",{staticClass:"video_mask",on:{click:function(s){return t.play(a,e)}}},[s("i")])],1),t._v(" "),s("div",{staticClass:"video_info"},[e.direct_type.indexOf("进口")>-1&&e.socketData?s("div",{staticClass:"video_data_info"},[s("p",[s("span",{staticClass:"lable_name"},[t._v("车辆类型统计")]),t._v(":\n                        大型: "+t._s(e.socketData.sum_info.car_type_sum?e.socketData.sum_info.car_type_sum.big:"")+"辆\n                        小型: "+t._s(e.socketData.sum_info.car_type_sum?e.socketData.sum_info.car_type_sum.small:"")+"辆\n                      ")]),t._v(" "),s("p",[s("span",{staticClass:"lable_name"},[t._v("总车道流量")]),t._v(":\n                        "+t._s(e.socketData.sum_info.flow_avg_sum>=0?e.socketData.sum_info.flow_avg_sum:"")+" 辆/分\n                      ")]),t._v(" "),s("p",[s("span",{staticClass:"lable_name"},[t._v("平均车速")]),t._v(":\n                        "+t._s(e.socketData.sum_info.speed_avg_sum?e.socketData.sum_info.speed_avg_sum:"")+" km/h\n                      ")])]):t._e(),t._v(" "),e.direct_type.indexOf("行人")>-1&&e.socketData?s("div",{staticClass:"video_data_info"},[s("p",[s("span",{staticClass:"lable_name"},[t._v("区域总人数 ")]),t._v(":\n                        "+t._s(e.socketData?e.socketData.direct_list[0].walk_calculate.person_exist:"")+"人\n                      ")]),t._v(" "),s("P",[s("span",{staticClass:"lable_name"},[t._v("路口人流量 ")]),t._v(":\n                        "+t._s(e.socketData?e.socketData.direct_list[0].walk_calculate.person_volume:"")+"人/分\n                      ")])],1):t._e(),t._v(" "),e.socketData?t._e():s("div",{staticClass:"video_data_info"},[s("span",{staticClass:"warning_info"},[t._v("\n                        该方向未配置检测区\n                      ")])])])])],1):t._e()],1)}),0):t._e(),t._v(" "),t.cameraLists.length<1?s("p",{staticClass:"noData"},[t._v("暂无监控信息")]):t._e()],1)],1),t._v(" "),t.isShow?s("el-col",{staticClass:"active",attrs:{span:18}},t._l(t.videoInfoList,function(e,a){return s("el-col",{key:a,attrs:{span:24}},[s("el-card",{staticClass:"video_layout",attrs:{shadow:"always"}},[s("div",{staticClass:"camera_direct",staticStyle:{margin:"10px 0","font-size":"16px"}},[s("span",{staticClass:"tag_line"},[t._v(t._s(e.direct_type))]),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:!(t.isShow&&t.videoId===e.id),expression:"!(isShow && videoId === item.id)"}],on:{click:function(s){return t.changeVideo(a,e)}}}),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:t.isShow&&t.videoId===e.id,expression:"isShow && videoId === item.id"}],on:{click:function(s){return t.changeVideo(a,e)}}})]),t._v(" "),s("div",{staticClass:"video_boxs"},[s("video-player",{staticClass:"video-js vjs-big-play-centered vjs-fluid",attrs:{controls:"",preload:"auto",playsinline:!0,options:t.playerOptions[a]}})],1)])],1)}),1):t._e(),t._v(" "),s("el-col",{attrs:{span:6}},[s("el-card",{staticClass:"monitor_layout video_details",attrs:{shadow:"always"}},[s("h3",{directives:[{name:"show",rawName:"v-show",value:!t.isShow,expression:"!isShow"}]},[t._v("视频详情")]),t._v(" "),s("h4",{directives:[{name:"show",rawName:"v-show",value:!t.isShow,expression:"!isShow"}],staticClass:"tag_line",staticStyle:{"margin-bottom":"10px"}},[t._v("设备配置")]),t._v(" "),s("el-table",{directives:[{name:"show",rawName:"v-show",value:!t.isShow,expression:"!isShow"}],staticClass:"device-info",staticStyle:{width:"100%"},attrs:{data:t.cameraData}},[s("el-table-column",{attrs:{label:"摄像头方向",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.direct_type))])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"摄像头编号",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{style:"未关联"===e.row.camera_num?"color: red":""},[t._v(t._s("未关联"===e.row.camera_num?"---":e.row.camera_num))])]}}])})],1),t._v(" "),s("h4",{staticClass:"tag_line"},[t._v("路口信息")]),t._v(" "),t.roadInfo.cross_name?s("div",[s("p",[s("span",{staticClass:"lable_name"},[t._v("路口名称")]),t._v(":\n              "),s("span",[t._v(t._s(t.roadInfo.cross_name))])]),t._v(" "),s("p",{staticStyle:{margin:"15px 0"}},[s("span",{staticClass:"lable_name"},[t._v("经纬度 ")]),t._v(":\n              "),s("span",[t._v(t._s(t.roadInfo.longitude))]),t._v(",\n              "),s("span",[t._v(t._s(t.roadInfo.latitude))])]),t._v(" "),s("p",[s("span",{staticClass:"lable_name"},[t._v("路口类型")]),t._v(":\n              "),s("span",[t._v(t._s(t.roadInfo.cross_type))])])]):t._e(),t._v(" "),t.roadInfo.cross_name?t._e():s("div",[s("p",{staticClass:"warning_infos"},[t._v("暂无数据")])]),t._v(" "),s("h4",{staticClass:"tag_line"},[t._v("设备详情")]),t._v(" "),t.camerInfo.camera_num?s("div",[s("p",[s("span",{staticClass:"lable_name"},[t._v("设备编号")]),t._v(":\n              "),s("span",[t._v(t._s(t.camerInfo.camera_num))])]),t._v(" "),s("p",[s("span",{staticClass:"lable_name"},[t._v("设备状态")]),t._v(":\n              "),t.camerInfo.direct_type?s("span",[t._v("正常")]):t._e()]),t._v(" "),s("p",[s("span",{staticClass:"lable_name"},[t._v("识别方向")]),t._v(":\n              "),s("span",[t._v(t._s(t.camerInfo.direct_type))])]),t._v(" "),s("p",[s("span",{staticClass:"lable_name"},[t._v("设备型号")]),t._v(":\n              "),s("span",[t._v(t._s(t.camerInfo.model))])]),t._v(" "),s("p",[s("span",{staticClass:"lable_name"},[t._v("道路类型")]),t._v(":\n              "),s("span",[t._v(t._s(1===t.camerInfo.type?"车道识别":2===t.camerInfo.type?"人行道识别":""))])]),t._v(" "),s("p",[s("span",{staticClass:"lable_name"},[t._v("设备高度")]),t._v(":\n              "),s("span",[t._v(t._s(t.camerInfo.height)+"m")])])]):t._e(),t._v(" "),t.camerInfo.camera_num?t._e():s("div",[s("p",{staticClass:"warning_infos"},[t._v("暂无数据")])])],1),t._v(" "),s("el-card",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"monitor_layout video_details",staticStyle:{"margin-top":"20px"},attrs:{shadow:"always"}},[s("h4",{staticClass:"tag_line"},[t._v("道路信息")]),t._v(" "),t.videoInfoList[0].socketData&&t.videoInfoList[0].direct_type.indexOf("进口")>-1?s("div",[s("p",[s("span",{staticStyle:{color:"#666666"}},[t._v("摄像头识别方向")]),t._v(":\n              "),s("span",[t._v(t._s(t.videoInfoList[0].socketData.direct_type))])]),t._v(" "),s("p",[s("span",{staticStyle:{color:"#666666"}},[t._v("车道总流量")]),t._v(":\n              "+t._s(t.videoInfoList[0].socketData.sum_info.flow_avg_sum>=0?t.videoInfoList[0].socketData.sum_info.flow_avg_sum:"")+" 辆/分\n            ")]),t._v(" "),s("p",[s("span",{staticStyle:{color:"#666666"}},[t._v("平均车速")]),t._v("    :\n              "+t._s(t.videoInfoList[0].socketData.sum_info.speed_avg_sum?t.videoInfoList[0].socketData.sum_info.speed_avg_sum:"")+" km/h\n            ")]),t._v(" "),s("p",[s("span",{staticStyle:{color:"#666666"}},[t._v("车辆类型")]),t._v(":\n              大型:"+t._s(t.videoInfoList[0].socketData.sum_info.car_type_sum?t.videoInfoList[0].socketData.sum_info.car_type_sum.big:"")+"辆\n              小型:"+t._s(t.videoInfoList[0].socketData.sum_info.car_type_sum?t.videoInfoList[0].socketData.sum_info.car_type_sum.small:"")+"辆\n            ")])]):t._e(),t._v(" "),t.videoInfoList[0].socketData&&t.videoInfoList[0].direct_type.indexOf("行人")>-1?s("div",[s("p",[s("span",{staticStyle:{color:"#666666"}},[t._v("区域总人数")]),t._v(":\n              "+t._s(t.videoInfoList[0].socketData.direct_list?t.videoInfoList[0].socketData.direct_list[0].walk_calculate.person_exist:"")+"人\n            ")]),t._v(" "),s("p",[s("span",{staticStyle:{color:"#666666"}},[t._v("路口人流量")]),t._v(":\n              "+t._s(t.videoInfoList[0].socketData.direct_list[0]?t.videoInfoList[0].socketData.direct_list[0].walk_calculate.person_volume:"")+"人/分\n            ")])]):t._e(),t._v(" "),t.videoInfoList[0].socketData?t._e():s("div",[s("span",{staticClass:"warning_infos"},[t._v("\n              该方向未配置检测区\n            ")])])])],1)],1)],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"monitor_title"},[e("h5",[this._v("视频监控")])])}]};var d=s("VU/8")(_,l,!1,function(t){s("yTYl"),s("e8s1")},"data-v-e5a8c8c4",null);e.default=d.exports},e8s1:function(t,e){},yTYl:function(t,e){}});
webpackJsonp([19],{"8+rP":function(t,e){},beNu:function(t,e){},kt54:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("Xxa5"),a=n.n(i),l=n("exGp"),s=n.n(l),o={data:function(){return{viewFormVisible:!1,t:"",view_list:"",fixedplan_list:[],phase_data:{phase_num:"",phase_name:"",type:"1"},schemeFormVisible:!1,schemeLabelWidth:"120px",all_data:"",add_list:{green_time:1,yellow_time:1,red_time:1},formLabelWidth:"120px",checkList:[],cityOptions:[]}},computed:{xiangwei:function(){return this.cityOptions}},mounted:function(){this.initial()},methods:{initial:function(){var t=this;return s()(a.a.mark(function e(){var n,i,l,s,o;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("phaselist/");case 2:if(n=e.sent,i=n.code,l=n.data,200===i)for(s=l.phase_list,t.fixedplan_list=s,o=0;o<s.length;o++)"light_num"in s[o].light_info?s[o].light_num=s[o].light_info.light_num:s[o].light_num="未关联";case 5:case"end":return e.stop()}},e,t)}))()},getphaselist:function(){var t=this;this.$http({method:"get",url:"phaselist/"}).then(function(e){if(200===e.code){var n=e.data.phase_list;t.cityOptions=n;for(var i=0;i<t.cityOptions.length;i++)t.cityOptions[i].judge=!1}})},get_listcont:function(t){for(var e=[],n=0;n<t.length;n++)e.push(t[n].id);return e},handlecheckListChange:function(t){var e=t.length;this.checklabel=e>0&&e<this.xiangwei.length}}},r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._m(0),t._v(" "),n("el-table",{staticClass:"device-info",staticStyle:{width:"100%"},attrs:{data:t.fixedplan_list,"header-cell-style":{background:"#FAFAFA"},type:"index"}},[n("el-table-column",{attrs:{label:"相位序号",align:"center","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.phase_num))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"方向",align:"center","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.phase_name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"类型",align:"center","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(1==e.row.type?"机动相位":"行人相位"))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"状态",align:"center","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.light_num))])]}}])})],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tit"},[e("em",{staticClass:"table-title"},[this._v("相位设置")])])}]};var c=n("VU/8")(o,r,!1,function(t){n("beNu"),n("8+rP")},"data-v-677346bc",null);e.default=c.exports}});
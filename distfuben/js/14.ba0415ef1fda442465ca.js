webpackJsonp([14],{"HF/O":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("mvHQ"),n=i.n(s),a=i("Xxa5"),l=i.n(a),o=i("exGp"),r=i.n(o),c={data:function(){return{t:"",checklabel:!0,fixedplan_list:[{phase_num:"1",phase_name:"2",type:"4",create_at:"7",update_at:"8"}],plan_data:{plan_num:"",plan_name:"",type:"1"},schemeFormVisible:!1,schemeLabelWidth:"120px",editFormVisible:!0,edit_data:{},dialogTableVisible:!1,dialogFormVisible:!1,form:{name:"",region:"",date1:"",date2:"",delivery:!1,type:[],resource:"",desc:""},old_list:[],msgVisible:!1,msg_txt:"",current_txt:"",con_sta:" ",add_list:{green_time:1,yellow_time:1,red_time:1},formLabelWidth:"120px",checkList:[],cityOptions:[]}},computed:{xiangwei:function(){return this.cityOptions}},mounted:function(){this.initial(),this.getphaselist()},methods:{initial:function(){var t=this;return r()(l.a.mark(function e(){var i,s,n,a,o,r,c;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("phaselist/");case 2:if(i=e.sent,s=i.code,n=i.data,200===s)for(a=n.phase_list,t.fixedplan_list=a,o=0;o<a.length;o++){if(r="",a[o].fightinfo.length>0){for(c=0;c<a[o].fightinfo.length;c++)r+=a[o].fightinfo[c].phase_num+a[o].fightinfo[c].phase_name,r+=" , ";r=r.substr(0,r.length-2)}else r="未设置";t.fixedplan_list[o].fight_show=r}case 5:case"end":return e.stop()}},e,t)}))()},indexMethod:function(t){return 2*t},addfixedplan:function(){var t=this;return r()(l.a.mark(function e(){var i;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.schemeFormVisible=!1,e.next=3,t.$http.post("addfixedplan/",t.plan_data);case 3:i=e.sent,200===i.code&&t.initial();case 6:case"end":return e.stop()}},e,t)}))()},scheme_edit:function(t,e){this.editFormVisible=!0,this.edit_data=e,this.edit_data.fixedplan_id=e.id},editfixedplan:function(){var t=this;return r()(l.a.mark(function e(){var i;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.post("editfixedplan/",t.edit_data);case 2:i=e.sent,200===i.code&&(t.editFormVisible=!1,t.initial());case 5:case"end":return e.stop()}},e,t)}))()},phase_edit:function(t,e){var i=this;return r()(l.a.mark(function s(){return l.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:i.add_list.fixedplan_id=e.id,i.add_list.plan_name=e.phase_name,i.add_list.plan_num=e.phase_num,i.dialogFormVisible=!0,i.show_sta(t,e);case 5:case"end":return s.stop()}},s,i)}))()},show_sta:function(t,e){for(var i=0;i<this.cityOptions.length;i++)this.cityOptions[i].judge=!1,this.cityOptions[i].checked=!1,e.id===this.cityOptions[i].id&&(this.cityOptions[i].judge=!0,this.defalt_chose(e,e.fightinfo))},defalt_chose:function(t,e){this.checkList=[];for(var i=[],s=0;s<e.length;s++)i.push(e[s].id);for(var n=0;n<i.length;n++)for(var a=0;a<this.cityOptions.length;a++)i[n]===this.cityOptions[a].id&&this.checkList.push(this.cityOptions[a]);this.old_list=this.checkList},msg_cancel:function(){this.msgVisible=!1,this.checkList=this.old_list},msg_prompt:function(t){this.save_result(this.add_list.fixedplan_id),this.msgVisible=!1,this.dialogFormVisible=!1},getphaselist:function(){var t=this;this.$http({method:"get",url:"phaselist/"}).then(function(e){if(200===e.code){var i=e.data.phase_list;t.cityOptions=i}})},get_listcont:function(t){for(var e=[],i=0;i<t.length;i++)e.push(t[i].id);return e},id_process:function(t){for(var e=[],i=0;i<t.length;i++)e.push(t[i].phase_num);return e},if_container:function(){var t=this.id_process(this.old_list),e=this.id_process(this.checkList),i=t.filter(function(t){return-1!==e.indexOf(t)}),s=t.concat(i).filter(function(e){return-1===t.indexOf(e)||-1===i.indexOf(e)});return s.length>0?s.join(","):0},cancel_add:function(){this.dialogFormVisible=!1,this.checkList=this.old_list},addfightphase:function(t){var e=this;return r()(l.a.mark(function i(){var s;return l.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:0!==(s=e.if_container())?(e.msg_txt=s,e.current_txt=e.add_list.plan_num,e.msgVisible=!0,e.res_dig=t):e.save_result(t);case 2:case"end":return i.stop()}},i,e)}))()},save_result:function(t){var e=this;this.add_list.phase_ids=this.get_listcont(this.checkList);for(var i={},s=[],a=0;a<this.add_list.phase_ids.length;a++)s.push(this.add_list.phase_ids[a]);i.fightphase_ids=s,i.crossphase_id=parseInt(t),this.$http({method:"post",url:"addfightphase/",data:{fightphase_ids:n()(s),crossphase_id:parseInt(t)}}).then(function(t){200===t.code&&(e.dialogFormVisible=!1,e.initial())}),this.checkList=[]},handlecheckListChange:function(t){var e=t.length;this.checklabel=e>0&&e<this.xiangwei.length},chosen:function(t){if(t.checked=!t.checked,t.fightinfo.length>0){for(var e=[],i=0;i<this.fixedplan_list.length;i++)!1===this.fixedplan_list[i].judge&&e.push(this.fixedplan_list[i].id);for(var s=0;s<t.fightinfo.length;s++)e.push(t.fightinfo[s].id)}}}},d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t._m(0),t._v(" "),i("el-table",{staticClass:"device-info",staticStyle:{width:"100%"},attrs:{data:t.fixedplan_list,"header-cell-style":{background:"#FAFAFA"},type:"index",index:t.indexMethod}},[i("el-table-column",{attrs:{label:"相位序号",align:"center","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.phase_num))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"方向",align:"center","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.phase_name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"类型",align:"center","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(1==e.row.type?"机动相位":"行人相位"))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"冲突相位",align:"center",width:"250px","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.fight_show))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"更新时间",align:"center","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.fight_at))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"text"},on:{click:function(i){return t.phase_edit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),i("el-dialog",{staticClass:"add_stage",attrs:{align:"left",title:"编辑",width:"500px","close-on-click-modal":!1,visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-row",{staticClass:"add_plan"},[i("el-col",{attrs:{span:8}},[i("div",{staticClass:"grid-content bg-purple"},[t._v("\n                相位序号："+t._s(t.add_list.plan_num)+"\n              ")])]),t._v(" "),i("el-col",{attrs:{span:8}},[i("div",{staticClass:"grid-content bg-purple-light"},[t._v("\n                方向："+t._s(t.add_list.plan_name)+"\n              ")])])],1),t._v(" "),i("el-row",{staticClass:"plan_content"},[i("el-col",{attrs:{span:24}},[i("el-col",{staticClass:"set_camera",attrs:{span:24}},[t._v("相位冲突")]),t._v(" "),i("div",[i("el-row",{attrs:{gutter:20}},[i("el-col",{attrs:{span:12}},[i("div",{staticClass:"grid-content bg-purple"},[i("el-checkbox-group",{staticClass:"set_cam_hei",model:{value:t.checkList,callback:function(e){t.checkList=e},expression:"checkList"}},t._l(t.xiangwei,function(e){return i("el-checkbox",{key:e.phase_name,ref:e.id,refInFor:!0,attrs:{label:e,checked:e.checked,disabled:e.judge},on:{change:function(i){return t.chosen(e)}}},[t._v("相位"+t._s(e.phase_num)+"-"+t._s(e.phase_name))])}),1)],1)])],1)],1)],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer add_btn",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){return t.cancel_add()}}},[t._v("取 消")]),t._v(" "),i("el-button",{staticClass:"definite_btn",on:{click:function(e){return t.addfightphase(t.add_list.fixedplan_id)}}},[t._v("保存")])],1)],1)]}}])})],1),t._v(" "),i("el-dialog",{attrs:{title:"提示",visible:t.msgVisible,width:"30%","close-on-click-modal":!1},on:{"update:visible":function(e){t.msgVisible=e}}},[i("span",[t._v(t._s(t.msg_txt)+"相位与"+t._s(t.current_txt)+"相位为冲突相位，此操作将删除该关联相位配置信息")]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.msg_cancel}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.msg_prompt}},[t._v("确 定")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tit"},[e("em",{staticClass:"table-title"},[this._v("冲突相位设置")])])}]};var h=i("VU/8")(c,d,!1,function(t){i("KmDR"),i("mNyX")},"data-v-f0e2d194",null);e.default=h.exports},KmDR:function(t,e){},mNyX:function(t,e){}});
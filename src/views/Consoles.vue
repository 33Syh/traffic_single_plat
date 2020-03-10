<template>
  <div class="main-layout">
    <div class="control-title">
      <h5>中控台</h5>
    </div>
    <el-row :gutter="24" class="console">
      <el-col :span="8" style="min-height: 160px;">
        <el-card shadow="always">
          <span>基础信息</span>
          <ul>
            <li>
              <span>路口名称:</span>
              <span>{{ crossInfo.cross_name }}</span>
            </li>
            <li>
              <span>设备类型:</span>
              <span>{{ crossInfo.equipment_type }}</span>
            </li>
            <li>
              <span>经纬度:</span>
              <span>{{ crossInfo.latitude }}, {{ crossInfo.longitude }}</span>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="8" style="min-height: 160px;">
        <el-card shadow="always" class="no-default">
          <div class="handle-writing">
            <span>控制方式</span>
            <ul>
              <li>
                <span>控制模式:</span>
                <span>
                  {{
                    crossInfo.control_model === 1
                      ? '自主控制'
                      : crossInfo.control_model === 2
                      ? '中心控制'
                      : ''
                  }}
                </span>
              </li>
              <li>
                <span>控制类型:</span>
                <span>
                  {{
                    crossInfo.control_type === 1
                      ? '策略控制'
                      : crossInfo.control_type === 2
                      ? '时间表控制'
                      : crossInfo.control_type === 3
                      ? '固定时间控制'
                      : crossInfo.control_model === 2
                      ? '绿波协调控制'
                      : ''
                  }}
                  <!-- {{ crossInfo ? crossInfo.control_type : ''}} -->
                </span>
              </li>
              <li class="nowrap">
                <span>控制方案:</span>
                <span class="nowrap" v-if="!crossInfo.plan_info.plan_name">{{
                  crossInfo.tacplan_info.plan_name
                }}</span>
                <span class="nowrap" v-if="crossInfo.plan_info.plan_name">{{
                  crossInfo.plan_info.plan_name
                }}</span>
              </li>
            </ul>
          </div>
          <!-- 等于2的时候是中心控制 -->
          <div
            class="turn-type"
            @click="
              changeType(
                crossInfo.control_model === 2 ? 1 : 0,
                crossInfo.plan_info,
              )
            "
          >
            修改控制类型
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" class="control_pop" style="min-height: 160px;">
        <div class="control_mask" :style="{ display: isShowMask }">
          Loading...
        </div>
        <el-card shadow="always ">
          <span>紧急控制</span>
          <div class="light-control">
            <span @click="beginRed"> <i class="red"></i>全红 </span>
            <span @click="beginYellow"> <i></i>开始黄闪 </span>
          </div>
          <!-- <div class="stop" @click="stop">
            <i :class="start === '停止运行' ? 'el-icon-remove' : 'el-icon-success green'"></i>
            {{start}}
          </div>-->
          <div class="light-control">
            <span @click="stop">
              <i class="el-icon-remove" style="color: #eb4b4b"></i>停止运行
            </span>
            <span @click="started">
              <i class="el-icon-success green"></i>开始运行
            </span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="equipment">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-card shadow="always">
            <el-row>
              <el-col :span="8">
                <div class="f_left">
                  <h5>设备状态:</h5>
                  <span>
                    {{ socketData.equip_status === 1 ? '运行中' : '故障 ' }}
                    <i
                      :class="
                        socketData.equip_status === 1
                          ? 'el-icon-success green'
                          : 'el-icon-error dang'
                      "
                    ></i>
                  </span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="f_center">
                  <h5>信号控制器:</h5>
                  <span>
                    {{ socketData.control_status === '00' ? '正常' : '故障 ' }}
                    <i
                      :class="
                        socketData.control_status === '00'
                          ? 'el-icon-success green'
                          : 'el-icon-error dang'
                      "
                    ></i>
                  </span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="f_right">
                  <h5>信号灯:</h5>
                  <span>
                    {{ socketData.light_status === 1 ? '正常' : '故障 ' }}
                    <i
                      :class="
                        socketData.light_status === 1
                          ? 'el-icon-success green'
                          : 'el-icon-error dang'
                      "
                    ></i>
                  </span>
                </div>
              </el-col>
            </el-row>
            <div
              class="content"
              style="display:flex;display: -webkit-flex;flex-flow:row;width:100%;"
            >
              <div class="content_left">
                <div class="device">
                  <div class="crossBg">
                    <el-col
                      :span="16"
                      class="content_crossBg_inside"
                      style="position: absolute;"
                    >
                      <div class="div_n">
                        <div class="phase">
                          <span title="北左">{{
                            phaseTraffic.length === 0
                              ? ''
                              : phaseTraffic[2].phase_num
                          }}</span>
                          <span title="北直">{{
                            phaseTraffic.length === 0
                              ? ''
                              : phaseTraffic[1].phase_num
                          }}</span>
                          <span title="北右">{{
                            phaseTraffic.length === 0
                              ? ''
                              : phaseTraffic[0].phase_num
                          }}</span>
                        </div>
                        <div class="phase_img" style="top: 30px;">
                          <span title="北左">
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/right_1.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/right_2.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/right_3.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/right_4.svg"
                              alt
                            />
                          </span>
                          <span title="北直">
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/straight_1.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/straight_2.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/straight_3.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/straight_4.svg"
                              alt
                            />
                          </span>
                          <span title="北右">
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/left_1.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/left_2.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/left_3.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/left_4.svg"
                              alt
                            />
                          </span>
                        </div>
                        <div class="foot_way">
                          <span
                            title="北行"
                            style="left: 154px;top: 41px;width: 30px;"
                            >{{
                              phaseTraffic.length === 0
                                ? ''
                                : phaseTraffic[12].phase_num
                            }}</span
                          >
                          <span
                            title="北行"
                            class="foot_way_img"
                            style="left: 133px;top: 35px;"
                          >
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/footway_1.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/footway_2.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/footway_3.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/footway_4.svg"
                              alt
                            />
                          </span>
                        </div>
                      </div>
                      <div class="div_w">
                        <div class="phase" style="top:-10px">
                          <span title="西右">{{
                            phaseTraffic.length === 0
                              ? ''
                              : phaseTraffic[5].phase_num
                          }}</span>
                          <span title="西直">{{
                            phaseTraffic.length === 0
                              ? ''
                              : phaseTraffic[4].phase_num
                          }}</span>
                          <span title="西左">{{
                            phaseTraffic.length === 0
                              ? ''
                              : phaseTraffic[3].phase_num
                          }}</span>
                        </div>
                        <div
                          class="phase_img"
                          id="phase_img_w"
                          style="top:27px"
                        >
                          <span title="西右">
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/right_1.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/right_2.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/right_3.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/right_4.svg"
                              alt
                            />
                          </span>
                          <span title="西直">
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/straight_1.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/straight_2.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/straight_3.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/straight_4.svg"
                              alt
                            />
                          </span>
                          <span title="西左">
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/left_1.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/left_2.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/left_3.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/left_4.svg"
                              alt
                            />
                          </span>
                        </div>
                        <div class="foot_way">
                          <span
                            title="西行"
                            style="top: 39px;left: 144px;width: 30px;"
                            >{{
                              phaseTraffic.length === 0
                                ? ''
                                : phaseTraffic[13].phase_num
                            }}</span
                          >
                          <span
                            title="西行"
                            class="foot_way_img"
                            style="left: 131px;top: 40px;"
                          >
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/footway_1.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/footway_2.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/footway_3.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/footway_4.svg"
                              alt
                            />
                          </span>
                        </div>
                      </div>
                      <div class="div_s">
                        <div class="phase">
                          <span title="南右">{{
                            phaseTraffic.length === 0
                              ? ''
                              : phaseTraffic[8].phase_num
                          }}</span>
                          <span title="南直">{{
                            phaseTraffic.length === 0
                              ? ''
                              : phaseTraffic[7].phase_num
                          }}</span>
                          <span title="南左">{{
                            phaseTraffic.length === 0
                              ? ''
                              : phaseTraffic[6].phase_num
                          }}</span>
                        </div>
                        <div class="phase_img">
                          <span title="南右">
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/right_1.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/right_2.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/right_3.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/right_4.svg"
                              alt
                            />
                          </span>
                          <span title="南直">
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/straight_1.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/straight_2.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/straight_3.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/straight_4.svg"
                              alt
                            />
                          </span>
                          <span title="南左">
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/left_1.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/left_2.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/left_3.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/left_4.svg"
                              alt
                            />
                          </span>
                        </div>
                        <div class="foot_way">
                          <span
                            title="南行"
                            style="top: 40px;left: 152px;width: 30px;"
                            >{{
                              phaseTraffic.length === 0
                                ? ''
                                : phaseTraffic[14].phase_num
                            }}</span
                          >
                          <span
                            title="南行"
                            class="foot_way_img"
                            id="foot_way_img_s"
                          >
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/footway_1.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/footway_2.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/footway_3.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/footway_4.svg"
                              alt
                            />
                          </span>
                        </div>
                      </div>
                      <div class="div_e">
                        <div style="top:-11px;" class="phase">
                          <span title="东右">{{
                            phaseTraffic.length === 0
                              ? ''
                              : phaseTraffic[11].phase_num
                          }}</span>
                          <span title="东直">{{
                            phaseTraffic.length === 0
                              ? ''
                              : phaseTraffic[10].phase_num
                          }}</span>
                          <span title="东左">{{
                            phaseTraffic.length === 0
                              ? ''
                              : phaseTraffic[9].phase_num
                          }}</span>
                        </div>
                        <div class="phase_img">
                          <span title="东右">
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/right_1.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/right_2.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/right_3.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/right_4.svg"
                              alt
                            />
                          </span>
                          <span title="东直">
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/straight_1.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/straight_2.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/straight_3.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/straight_4.svg"
                              alt
                            />
                          </span>
                          <span title="东左">
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/left_1.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/left_2.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/left_3.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/left_4.svg"
                              alt
                            />
                          </span>
                        </div>
                        <div class="foot_way">
                          <span
                            title="东行"
                            style="top: 40px;width: 30px;left: 149px;"
                            >{{
                              phaseTraffic.length === 0
                                ? ''
                                : phaseTraffic[15].phase_num
                            }}</span
                          >
                          <span
                            title="东行"
                            class="foot_way_img"
                            style="left:129px"
                          >
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/footway_1.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/footway_2.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/footway_3.svg"
                              alt
                            />
                            <img
                              class="change_img"
                              src="../assets/images/svg/consoles/footway_4.svg"
                              alt
                            />
                          </span>
                        </div>
                      </div>
                      <div class="count_down">
                        <p :style="{ color: timeColor }">
                          {{
                            countDown >= 10
                              ? countDown
                              : 1 > countDown
                              ? '00'
                              : '0' + countDown
                          }}
                        </p>
                      </div>
                      <div
                        style="width: 168px;height: 50px;left: 259px;top: 1px;position: absolute;text-align: center;"
                      >
                        <p style="display:block">北</p>
                        <img
                          class="change_img"
                          src="../assets/images/compasses.png"
                          alt
                        />
                      </div>
                      <div
                        id="cameraEest"
                        style="width: 30px;height: 30px;left: 352px;top: 172px;position: absolute;"
                      >
                        <img
                          class="change_img"
                          v-bind:src="this.camera.eastCamera"
                          alt
                        />
                      </div>
                      <div
                        id="cameraWest"
                        style="width: 30px;height: 30px;left: 4px;top: 132px;position: absolute;"
                      >
                        <img
                          class="change_img"
                          v-bind:src="this.camera.westCamera"
                          alt
                        />
                      </div>
                      <div
                        id="cameraSouth"
                        style="width: 30px;height: 30px;left: 163px;top: 294px;position: absolute;"
                      >
                        <!-- <span>{{this.camera.southCamera}}</span> -->
                        <img
                          class="change_img"
                          v-bind:src="this.camera.southCamera"
                          alt
                        />
                      </div>
                      <div
                        id="cameraNorth"
                        style="width: 30px;height: 30px;left: 201px;top: 3px;position: absolute;"
                      >
                        <img
                          class="change_img"
                          v-bind:src="this.camera.northCamera"
                          alt
                        />
                      </div>
                    </el-col>
                  </div>
                </div>
                <h1 style="font-size: 17px; padding: 10px 10px; ">
                  控制方案:
                  <span style="color: red">{{
                    socketData.roll_part_info.length > 0
                      ? socketData.roll_part_info[0].plan_name
                      : ''
                  }}</span>
                </h1>
                <!-- {{socketData.roll_part_info[0].part_info}} -->
                <div class="per-second">
                  <div class="time_bar" v-if="socketData.roll_part_info !== []">
                    <div class="time_bar_num">
                      <div
                        v-for="(item, i) in socketData.roll_part_info"
                        :key="i"
                        class="time_bar_part"
                      >
                        <span
                          class="green"
                          :style="{
                            width:
                              (item.part_info.green_time * 100) / timeNum + '%',
                          }"
                          v-if="item.part_info.green_time > 0"
                          >{{ item.part_info.green_time }}s</span
                        >
                        <span
                          class="yellow"
                          :style="{
                            width:
                              (item.part_info.yellow_time * 100) / timeNum +
                              '%',
                          }"
                          v-if="item.part_info.yellow_time > 0"
                          >{{ item.part_info.yellow_time }}s</span
                        >
                        <span
                          class="red"
                          :style="{
                            width:
                              (item.part_info.red_time * 100) / timeNum + '%',
                          }"
                          v-if="item.part_info.red_time > 0"
                          >{{ item.part_info.red_time }}s</span
                        >
                      </div>
                    </div>
                    <div
                      class="time_bar_poup"
                      :style="{ width: timeBarPoupWidth + '%' }"
                    >
                      <span></span>
                    </div>
                  </div>
                  <div class="roll_phase_img">
                    <div
                      v-for="(item, i) in socketData.roll_part_info"
                      :key="i"
                      class="part_img"
                      :class="{
                        active:
                          socketData.map_info.part_info.part_num - 1 === i,
                      }"
                    >
                      <div class="center_num">
                        {{ item.part_info.part_num }}
                      </div>
                      <div class="part_n">
                        <div class="map_phase_img">
                          <span class="phase_img_r">
                            <img
                              :style="
                                item.phase_info[2].status !== 3
                                  ? { display: 'none' }
                                  : ''
                              "
                              class="change_img"
                              src="../assets/images/svg/consoles/part/part_right.svg"
                              alt
                            />
                          </span>
                          <span class="phase_img_c">
                            <img
                              :style="
                                item.phase_info[1].status !== 3
                                  ? { display: 'none' }
                                  : ''
                              "
                              class="change_img"
                              src="../assets/images/svg/consoles/part/part_straight.svg"
                              alt
                            />
                          </span>
                          <span class="phase_img_l">
                            <img
                              :style="
                                item.phase_info[0].status !== 3
                                  ? { display: 'none' }
                                  : ''
                              "
                              class="change_img"
                              src="../assets/images/svg/consoles/part/part_left.svg"
                              alt
                            />
                          </span>
                        </div>
                        <div class="foot_way">
                          <span class="phase_img_l">
                            <img
                              :style="
                                item.phase_info[12].status !== 3
                                  ? { display: 'none' }
                                  : ''
                              "
                              class="change_img"
                              src="../assets/images/svg/consoles/part/part_footway.svg"
                              alt
                            />
                          </span>
                        </div>
                      </div>
                      <div class="part_w">
                        <div class="map_phase_img">
                          <span class="phase_img_r">
                            <img
                              :style="
                                item.phase_info[5].status !== 3
                                  ? { display: 'none' }
                                  : ''
                              "
                              class="change_img"
                              src="../assets/images/svg/consoles/part/part_right.svg"
                              alt
                            />
                          </span>
                          <span class="phase_img_c">
                            <img
                              :style="
                                item.phase_info[4].status !== 3
                                  ? { display: 'none' }
                                  : ''
                              "
                              class="change_img"
                              src="../assets/images/svg/consoles/part/part_straight.svg"
                              alt
                            />
                          </span>
                          <span class="phase_img_l">
                            <img
                              :style="
                                item.phase_info[3].status !== 3
                                  ? { display: 'none' }
                                  : ''
                              "
                              class="change_img"
                              src="../assets/images/svg/consoles/part/part_left.svg"
                              alt
                            />
                          </span>
                        </div>
                        <div class="foot_way">
                          <span class="phase_img_l">
                            <img
                              :style="
                                item.phase_info[13].status !== 3
                                  ? { display: 'none' }
                                  : ''
                              "
                              class="change_img"
                              src="../assets/images/svg/consoles/part/part_footway.svg"
                              alt
                            />
                          </span>
                        </div>
                      </div>
                      <div class="part_s">
                        <div class="map_phase_img">
                          <span class="phase_img_r">
                            <img
                              :style="
                                item.phase_info[8].status !== 3
                                  ? { display: 'none' }
                                  : ''
                              "
                              class="change_img"
                              src="../assets/images/svg/consoles/part/part_right.svg"
                              alt
                            />
                          </span>
                          <span class="phase_img_c">
                            <img
                              :style="
                                item.phase_info[7].status !== 3
                                  ? { display: 'none' }
                                  : ''
                              "
                              class="change_img"
                              src="../assets/images/svg/consoles/part/part_straight.svg"
                              alt
                            />
                          </span>
                          <span class="phase_img_l">
                            <img
                              :style="
                                item.phase_info[6].status !== 3
                                  ? { display: 'none' }
                                  : ''
                              "
                              class="change_img"
                              src="../assets/images/svg/consoles/part/part_left.svg"
                              alt
                            />
                          </span>
                        </div>
                        <div class="foot_way">
                          <span class="phase_img_l">
                            <img
                              :style="
                                item.phase_info[14].status !== 3
                                  ? { display: 'none' }
                                  : ''
                              "
                              class="change_img"
                              src="../assets/images/svg/consoles/part/part_footway.svg"
                              alt
                            />
                          </span>
                        </div>
                      </div>
                      <div class="part_e">
                        <div class="map_phase_img">
                          <span class="phase_img_r">
                            <img
                              :style="
                                item.phase_info[11].status !== 3
                                  ? { display: 'none' }
                                  : ''
                              "
                              class="change_img"
                              src="../assets/images/svg/consoles/part/part_right.svg"
                              alt
                            />
                          </span>
                          <span class="phase_img_c">
                            <img
                              :style="
                                item.phase_info[10].status !== 3
                                  ? { display: 'none' }
                                  : ''
                              "
                              class="change_img"
                              src="../assets/images/svg/consoles/part/part_straight.svg"
                              alt
                            />
                          </span>
                          <span class="phase_img_l">
                            <img
                              :style="
                                item.phase_info[9].status !== 3
                                  ? { display: 'none' }
                                  : ''
                              "
                              class="change_img"
                              src="../assets/images/svg/consoles/part/part_left.svg"
                              alt
                            />
                          </span>
                        </div>
                        <div class="foot_way">
                          <span class="phase_img_l">
                            <img
                              :style="
                                item.phase_info[15].status !== 3
                                  ? { display: 'none' }
                                  : ''
                              "
                              class="change_img"
                              src="../assets/images/svg/consoles/part/part_footway.svg"
                              alt
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card style="padding-bottom:63px" shadow="always">
            <div id="consoles_device_details">
              <h4 class="lable_name">设备详情</h4>
              <ul
                id="consoles_device_details_list"
                style="display:block;list-style-type:none;line-height: 20px;letter-spacing:1px;"
              >
                <li>
                  <span>控制类型:</span>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="
                      crossInfo.control_type === 1
                        ? '策略控制'
                        : crossInfo.control_type === 2
                        ? '时间表控制'
                        : crossInfo.control_type === 3
                        ? '固定时间控制'
                        : crossInfo.control_model === 2
                        ? '绿波协调控制'
                        : ''
                    "
                    placement="top-start"
                  >
                    <span>{{
                      crossInfo.control_type === 1
                        ? '策略控制'
                        : crossInfo.control_type === 2
                        ? '时间表控制'
                        : crossInfo.control_type === 3
                        ? '固定时间控制'
                        : crossInfo.control_model === 2
                        ? '绿波协调控制'
                        : ''
                    }}</span>
                  </el-tooltip>
                </li>
                <li>
                  <span>方案编号:</span>
                  <span>{{ this.deviceDetails.plan_id }}</span>
                </li>
                <li style="">
                  <span>方案名称:</span>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="
                      socketData.roll_part_info.length > 0
                        ? socketData.roll_part_info[0].plan_name
                        : ''
                    "
                    placement="top-start"
                  >
                    <span>{{
                      socketData.roll_part_info.length > 0
                        ? socketData.roll_part_info[0].plan_name
                        : ''
                    }}</span>
                  </el-tooltip>
                </li>
                <li>
                  <span>周期总时长:</span>
                  <span>{{ this.deviceDetails.Total_time }}秒</span>
                </li>
                <li>
                  <span>阶段总数:</span>
                  <span>{{ this.deviceDetails.Total_number }}</span>
                </li>
                <li>
                  <span>当前阶段号:</span>
                  <span style="color:rgba(64,158,255,1)">{{
                    this.deviceDetails.part_num
                  }}</span>
                </li>
                <li>
                  <span>阶段总时长:</span>
                  <span>{{ this.deviceDetails.Phase_time }}秒</span>
                </li>
                <li>
                  <span>阶段运行时长:</span>
                  <span>
                    <i style="color:rgba(64,158,255,1);font-style:normal">{{
                      this.deviceDetails.run_time
                    }}</i
                    >秒</span
                  >
                </li>
              </ul>
            </div>
          </el-card>
          <el-card shadow="always" style="margin-top:20px">
            <div id="consoles_device_details">
              <h4 class="lable_name">摄像头状态</h4>
              <ul
                id="consoles_device_details_Camera_list"
                style="display:block;list-style-type:none;line-height: 20px;letter-spacing:1px;"
              >
                <li>
                  <span>北进口:</span>
                  <span>
                    {{ this.videoDetails.northEntrance }}
                    <i :class="this.videoDetails.northEntranceIcon"></i>
                  </span>
                </li>
                <li>
                  <span>西进口:</span>
                  <span>
                    {{ this.videoDetails.westEntrance }}
                    <i :class="this.videoDetails.westEntranceIcon"></i>
                  </span>
                </li>
                <li>
                  <span>南进口:</span>
                  <span>
                    {{ this.videoDetails.southEntrance }}
                    <i :class="this.videoDetails.southEntranceIcon"></i>
                  </span>
                </li>
                <li>
                  <span>东进口:</span>
                  <span>
                    {{ this.videoDetails.eastEntrance }}
                    <i :class="this.videoDetails.eastEntranceIcon"></i>
                  </span>
                </li>
              </ul>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always" class="equip-right">
            <div class="video console-video">
              <el-tabs tab-position="bottom" @tab-click="changeVideo">
                <div class="videos">
                  <!-- <videoPlayer class="video-player vjs-custom-skin video-js vjs-big-play-centered vjs-fluid" controls preload="auto" :options="playerOptions"></videoPlayer> -->
                  <video-player
                    class="video-js vjs-big-play-centered vjs-fluid"
                    controls
                    preload="auto"
                    :playsinline="true"
                    :options="playerOptions"
                  ></video-player>
                </div>
                <template class="video_sty">
                  <el-tab-pane class="car_icon" style="height:252px">
                    <span slot="label">
                      <img
                        style="margin-right:20%"
                        src="@/assets/images/car_icon.png"
                      />
                      <i style="font-style:normal">北视频</i>
                    </span>
                  </el-tab-pane>
                  <el-tab-pane
                    label="西视频"
                    style="height:252px"
                    class="disabled"
                  ></el-tab-pane>
                  <el-tab-pane
                    label="南视频"
                    style="height:252px"
                    class="disabled"
                  ></el-tab-pane>
                  <el-tab-pane
                    label="东视频"
                    style="height:252px"
                    class="disabled"
                  ></el-tab-pane>
                  <!-- 人行 -->
                  <el-tab-pane class="car_icon" style="height:252px">
                    <span slot="label">
                      <img
                        style="margin-right:20%"
                        src="@/assets/images/people_icon.png"
                      />
                      <i style="font-style:normal">北视频</i>
                    </span>
                  </el-tab-pane>
                  <el-tab-pane
                    label="西视频"
                    style="height:252px"
                    class="disabled"
                  ></el-tab-pane>
                  <el-tab-pane
                    label="南视频"
                    style="height:252px"
                    class="disabled"
                  ></el-tab-pane>
                  <el-tab-pane
                    label="东视频"
                    style="height:252px"
                    class="disabled"
                  ></el-tab-pane>
                </template>
              </el-tabs>
            </div>
            <div v-if="direct <= 4" class="real-time carwalks">
              <el-tabs type="border-card">
                <el-tab-pane label="车辆流量" v-if="vehicle_list !== []">
                  <div class="car_info" v-for="(v, i) in vehicle_list" :key="i">
                    <span class="data_style"
                      >{{ v.lane_info.lane_name }}({{ v.lane_info.direct }})
                      :</span
                    >
                    {{ !v.lane_calculate ? '' : v.lane_calculate.flow_avg }}
                    辆/分
                  </div>
                  <p>
                    <span class="data_style">总车道流量:</span>
                    {{ sumInfo.flow_avg_sum >= 0 ? sumInfo.flow_avg_sum : '' }}
                    辆/分
                  </p>
                </el-tab-pane>
                <el-tab-pane label="车辆类型" v-if="vehicle_list !== []">
                  <div class="car_info" v-for="(v, i) in vehicle_list" :key="i">
                    <span class="data_style"
                      >{{ v.lane_info.lane_name }}({{ v.lane_info.direct }})
                      :</span
                    >
                    大型:&nbsp;{{
                      !v.lane_calculate ? '' : v.lane_calculate.car_type.big
                    }}辆 &nbsp;&nbsp; 小型:&nbsp;{{
                      !v.lane_calculate ? '' : v.lane_calculate.car_type.small
                    }}辆
                  </div>

                  <p>
                    <span class="data_style">车辆类型统计:</span>
                    大型:
                    {{ sumInfo.car_type_sum ? sumInfo.car_type_sum.big : '' }}辆
                    &nbsp;&nbsp;&nbsp;&nbsp; 小型:
                    {{
                      sumInfo.car_type_sum ? sumInfo.car_type_sum.small : ''
                    }}辆
                  </p>
                </el-tab-pane>
                <el-tab-pane label="车头时距" v-if="vehicle_list !== []">
                  <div class="car_info" v-for="(v, i) in vehicle_list" :key="i">
                    <span class="data_style"
                      >{{ v.lane_info.lane_name }}({{ v.lane_info.direct }})
                      :</span
                    >
                    {{ !v.lane_calculate ? '' : v.lane_calculate.head_time }} s
                  </div>
                  <p>
                    <span class="data_style">平均车头时距:</span>
                    {{
                      sumInfo.head_time_avg >= 0 ? sumInfo.head_time_avg : ''
                    }}
                    s
                  </p>
                </el-tab-pane>
                <el-tab-pane label="车头间距" v-if="vehicle_list !== []">
                  <div class="car_info" v-for="(v, i) in vehicle_list" :key="i">
                    <span class="data_style"
                      >{{ v.lane_info.lane_name }}({{ v.lane_info.direct }})
                      :</span
                    >
                    {{ !v.lane_calculate ? '' : v.lane_calculate.head_space }} m
                  </div>
                  <p>
                    <span class="data_style">平均车头间距:</span>
                    {{
                      sumInfo.head_space_avg >= 0 ? sumInfo.head_space_avg : ''
                    }}
                    m
                  </p>
                </el-tab-pane>
                <el-tab-pane label="平均速度" v-if="vehicle_list !== []">
                  <div class="car_info" v-for="(v, i) in vehicle_list" :key="i">
                    <span class="data_style"
                      >{{ v.lane_info.lane_name }}({{ v.lane_info.direct }})
                      :</span
                    >
                    {{ !v.lane_calculate ? '' : v.lane_calculate.speed_avg }}
                    km/h
                  </div>
                  <p>
                    <span class="data_style">总车道平均速度:</span>
                    {{
                      !sumInfo.speed_avg_sum
                        ? ''
                        : sumInfo.speed_avg_sum + 'km/h'
                    }}
                  </p>
                </el-tab-pane>
                <el-tab-pane label="排队长度" v-if="vehicle_list !== []">
                  <div class="car_info" v-for="(v, i) in vehicle_list" :key="i">
                    <span class="data_style"
                      >{{ v.lane_info.lane_name }}({{ v.lane_info.direct }})
                      :</span
                    >
                    {{
                      !v.lane_calculate ? '' : v.lane_calculate.queeze_length
                    }}
                    辆
                  </div>
                  <p>
                    <span class="data_style">道路总体通行长度:</span>
                    {{
                      sumInfo.queeze_length_avg >= 0
                        ? sumInfo.queeze_length_avg
                        : ''
                    }}
                    辆
                  </p>
                </el-tab-pane>
                <el-tab-pane label="空间占有率" v-if="vehicle_list !== []">
                  <div class="car_info" v-for="(v, i) in vehicle_list" :key="i">
                    <span class="data_style"
                      >{{ v.lane_info.lane_name }}({{ v.lane_info.direct }})
                      :</span
                    >
                    {{ !v.lane_calculate ? '' : v.lane_calculate.space_rate }} %
                  </div>
                  <p>
                    <span class="data_style">总空间占有率:</span>
                    {{
                      sumInfo.space_rate_avg >= 0 ? sumInfo.space_rate_avg : ''
                    }}
                    %
                  </p>
                </el-tab-pane>
                <el-tab-pane label="时间占有率" v-if="vehicle_list !== []">
                  <div class="car_info" v-for="(v, i) in vehicle_list" :key="i">
                    <span class="data_style"
                      >{{ v.lane_info.lane_name }}({{ v.lane_info.direct }})
                      :</span
                    >
                    {{ !v.lane_calculate ? '' : v.lane_calculate.time_rate }} %
                  </div>
                  <p>
                    <span class="data_style">总时间占有率:</span>
                    {{
                      sumInfo.time_rate_avg >= 0 ? sumInfo.time_rate_avg : ''
                    }}
                    %
                  </p>
                </el-tab-pane>
              </el-tabs>
            </div>
            <!-- </el-card>
          <el-card  shadow="always" class="equip-right"> -->
            <div v-if="direct > 4" class="real-time carwalks">
              <el-tabs type="border-card">
                <el-tab-pane label="人数" v-if="person_list !== []">
                  <div class="car_info" v-for="(v, i) in person_list" :key="i">
                    <span class="data_style">区域总人数 :</span>
                    {{
                      !v.walk_calculate ? '' : v.walk_calculate.person_exist
                    }}人
                  </div>
                  <div class="car_info" v-if="person_list.length === 0">
                    <span class="data_style">区域总人数 :</span>
                    0人
                  </div>
                </el-tab-pane>
                <el-tab-pane label="人流量" v-if="person_list !== []">
                  <div class="car_info" v-for="(v, i) in person_list" :key="i">
                    <span class="data_style">路口人流量 :</span>
                    {{
                      !v.walk_calculate ? '' : v.walk_calculate.person_volume
                    }}人/分
                  </div>
                  <div class="car_info" v-if="person_list.length === 0">
                    <span class="data_style">路口人流量 :</span>
                    0人/分
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="修改控制类型"
      :visible.sync="centerDialogVisible"
      :close-on-click-modal="false"
      width="550px"
      center
    >
      <el-row type="flex" class="row-bg">
        <el-col :span="24">
          <el-form
            label-width="90px"
            :model="formdata"
            :rules="rules"
            ref="formData"
            class="controlInfo"
          >
            <el-form-item label="控制模式:">
              <span>{{
                formdata.control_model === 1
                  ? '自主控制'
                  : formdata.control_model === 2
                  ? '中心控制'
                  : ''
              }}</span>
            </el-form-item>
            <el-form-item label="控制类型:">
              <el-radio-group
                v-if="formdata.control_model === 1"
                v-model="formdata.control_type"
                @change="changeSelect"
              >
                <el-radio label="1">
                  <div class="round">
                    <i></i>
                    <span>策略控制</span>
                  </div>
                </el-radio>
                <!-- <el-radio label="2" disabled>
                  <div class="round">
                    <i></i>
                    <span>时间表控制</span>
                  </div>
                </el-radio>-->
                <el-radio label="3">
                  <div class="round">
                    <i></i>
                    <span>固定时间控制</span>
                  </div>
                </el-radio>
              </el-radio-group>
              <span v-else>绿波协调控制</span>
            </el-form-item>
            <el-form-item label="控制方案:" style="height:32px" prop="plan_id">
              <el-select v-model="formdata.plan_id" placeholder="请选择方案">
                <el-option
                  v-for="(item, i) in selectList"
                  :key="i"
                  :label="
                    item.plan_name !== undefined
                      ? item.plan_name
                      : item.tactics_name
                  "
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm('formData')">确 定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isSocket: false,
      countDown: 0, // 倒计时 时间
      timeNum: 0, // 方案总时长
      pastTime: 0,
      part_num: 1, // 阶段数
      timeColor: 'red', // 倒计时颜色
      timeBarPoupWidth: 0, // 遮罩层宽度
      timeList: [],
      phaseList: [],
      phaseTraffic: [],
      phaseArr: [],
      crossInfo: {
        cross_name: '',
        equipment_type: '',
        latitude: '',
        longitude: '',
        control_type: '',
        plan_info: {
          plan_name: '',
          id: ''
        },
        tacplan_info: {
          plan_name: '',
          id: ''
        }
      },
      start: '开始运行',
      centerDialogVisible: false,
      formdata: {
        control_model: '',
        control_type: '',
        plan_id: ''
      },
      rules: {
        plan_id: [{ required: true, message: '请选择方案', trigger: 'change' }]
      },
      selectList: [],
      phase_info: [],
      socketData: {
        camera_status: 1,
        equip_status: 1,
        light_status: 1,
        control_status: 11,
        map_info: {
          part_info: {},
          phase_info: []
        },
        roll_part_info: []
      },
      isShowMask: 'none',
      setTimeout1: '',
      playerOptions: {
        height: '200',
        sources: [
          {
            type: 'rtmp/mp4',
            src: 'rtmp://192.168.245.37:1935/mylive/test2'
          }
        ],
        aspectRatio: '16:9',
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        techOrder: ['flash'],
        autoplay: true,
        flash: {
          // hls: { withCredentials: false },
          swf: 'static/video-js.swf' // 引入静态文件swf
        },
        controls: false
      },
      lightStatus: {
        status: ''
      },
      direct: 4,
      vehicle_list: [],
      person_list: [],
      speedSum: '',
      sumInfo: {
        car_type_sum: {
          big: 0,
          small: 0
        },
        flow_avg_sum: 0,
        head_space_avg: 0,
        head_time_avg: 0,
        queeze_length_avg: 0,
        space_rate_avg: 0,
        speed_avg_sum: 0,
        time_rate_avg: 0
      },
      copyPlanId: '',
      // 设备详情
      deviceDetails: {
        plan_id: 0, // 方案编号
        Total_time: 0, // 周期总时长
        Total_number: 0, // 总阶段数
        part_num: 0, // 当前阶段
        Phase_time: 0, // 阶段总时长
        run_time: 0, // 阶段运行时长
        assist_time: 0 // 协调时间
      },
      // 设备详情
      videoDetails: {
        eastEntrance: '',
        eastEntranceIcon: '',
        westEntrance: '',
        westEntranceIcon: '',
        northEntrance: '',
        northEntranceIcon: '',
        southEntrance: '',
        southEntranceIcon: ''
      },
      // 东西南北摄像头
      camera: {
        eastCamera: require('../assets/images/Camera/eastUnrelatedCamera.png'),
        westCamera: require('../assets/images/Camera/westUnrelatedCamera.png'),
        southCamera: require('../assets/images/Camera/southUnrelatedCamera.png'),
        northCamera: require('../assets/images/Camera/northUnrelatedCamera.png')
      }
      // ,
      // consolesControlModel: 1
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', false)
  },
  created () {
    this.init()
    this.getControlInfo()
  },
  mounted () {},
  sockets: {
    connect () {},
    server_response (res) {
      try {
        if (res.data) {
          this.isSocket = true
          let data = res.data.datas
          if (data.road_info && data.road_info.control_model) {
            this.crossInfo.control_model = data.road_info.control_model
          }
          if (data.road_info && data.road_info.control_type) {
            this.crossInfo.control_type = data.road_info.control_type
          }
          if (data.map_info) {
            this.socketData.map_info = data.map_info
          }
          if (data.roll_part_info) {
            this.socketData.roll_part_info = data.roll_part_info
          }
          this.socketData.control_status = data.control_status
          this.socketData.camera_status = data.camera_status
          this.phase_info = data.map_info.phase_info
          this.timeNum = 0
          if (this.socketData.roll_part_info.length !== 0) {
            this.crossInfo.plan_info.plan_name = this.socketData.roll_part_info[0].plan_name
          }
          if (this.socketData.roll_part_info.length > 0) {
            this.socketData.roll_part_info.map((v) => {
              this.timeNum =
                this.timeNum -
                0 +
                (v.part_info.green_time - 0) +
                (v.part_info.yellow_time - 0) +
                (v.part_info.red_time - 0)
            })
          }
          // 设备详情
          if (data.map_info && data.map_info.part_info) {
            this.deviceDetails = data.map_info.part_info
            this.deviceDetails.control_model = data.road_info.control_model
          }
          if (data.camera_status) {
            // alert(5555)
            let status = function (statusParam) {
              return statusParam === 1
                ? '正常'
                : statusParam === 3
                  ? '故障'
                  : '未关联'
            }
            let statusIcon = function (statusIconParam) {
              return statusIconParam === 1
                ? 'el-icon-success green'
                : statusIconParam === 3
                  ? 'el-icon-error dang'
                  : 'el-icon-warning warn'
            }
            let cameraPath = function (statusIconParam, directType) {
              let cameraPath
              switch (directType) {
                case 1:
                  cameraPath =
                    statusIconParam === 1
                      ? require('../assets/images/Camera/eastCamera.png')
                      : statusIconParam === 4
                        ? require('../assets/images/Camera/eastUnrelatedCamera.png')
                        : require('../assets/images/Camera/eastFaultCamera.png')
                  /* eslint-disable */
                  break
                case 2:
                  cameraPath =
                    statusIconParam === 1
                      ? require('../assets/images/Camera/westCamera.png')
                      : statusIconParam === 4
                      ? require('../assets/images/Camera/westUnrelatedCamera.png')
                      : require('../assets/images/Camera/westFaultCamera.png')
                  /* eslint-disable */
                  break
                case 3:
                  cameraPath =
                    statusIconParam === 1
                      ? require('../assets/images/Camera/southCamera.png')
                      : statusIconParam === 4
                      ? require('../assets/images/Camera/southUnrelatedCamera.png')
                      : require('../assets/images/Camera/southFaultCamera.png')
                  /* eslint-disable */
                  break
                case 4:
                  cameraPath =
                    statusIconParam === 1
                      ? require('../assets/images/Camera/northCamera.png')
                      : statusIconParam === 4
                      ? require('../assets/images/Camera/northUnrelatedCamera.png')
                      : require('../assets/images/Camera/northFaultCamera.png')
                  /* eslint-disable */
                  break
                default:
                  break
              }
              return cameraPath
            }
            data.camera_status.map((v) => {
              if (v.direct_type === 1) {
                // alert(v.status)
                this.videoDetails.eastEntrance = status(v.status)
                // alert(this.videoDetails.eastEntrance)
                this.videoDetails.eastEntranceIcon = statusIcon(v.status)
                // alert(this.videoDetails.eastEntranceIcon)
                let tempVStatus = cameraPath(v.status, v.direct_type)
                this.camera.eastCamera = tempVStatus
              } else if (v.direct_type === 2) {
                this.videoDetails.westEntrance = status(v.status)
                this.videoDetails.westEntranceIcon = statusIcon(v.status)
                this.camera.westCamera = cameraPath(v.status, v.direct_type)
              } else if (v.direct_type === 3) {
                this.videoDetails.southEntrance = status(v.status)
                this.videoDetails.southEntranceIcon = statusIcon(v.status)
                this.camera.southCamera = cameraPath(v.status, v.direct_type)
              } else if (v.direct_type === 4) {
                this.videoDetails.northEntrance = status(v.status)
                this.videoDetails.northEntranceIcon = statusIcon(v.status)
                this.camera.northCamera = cameraPath(v.status, v.direct_type)
              }
            })
          }
          // 进度条
          if (data.equip_status === '11') {
            let greenTime = data.map_info.part_info.green_time
            let yellowTime = data.map_info.part_info.yellow_time
            let redTime = data.map_info.part_info.red_time
            this.countDown =
              greenTime > 0 || yellowTime > 0 || redTime > 0
                ? greenTime === null
                  ? yellowTime === null
                    ? redTime - 0
                    : yellowTime - 0
                  : greenTime - 0
                : ''
            this.timeColor =
              greenTime > 0 ? 'green' : yellowTime > 0 ? 'yellow' : 'red'
            this.socketProgress()
            this.start = '停止运行'
            this.isShowMask = 'none'
          } else {
            this.start = '开始运行'
            this.timeColor = 'red'
            this.countDown = 0
            this.timeBarPoupWidth = 0
          }
          this.changePhase()
        }
      } catch (error) {}
    },
    // 路口数据
    camera_response(res) {
      try {
        let data = JSON.parse(res.data)
        let that = this
        this.vehicle_list = []
        this.sumInfo = []
        if (data.length < 1 || !data) return
        data.map((v) => {
          if (v.direct_type === that.direct) {
            if (v.direct_list.length < 1) return
            that.vehicle_list = v.direct_list
            that.sumInfo = v.sum_info
            if (that.sumInfo) {
              that.sumInfo.flow_avg_sum = v.sum_info.flow_avg_sum.toFixed(0)
              that.sumInfo.head_space_avg = v.sum_info.head_space_avg.toFixed(2)
              that.sumInfo.head_time_avg = v.sum_info.head_time_avg.toFixed(2)
              that.sumInfo.queeze_length_avg = v.sum_info.queeze_length_avg.toFixed(
                0,
              )
              that.sumInfo.space_rate_avg = v.sum_info.space_rate_avg.toFixed(2)
              that.sumInfo.speed_avg_sum = v.sum_info.speed_avg_sum.toFixed(2)
              that.sumInfo.time_rate_avg = v.sum_info.time_rate_avg.toFixed(2)
              that.sumInfo.car_type_sum.big = v.sum_info.car_type_sum.big.toFixed(
                0,
              )
              that.sumInfo.car_type_sum.small = v.sum_info.car_type_sum.small.toFixed(
                0,
              )
            }

            v.direct_list.map((v) => {
              v.lane_calculate.head_time = v.lane_calculate.head_time.toFixed(2)
              v.lane_calculate.speed_avg = v.lane_calculate.speed_avg.toFixed(2)
              v.lane_calculate.head_space = v.lane_calculate.head_space.toFixed(
                2,
              )
              v.lane_calculate.space_rate = v.lane_calculate.space_rate.toFixed(
                2,
              )
              v.lane_calculate.time_rate = v.lane_calculate.time_rate.toFixed(2)
            })
          }
        })
        this.vehicle_list.map((v) => {
          if (v.lane_info.direct === 0) {
            v.lane_info.direct = '未设置'
          } else if (v.lane_info.direct === 1) {
            v.lane_info.direct = '左转'
          } else if (v.lane_info.direct === 3) {
            v.lane_info.direct = '直行'
          } else if (v.lane_info.direct === 2) {
            v.lane_info.direct = '右转'
          }
        })
      } catch (error) {}
    },
    // 人行数据
    walk_camera_response(res) {
      try {
        let data = JSON.parse(res.data)
        let that = this
        that.person_list = []
        if (!data || data.length < 1) return
        data.map((v) => {
          if (v.direct_type === that.direct) {
            that.person_list = v.direct_list
            if (v.direct_list.length < 1) return
            v.direct_list.map((v) => {
              v.walk_calculate.person_exist = v.walk_calculate.person_exist.toFixed(
                0,
              )
              v.walk_calculate.person_volume = v.walk_calculate.person_volume.toFixed(
                0,
              )
            })
          } else {
            that.person_list = []
          }
        })
      } catch (error) {}
    },
    change_plan_response(res) {
      this.$message.error(res.data)
    },
  },

  methods: {
    async init() {
      let phaseRes = await this.$http.get('phaselist/')
      const { phase_list: phaseList } = phaseRes.data
      this.phaseTraffic = phaseList
      this.countDown = 0
      this.timeColor = 'red'
      this.timeBarPoupWidth = 0
      try {
        let res = await this.getVideoAdress(this.direct)
        this.playerOptions.sources[0].src = res.data.url
      } catch (error) {}
    },
    async getVideoAdress(direct) {
      let res = await this.$http.get(`video/${direct}/`)
      return res
    },
    // 获取中控台基础信息
    async getControlInfo() {
      let crossRes = await this.$http.get('crossroadinfo/')
      this.formdata.control_type =
        crossRes.data.road_extension_info.control_type + ''
      this.formdata.control_model =
        crossRes.data.road_extension_info.control_model
      await this.changeSelect(this.formdata.control_type)
      if (crossRes.data.road_base_info.equipment_type === 1) {
        crossRes.data.road_base_info.equipment_type = 'XHJ-CW-GA-FW1901'
      }

      // if (crossRes.data.road_base_info.control_type === 1) {
      //   crossRes.data.road_base_info.control_type = '策略控制'
      // } else if (crossRes.data.road_base_info.control_type === 2) {
      //   crossRes.data.road_base_info.control_type = '时间表控制'
      // } else if (crossRes.data.road_base_info.control_type === 3) {
      //   crossRes.data.road_base_info.control_type = '固定时间控制'
      // }
      this.crossInfo.control_model =
        crossRes.data.road_extension_info.control_model
      this.crossInfo.cross_name = crossRes.data.road_base_info.cross_name
      this.crossInfo.equipment_type =
        crossRes.data.road_base_info.equipment_type
      this.crossInfo.latitude = crossRes.data.road_base_info.latitude
      this.crossInfo.longitude = crossRes.data.road_base_info.longitude
      this.crossInfo.control_type =
        crossRes.data.road_extension_info.control_type
      this.crossInfo.plan_info.plan_name = crossRes.data.plan_info.plan_name
      this.crossInfo.plan_info.id = crossRes.data.plan_info.id
      this.crossInfo.tacplan_info.id = crossRes.data.tacplan_info.id
      this.crossInfo.tacplan_info.plan_name =
        crossRes.data.tacplan_info.plan_name
    },
    // 确认修改方案
    confirm(formName) {
      let isTrue = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          isTrue = false
        } else {
          isTrue = true
          return false
        }
      })
      // alert(this.formdata.control_type)
      if (isTrue) return
      if (
        this.copyPlanId === this.formdata.plan_id &&
        this.copyControlType === this.formdata.control_type
      ) {
        return this.$message.warning('方案未修改!')
      }
      this.$confirm('切换方案将在此方案结束后执行, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
      })
        .then(() => {
          this.$http.put('editcontrol/', this.formdata).then((res) => {
            if (res.code === 200) {
              this.setSuccess()
              this.getControlInfo()
            }
          })
          this.centerDialogVisible = false
        })
        .catch(() => {})
    },
    // 修改控制类型弹窗初始化
    async changeType(num, row) {
      if (num === 1)
        return this.$message.error('当前正在执行绿波方案,控制方案无法切换')
      this.centerDialogVisible = true
      await this.getControlInfo()
      // crossInfo.plan_info.id

      this.formdata.control_model = this.crossInfo.control_model
      if (this.crossInfo.control_model != 1) {
        // alert(this.crossInfo.control_model)
        this.formdata.control_type = 4 + ''
      }
      // 暂存方案状态 做判断是否修改
      this.copyControlType = this.crossInfo.control_type + ''
      if (this.crossInfo.tacplan_info.id) {
        this.copyPlanId = this.crossInfo.tacplan_info.id
      } else {
        this.copyPlanId = this.crossInfo.plan_info.id
      }
      // this.formdata.plan_id = this.crossInfo.plan_info.id
      // this.$forceUpdate()
    },
    // 获取策略控制列表
    async getPolicyPlan() {
      let res = await this.$http.get('tacticsplanlist/')
      this.selectList = res.data.tacticsplan_list
      this.formdata.plan_id = this.crossInfo.tacplan_info.id
      // this.formdata.plan_id = this.selectList[0].id;
      if (this.selectList.length === 1) {
        this.formdata.plan_id = this.selectList[0].id
      }
    },
    async getTimePlan() {
      this.selectList = ''
    },
    // 获取固定时间控制列表
    async getFixedPlan() {
      let res = await this.$http.get('fixedplanlist/')
      if (res.data.fixedplan_list.length > 0) {
        this.selectList = res.data.fixedplan_list
        this.selectList = this.selectList.filter((v) => {
          return v.part_count > 0
        })
        this.formdata.plan_id = this.crossInfo.plan_info.id
      }
      // this.formdata.plan_id = this.selectList[0].id;
      if (this.selectList.length === 1) {
        this.formdata.plan_id = this.selectList[0].id
      }
    },
    // 获取dom数组
    getPhaseDom() {
      let phaseDomList = document.querySelectorAll('.phase_img')
      let footWayList = document.querySelectorAll('.foot_way_img')
      let phaseDomArr = []
      // 傅老师优化的方法
      Array.prototype.forEach.call(phaseDomList, (v) => {
        let temp = []
        Array.prototype.forEach.call(v.children, (vs) => {
          temp.unshift(vs)
        })
        phaseDomArr = phaseDomArr.concat(temp)
      })
      Array.prototype.forEach.call(footWayList, (v) => {
        phaseDomArr.push(v)
      })
      // 自己的问题代码
      // Object.values(phaseDomList).map(v => {
      //   Object.values(v.children).reverse().map(v => {
      //     phaseDomArr.push(v)
      //   })
      // })
      // Object.values(footWayList).map(v => {
      //   phaseDomArr.push(v)
      // })
      return phaseDomArr
    },
    // 改变相位图标
    changePhase() {
      this.phaseArr = []
      this.phaseList = this.phase_info
      this.phaseList.map((v) => {
        this.phaseArr.push(v.status)
      })
      let phaseArrDom = this.getPhaseDom()
      for (let i = 0; i < this.phaseArr.length; i++) {
        if (this.phaseArr[i] === 3) {
          phaseArrDom[i].children[0].classList.add('active')
          phaseArrDom[i].children[1].classList.remove('active')
          phaseArrDom[i].children[2].classList.remove('active')
          phaseArrDom[i].children[3].classList.remove('active')
        } else if (this.phaseArr[i] === 2) {
          phaseArrDom[i].children[1].classList.add('active')
          phaseArrDom[i].children[0].classList.remove('active')
          phaseArrDom[i].children[2].classList.remove('active')
          phaseArrDom[i].children[3].classList.remove('active')
        } else if (this.phaseArr[i] === 1) {
          phaseArrDom[i].children[2].classList.add('active')
          phaseArrDom[i].children[1].classList.remove('active')
          phaseArrDom[i].children[0].classList.remove('active')
          phaseArrDom[i].children[3].classList.remove('active')
        } else if (this.phaseArr[i] === 4) {
          phaseArrDom[i].children[3].classList.add('active')
          phaseArrDom[i].children[1].classList.remove('active')
          phaseArrDom[i].children[0].classList.remove('active')
          phaseArrDom[i].children[2].classList.remove('active')
        }
      }
    },
    // 停止
    stop() {
      // if (this.socketData.control_status !== '00') {
      //   return this.$message.error('信号机故障')
      // }
      if (this.lightStatus.status === 4) return
      this.$confirm('是否停止运行', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
      })
        .then(() => {
          this.lightStatus.status = 4
          this.$http.post('emergencycontrol/', this.lightStatus).then((res) => {
            if (res.code !== 200) return
            this.$message({
              type: 'success',
              message: '指令已下发!',
            })
            this.start = '开始运行'
          })
        })
        .catch(() => {})
    },
    // 开始
    started() {
      // if (this.socketData.control_status !== '00') {
      //   return this.$message.error('信号机故障')
      // }
      if (this.lightStatus.status === 3) return
      this.$confirm('是否开始运行', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
      })
        .then(() => {
          this.lightStatus.status = 3
          this.$http.post('emergencycontrol/', this.lightStatus).then((res) => {
            if (res.code !== 200) return
            this.$message({
              type: 'success',
              message: '指令已下发!',
            })
            this.start = '停止运行'
          })
        })
        .catch(() => {})
    },
    // 全红
    beginRed() {
      // if (this.socketData.control_status !== '00') {
      //   return this.$message.error('信号机故障')
      // }
      if (this.lightStatus.status === 1) return
      this.$confirm('是否全部红灯', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
      })
        .then(() => {
          this.lightStatus.status = 1
          this.$http.post('emergencycontrol/', this.lightStatus).then((res) => {
            if (res.code !== 200) return
            this.$message({
              type: 'success',
              message: '指令已下发',
            })
            this.start = '开始运行'
          })
        })
        .catch(() => {})
    },
    // 黄闪
    beginYellow() {
      // if (this.socketData.control_status !== '00') {
      //   return this.$message.error('信号机故障')
      // }
      if (this.lightStatus.status === 2) return
      this.$confirm('是否开始黄闪', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
      })
        .then(() => {
          this.lightStatus.status = 2
          this.$http.post('emergencycontrol/', this.lightStatus).then((res) => {
            if (res.code !== 200) return
            this.$message({
              type: 'success',
              message: '指令已下发',
            })
            this.start = '开始运行'
          })
        })
        .catch(() => {})
    },
    // 切换视频
    async changeVideo(tab) {
      this.sumInfo = []
      this.vehicle_list = []
      this.playerOptions.sources[0].src = 'rtmp://192.168.245.37:1935/mylive/'
      if (tab.index === '0') {
        this.direct = 4
      } else if (tab.index === '1') {
        this.direct = 2
      } else if (tab.index === '2') {
        this.direct = 3
      } else if (tab.index === '3') {
        this.direct = 1
      } else if (tab.index === '4') {
        this.direct = 8
        // this.playerOptions.sources[0].src =
        //   'rtmp://192.168.245.37:1935/mylive/test1'
      } else if (tab.index === '5') {
        this.direct = 6
      } else if (tab.index === '6') {
        this.direct = 7
      } else if (tab.index === '7') {
        this.direct = 5
      }
      try {
        let res = await this.getVideoAdress(this.direct)
        this.playerOptions.sources[0].src = res.data.url
      } catch (err) {}
    },
    // 修改控制类型
    changeSelect(val) {
      if (val === '1') {
        this.getPolicyPlan()
      } else if (val === '2') {
        this.getTimePlan()
      } else if (val === '3') {
        this.getFixedPlan()
        this.formdata.plan_id = ''
      } else if (val === '4') {
        this.getPolicyPlan()
      }
    },
    // 实时更改进度条
    socketProgress() {
      // this.timeNum = 0
      this.pastTime = 0
      this.timeList = []
      let yellowTime = this.socketData.map_info.part_info.yellow_time // 黄灯倒计时
      let redTime = this.socketData.map_info.part_info.red_time // 红灯倒计时
      let greenTime = this.socketData.map_info.part_info.green_time // 绿灯倒计时
      this.socketData.roll_part_info.map((v) => {
        this.timeList.push(
          { time: v.part_info.green_time, color: '#00D142' },
          { time: v.part_info.yellow_time, color: '#F8E71C' },
          { time: v.part_info.red_time, color: 'red' },
        )
      })
      let lightPart = yellowTime === null ? (redTime === null ? 1 : 3) : 2
      this.part_num =
        this.socketData.map_info.part_info.part_num > 0
          ? (this.socketData.map_info.part_info.part_num - 1) * 3 + lightPart
          : lightPart
      try {
        while (this.part_num-- > 0) {
          if (this.part_num >= 1) {
            this.pastTime =
              this.pastTime + this.timeList[this.part_num - 1].time
          }
        }
        this.part_num =
          (this.socketData.map_info.part_info.part_num - 1) * 3 + lightPart
        this.pastTime =
          this.pastTime +
          this.timeList[this.part_num - 1].time -
          greenTime -
          yellowTime -
          redTime
        if ((this.pastTime * 100) / this.timeNum >= 100) {
          this.pastTime = 0
        }
        this.timeBarPoupWidth = (this.pastTime * 100) / this.timeNum
      } catch (error) {}
    },
    setSuccess() {
      this.$message({
        type: 'success',
        message: '指令已下发',
      })
    },
    setError() {
      this.$message({
        type: 'error',
        message: '操作失败',
      })
    },
  },
  beforeDestroy() {
    clearTimeout(this.setTimeout1)
    this.setTimeout1 = null
  },
}
</script>

<style scoped lang="stylus">
@import '../assets/css/consoles.styl'
@import '../assets/css/consolesIndex.styl'
</style>
<style lang="stylus">
.main-layout
  .real-time
    .el-tabs__nav
      white-space: initial;
  .el-tabs__active-bar
    background-color: white;
  .el-tabs--border-card>.el-tabs__header .el-tabs__item
    margin-left: -1px;
    border: 1px solid #dcdfe6;
    border-left: 0px none;
  .el-tabs__nav-scroll
    overflow: hidden;
    margin-bottom: -10px;
    background white
  .el-tabs__nav-wrap::after
    background-color: white;
  .console-video
    .el-tabs__nav
      width 100% !important
      &>div:nth-child(2),&>div:nth-child(6)
        width 34% !important
        text-align center
      &>div
        width 22% !important
        text-align center
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active
    color: #409EFF;
    background-color: white;
  .el-tabs--border-card>.el-tabs__header .el-tabs__item
    color: rgba(102,102,102,1);
    border: 1px solid #dcdfe6;
    background: #E5E5E5;
    margin-top 1px
  .el-tabs--border-card>.el-tabs__header
    width: 90%;
    margin: 0 auto;
  .el-tabs--border-card
    border: 0 none
  .carwalks .el-tab-pane p
    padding: 0
</style>

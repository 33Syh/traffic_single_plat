<template>
  <div class="fixededit">
    <div class="tit">
      <em style="display:inline_block;float:left" class="table-title">
        {{this.index==="-1"?'添加方案': '编辑方案'}}
      </em>
      <span style="float:right">
        <el-button
          @click="returnFixed"
          >返回</el-button
        >
      </span>
    </div>
    <div class="container">
      <el-col :span="24">
        <el-card shadow="always">
          <div class="t16">
            <el-form :model="render_data" ref="plan_data" label-width="0">
              <span class="f_bold">方案编号</span>
              <i style="font-style:normal;margin:0 -20px 0 20px;">方案</i>
              <el-form-item
                id="dis_line"
                style="display:inline_block"
                label=""
                :rules="[
                  { required: true, message: '请输入方案编号', trigger: 'blur' }
                ]"
                prop="plan_num"
              >
                <el-input
                  type="text"
                  placeholder="请输入方案编号"
                  maxlength="2"
                  v-model="render_data.plan_num"
                ></el-input>
              </el-form-item>
              <span class="f_bold" style="margin-left:47px">方案名称</span>
              <el-form-item
                style="display:inline_block"
                id="dis_line"
                label=""
                :rules="[
                  { required: true, message: '请输入方案名称', trigger: 'blur' }
                ]"
                prop="plan_name"
              >
                <el-input
                  placeholder="请输入方案名称"
                  v-model="render_data.plan_name"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="t16">
            <span class="f_bold">阶段设置</span>
          </div>
          <div class="t16">
            <span class="f_bold" style="vertical-align: middle;"
              >阶段选择&nbsp;&nbsp;&nbsp;</span
            >
            <span class="f_bold"
              >阶段总数:&nbsp;&nbsp;{{ render_data.parts_info?render_data.parts_info.length:0 }}</span
            >
            <span>
              <el-button
                size="medium"
                style="float:right;right:40px"
                type="primary"
                @click="addphase()"
                >新增阶段</el-button
              >
            </span>
          </div>
          <div class="car_img" id="car_img" ref="subInfo">
            <div class="nonemsg" v-show="!render_data.parts_info||render_data.parts_info.length===0">
              请 设 置 阶 段 信 息
            </div>
            <happy-scroll
             hide-vertical
              :scroll-left="scroll_left"
              smaller-move-h="end"
              bigger-move-h="end"
              color="#878787"
              size="9"
              resize
              style="height:245px"
            >
            <div id="roll_phase_img">
              <div
                v-for="(item, i) in render_data.parts_info"
                :key="i"
                id="part_img"
                class="color_focus"
                @click="selectStage(i)"
              >
                <div
                  id="content"
                  :class="render_index === i ?'color_focus':'every_img'"
                >
                  <span
                    style="display:inline-block;margin-left:20px;height:30px;line_height:30px"
                    >阶段{{ i + 1 }}</span
                  >
                  <span @click.stop="delPase(i, item)">
                    <i class="el-icon-close "></i>
                  </span>
                </div>
                <div class="img" :id="i" v-if="item.phase_index">
                  <div class="part_n">
                    <div class="map_phase_img">
                      <span class="phase_img_r">
                        <img
                          :style="
                            item.phase_index.indexOf(2) != -1 &&
                            render_index != -1
                              ? ''
                              : { display: 'none' }
                          "
                          class="change_img"
                          src="../../assets/images/svg/consoles/part/part_right.svg"
                          alt
                        />
                      </span>
                      <span class="phase_img_c">
                        <img
                          :style="
                            item.phase_index.indexOf(1) != -1 &&
                            render_index != -1
                              ? ''
                              : { display: 'none' }
                          "
                          class="change_img"
                          src="../../assets/images/svg/consoles/part/part_straight.svg"
                          alt
                        />
                      </span>
                      <span class="phase_img_l">
                        <img
                          :style="
                            item.phase_index.indexOf(0) != -1 &&
                            render_index != -1
                              ? ''
                              : { display: 'none' }
                          "
                          class="change_img"
                          src="../../assets/images/svg/consoles/part/part_left.svg"
                          alt
                        />
                      </span>
                    </div>
                    <div class="foot_way">
                      <span class="phase_img_l">
                        <img
                          :style="
                            item.phase_index.indexOf(12) != -1 &&
                            render_index != -1
                              ? ''
                              : { display: 'none' }
                          "
                          class="change_img"
                          src="../../assets/images/svg/consoles/part/part_footway.svg"
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
                            item.phase_index.indexOf(5) != -1 &&
                            render_index != -1
                              ? ''
                              : { display: 'none' }
                          "
                          class="change_img"
                          src="../../assets/images/svg/consoles/part/part_right.svg"
                          alt
                        />
                      </span>
                      <span class="phase_img_c">
                        <img
                          :style="
                            item.phase_index.indexOf(4) != -1 &&
                            render_index != -1
                              ? ''
                              : { display: 'none' }
                          "
                          class="change_img"
                          src="../../assets/images/svg/consoles/part/part_straight.svg"
                          alt
                        />
                      </span>
                      <span class="phase_img_l">
                        <img
                          :style="
                            item.phase_index.indexOf(3) != -1 &&
                            render_index != -1
                              ? ''
                              : { display: 'none' }
                          "
                          class="change_img"
                          src="../../assets/images/svg/consoles/part/part_left.svg"
                          alt
                        />
                      </span>
                    </div>
                    <div class="foot_way">
                      <span class="phase_img_l">
                        <img
                          :style="
                            item.phase_index.indexOf(13) != -1 &&
                            render_index != -1
                              ? ''
                              : { display: 'none' }
                          "
                          class="change_img"
                          src="../../assets/images/svg/consoles/part/part_footway.svg"
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
                            item.phase_index.indexOf(8) != -1 &&
                            render_index != -1
                              ? ''
                              : { display: 'none' }
                          "
                          class="change_img"
                          src="../../assets/images/svg/consoles/part/part_right.svg"
                          alt
                        />
                      </span>
                      <span class="phase_img_c">
                        <img
                          :style="
                            item.phase_index.indexOf(7) != -1 &&
                            render_index != -1
                              ? ''
                              : { display: 'none' }
                          "
                          class="change_img"
                          src="../../assets/images/svg/consoles/part/part_straight.svg"
                          alt
                        />
                      </span>
                      <span class="phase_img_l">
                        <img
                          :style="
                            item.phase_index.indexOf(6) != -1 &&
                            render_index != -1
                              ? ''
                              : { display: 'none' }
                          "
                          class="change_img"
                          src="../../assets/images/svg/consoles/part/part_left.svg"
                          alt
                        />
                      </span>
                    </div>
                    <div class="foot_way">
                      <span class="phase_img_l">
                        <img
                          :style="
                            item.phase_index.indexOf(14) != -1 &&
                            render_index != -1
                              ? ''
                              : { display: 'none' }
                          "
                          class="change_img"
                          src="../../assets/images/svg/consoles/part/part_footway.svg"
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
                            item.phase_index.indexOf(11) != -1 &&
                            render_index != -1
                              ? ''
                              : { display: 'none' }
                          "
                          class="change_img"
                          src="../../assets/images/svg/consoles/part/part_right.svg"
                          alt
                        />
                      </span>
                      <span class="phase_img_c">
                        <img
                          :style="
                            item.phase_index.indexOf(10) != -1 &&
                            render_index != -1
                              ? ''
                              : { display: 'none' }
                          "
                          class="change_img"
                          src="../../assets/images/svg/consoles/part/part_straight.svg"
                          alt
                        />
                      </span>
                      <span class="phase_img_l">
                        <img
                          :style="
                            item.phase_index.indexOf(9) != -1 &&
                            render_index != -1
                              ? ''
                              : { display: 'none' }
                          "
                          class="change_img"
                          src="../../assets/images/svg/consoles/part/part_left.svg"
                          alt
                        />
                      </span>
                    </div>
                    <div class="foot_way">
                      <span class="phase_img_l">
                        <img
                          :style="
                            item.phase_index.indexOf(15) != -1 &&
                            render_index != -1
                              ? ''
                              : { display: 'none' }
                          "
                          class="change_img"
                          src="../../assets/images/svg/consoles/part/part_footway.svg"
                          alt
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </happy-scroll>
          </div>
          <!-- 时间设置 -->
          <el-row :gutter="20" v-if="render_data">
            <el-col :span="12" v-if="render_data.parts_info">
              <div class="grid-content bg-purple" v-if="render_index>-1">
                <div id="time" v-if="render_data.parts_info[render_index]">
                  <div class="set_time">时间设置</div>
                  <el-row class="plan_content">
                    <el-col :span="24">
                      <div class="grid-content bg-purple">
                        <el-col :span="24">
                          <div class="grid-content bg-purple che_light">
                            阶段绿灯时间 &nbsp;
                            <el-input-number
                              size="medium"
                              v-model="
                                render_data.parts_info[render_index].green_time
                              "
                              :max="199"
                              :min="3"
                              controls-position="right"

                            ></el-input-number
                            >&nbsp;秒
                          </div>
                        </el-col>
                        <el-col :span="24">
                          <div class="grid-content bg-purple che_light">
                            阶段黄灯时间 &nbsp;
                            <el-input-number
                              size="medium"
                              v-model="
                                render_data.parts_info[render_index].yellow_time
                              "
                              controls-position="right"
                              :min="3"
                              :max="199"
                            ></el-input-number
                            >&nbsp;秒
                          </div>
                        </el-col>
                        <el-col :span="24" class="add_border">
                          <div class="grid-content bg-purple che_light">
                            阶段红灯时间 &nbsp;
                            <el-input-number
                              size="medium"
                              v-model="
                                render_data.parts_info[render_index].red_time
                              "
                              controls-position="right"
                              :min="2"
                              :max="199"
                            ></el-input-number
                            >&nbsp;秒
                          </div>
                        </el-col>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
            <el-col :span="8" v-if="render_data.parts_info" style="position: absolute; left:800px; top:40px">
              <div class="grid-content bg-purple" v-if="render_index>-1">
                <div class="grid-content bg-purple-light">
                  <div class="diagram">
                    <div
                      style="text-align: center;  width:370px; display: inline-block;"
                    >
                      <div class="img-style">
                        <div class="div_n">
                          <div class="phase">
                            <span>{{
                              phaseTraffic.length === 0
                                ? ''
                                : phaseTraffic[2].phase_num
                            }}</span>
                            <span>{{
                              phaseTraffic.length === 0
                                ? ''
                                : phaseTraffic[1].phase_num
                            }}</span>
                            <span>{{
                              phaseTraffic.length === 0
                                ? ''
                                : phaseTraffic[0].phase_num
                            }}</span>
                          </div>
                          <div class="phase_img">
                            <span class="phase_img_r">
                              <img
                                class="change_img"
                                src="../../assets/images/svg/cross/right_2.svg"
                                alt=""
                              />
                              <img
                                class="change_img"
                                :class="{
                                  active:
                                    render_data.parts_info[
                                      render_index
                                    ].phase_index.indexOf(2) != -1
                                }"
                                src="../../assets/images/svg/cross/right_1.svg"
                                alt=""
                              />
                            </span>
                            <span class="phase_img_c">
                              <img
                                class="change_img"
                                src="../../assets/images/svg/cross/straight_2.svg"
                                alt=""
                              />
                              <img
                                class="change_img"
                                :class="{
                                  active:
                                    render_data.parts_info[
                                      render_index
                                    ].phase_index.indexOf(1) != -1
                                }"
                                src="../../assets/images/svg/cross/straight_1.svg"
                                alt=""
                              />
                            </span>
                            <span class="phase_img_l">
                              <img
                                class="change_img"
                                src="../../assets/images/svg/cross/left_2.svg"
                                alt=""
                              />
                              <img
                                class="change_img"
                                :class="{
                                  active:
                                    render_data.parts_info[
                                      render_index
                                    ].phase_index.indexOf(0) != -1
                                }"
                                src="../../assets/images/svg/cross/left_1.svg"
                                alt=""
                              />
                            </span>
                          </div>
                          <div class="foot_way">
                            <span>{{
                              phaseTraffic.length === 0
                                ? ''
                                : phaseTraffic[12].phase_num
                            }}</span>
                            <span class="foot_way_img">
                              <img
                                class="change_img"
                                src="../../assets/images/svg/cross/footway_2.svg"
                                alt=""
                              />
                              <img
                                class="change_img"
                                :class="{
                                  active:
                                    render_data.parts_info[
                                      render_index
                                    ].phase_index.indexOf(12) != -1
                                }"
                                src="../../assets/images/svg/cross/footway_1.svg"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>
                        <div class="div_w">
                          <div class="phase">
                            <span>{{
                              phaseTraffic.length === 0
                                ? ''
                                : phaseTraffic[5].phase_num
                            }}</span>
                            <span>{{
                              phaseTraffic.length === 0
                                ? ''
                                : phaseTraffic[4].phase_num
                            }}</span>
                            <span>{{
                              phaseTraffic.length === 0
                                ? ''
                                : phaseTraffic[3].phase_num
                            }}</span>
                          </div>
                          <div class="phase_img">
                            <span class="phase_img_r">
                              <img
                                class="change_img"
                                src="../../assets/images/svg/cross/right_2.svg"
                                alt=""
                              />
                              <img
                                class="change_img"
                                :class="{
                                  active:
                                    render_data.parts_info[
                                      render_index
                                    ].phase_index.indexOf(5) != -1
                                }"
                                src="../../assets/images/svg/cross/right_1.svg"
                                alt=""
                              />
                            </span>
                            <span class="phase_img_c">
                              <img
                                class="change_img"
                                src="../../assets/images/svg/cross/straight_2.svg"
                                alt=""
                              />
                              <img
                                class="change_img"
                                :class="{
                                  active:
                                    render_data.parts_info[
                                      render_index
                                    ].phase_index.indexOf(4) != -1
                                }"
                                src="../../assets/images/svg/cross/straight_1.svg"
                                alt=""
                              />
                            </span>
                            <span class="phase_img_l">
                              <img
                                class="change_img"
                                src="../../assets/images/svg/cross/left_2.svg"
                                alt=""
                              />
                              <img
                                class="change_img"
                                :class="{
                                  active:
                                    render_data.parts_info[
                                      render_index
                                    ].phase_index.indexOf(3) != -1
                                }"
                                src="../../assets/images/svg/cross/left_1.svg"
                                alt=""
                              />
                            </span>
                          </div>
                          <div class="foot_way">
                            <span>{{
                              phaseTraffic.length === 0
                                ? ''
                                : phaseTraffic[13].phase_num
                            }}</span>
                            <span class="foot_way_img">
                              <img
                                class="change_img"
                                src="../../assets/images/svg/cross/footway_2.svg"
                                alt=""
                              />
                              <img
                                class="change_img"
                                :class="{
                                  active:
                                    render_data.parts_info[
                                      render_index
                                    ].phase_index.indexOf(13) != -1
                                }"
                                src="../../assets/images/svg/cross/footway_1.svg"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>
                        <div class="div_s">
                          <div class="phase">
                            <span>{{
                              phaseTraffic.length === 0
                                ? ''
                                : phaseTraffic[8].phase_num
                            }}</span>
                            <span>{{
                              phaseTraffic.length === 0
                                ? ''
                                : phaseTraffic[7].phase_num
                            }}</span>
                            <span>{{
                              phaseTraffic.length === 0
                                ? ''
                                : phaseTraffic[6].phase_num
                            }}</span>
                          </div>
                          <div class="phase_img">
                            <span class="phase_img_r">
                              <img
                                class="change_img"
                                src="../../assets/images/svg/cross/right_2.svg"
                                alt=""
                              />
                              <img
                                class="change_img"
                                :class="{
                                  active:
                                    render_data.parts_info[
                                      render_index
                                    ].phase_index.indexOf(8) != -1
                                }"
                                src="../../assets/images/svg/cross/right_1.svg"
                                alt=""
                              />
                            </span>
                            <span class="phase_img_c">
                              <img
                                class="change_img"
                                src="../../assets/images/svg/cross/straight_2.svg"
                                alt=""
                              />
                              <img
                                class="change_img"
                                :class="{
                                  active:
                                    render_data.parts_info[
                                      render_index
                                    ].phase_index.indexOf(7) != -1
                                }"
                                src="../../assets/images/svg/cross/straight_1.svg"
                                alt=""
                              />
                            </span>
                            <span class="phase_img_l">
                              <img
                                class="change_img"
                                src="../../assets/images/svg/cross/left_2.svg"
                                alt=""
                              />
                              <img
                                class="change_img"
                                :class="{
                                  active:
                                    render_data.parts_info[
                                      render_index
                                    ].phase_index.indexOf(6) != -1
                                }"
                                src="../../assets/images/svg/cross/left_1.svg"
                                alt=""
                              />
                            </span>
                          </div>
                          <div class="foot_way">
                            <span>{{
                              phaseTraffic.length === 0
                                ? ''
                                : phaseTraffic[14].phase_num
                            }}</span>
                            <span class="foot_way_img">
                              <img
                                class="change_img"
                                src="../../assets/images/svg/cross/footway_2.svg"
                                alt=""
                              />
                              <img
                                class="change_img"
                                :class="{
                                  active:
                                    render_data.parts_info[
                                      render_index
                                    ].phase_index.indexOf(14) != -1
                                }"
                                src="../../assets/images/svg/cross/footway_1.svg"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>
                        <div class="div_e">
                          <div class="phase">
                            <span>{{
                              phaseTraffic.length === 0
                                ? ''
                                : phaseTraffic[11].phase_num
                            }}</span>
                            <span>{{
                              phaseTraffic.length === 0
                                ? ''
                                : phaseTraffic[10].phase_num
                            }}</span>
                            <span>{{
                              phaseTraffic.length === 0
                                ? ''
                                : phaseTraffic[9].phase_num
                            }}</span>
                          </div>
                          <div class="phase_img">
                            <span class="phase_img_r">
                              <img
                                class="change_img"
                                src="../../assets/images/svg/cross/right_2.svg"
                                alt=""
                              />
                              <img
                                class="change_img"
                                :class="{
                                  active:
                                    render_data.parts_info[
                                      render_index
                                    ].phase_index.indexOf(11) != -1
                                }"
                                src="../../assets/images/svg/cross/right_1.svg"
                                alt=""
                              />
                            </span>
                            <span class="phase_img_c">
                              <img
                                class="change_img"
                                src="../../assets/images/svg/cross/straight_2.svg"
                                alt=""
                              />
                              <img
                                class="change_img"
                                :class="{
                                  active:
                                    render_data.parts_info[
                                      render_index
                                    ].phase_index.indexOf(10) != -1
                                }"
                                src="../../assets/images/svg/cross/straight_1.svg"
                                alt=""
                              />
                            </span>
                            <span class="phase_img_l">
                              <img
                                class="change_img"
                                src="../../assets/images/svg/cross/left_2.svg"
                                alt=""
                              />
                              <img
                                class="change_img"
                                :class="{
                                  active:
                                    render_data.parts_info[
                                      render_index
                                    ].phase_index.indexOf(9) != -1
                                }"
                                src="../../assets/images/svg/cross/left_1.svg"
                                alt=""
                              />
                            </span>
                          </div>
                          <div class="foot_way">
                            <span>{{
                              phaseTraffic.length === 0
                                ? ''
                                : phaseTraffic[15].phase_num
                            }}</span>
                            <span class="foot_way_img">
                              <img
                                class="change_img"
                                src="../../assets/images/svg/cross/footway_2.svg"
                                alt=""
                              />
                              <img
                                class="change_img"
                                :class="{
                                  active:
                                    render_data.parts_info[
                                      render_index
                                    ].phase_index.indexOf(15) != -1
                                }"
                                src="../../assets/images/svg/cross/footway_1.svg"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 相位设置 -->
          <el-col
            :span="24"
            v-if="render_index>-1"
            class="set_camera"
            >相位设置</el-col
          >
          <!-- 相位设置 -->
          <div>
            <el-row>
              <el-col :span="12">
                <div
                  class="grid-content bg-purple"
                   v-if="render_index>-1"
                >
                  <el-checkbox-group
                    v-model="checkList"
                    @change="checkedChange"
                    class="set_cam_hei"
                  >
                    <el-checkbox
                      v-for="(item, t) in phaseOptions"
                      :label="item.id"
                      :key="t"
                      :disabled="forbidden.indexOf(item.id)>=0"
                    >
                      相位{{ item.phase_num }}-{{ item.phase_name }}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="footer" >
            <el-button class="save_btn" @click="complete('plan_data')">保存</el-button>
          </div>
        </el-card>
      </el-col>
    </div>
  </div>
</template>

<script>
var elementResizeDetectorMaker = require('element-resize-detector')
export default {
  name: '',
  data () {
    return {
      scroll_left: 0,
      // four_direct: ['part_n', 'part_w', 'part_s', 'part_e'],
      // // 一个方向的四个相位:
      // direct_phase: ['phase_img_r', 'phase_img_c', 'phase_img_l'],
      // 页面要渲染的数据
      render_data: {},
      // 初始数据
      init_data: {},
      render_index: -1,
      scrop_left: '',
      //  滚动条
      max_left: '',
      // 图例的数据
      phaseTraffic: [],
      cameraData: [],
      temp_arr: [],
      web_tempid: 1,
      let_time: {
        green_time: 1,
        red_time: 1,
        yellow_time: 1
      },
      // 选中项
      checkList: [],
      // all项
      phaseOptions: [],
      // 禁用数组
      forbidden: [],
      setTimeout: null,
      // 车的相位
      carPhase: []
    }
  },
  created () {
    this.row = JSON.parse(localStorage.getItem('row'))
    this.index = localStorage.getItem('index')
    this.inital(this.index, this.row)
    if (this.index !== '-1') {
      this.getphaselist()
    }
  },

  mounted () {
    let that = this
    var erd = elementResizeDetectorMaker()
    let scrollBox = document.getElementById('car_img')
    erd.listenTo(scrollBox, function (element) {
      // element监听屏幕某个div的宽度
      // var width = element.offsetWidth
      that.$nextTick(function () {
        // that.scroll_left = this.render_data.parts_info.length * 280
        // that.$forceUpdate()
      })
    })
  },
  watch: {
    render_index (newVal, oldVal) {
      if (newVal === -1 || oldVal > -1) {
      } else {
        this.getphaselist()
      }
    }
  },
  methods: {
    inital (index, row) {
      this.render_data = row
      // if (index !== '-1') {
      //   this.render_data = row
      // } else {
      // }
    },
    // 新增阶段
    addphase () {
      this.$confirm('是否新增方案阶段？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let obj = {}
          // 在这里点击就加一（this.web_tempid刚开始进来为1，以此来保证唯一）
          this.web_tempid = this.web_tempid + 1
          // 给render_data，push一个结构，结构中的手动加一个obj.web_tempid，其他的默认全部为0 传过去，
          obj.web_tempid = this.web_tempid
          obj.create_at = ''
          obj.fixedplan_id = ''
          obj.green_time = 0
          obj.id = ''
          obj.ids = []
          obj.phase_index = []
          if (!this.render_data.parts_info) {
            this.render_data.parts_info = []
            this.render_index = 0
          }
          obj.part_num = this.render_data.parts_info.length + 1
          obj.phases_info = []
          obj.red_time = 0
          obj.update_at = ''
          obj.yellow_time = 0
          this.render_data.parts_info.push(obj)
          // 触发点击阶段函数
          // 定位到最后侧函数
          await this.selectStage(this.render_data.parts_info.length - 1)
          this.scroll_left = this.render_data.parts_info.length * 200
          this.$forceUpdate()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消新增'
          })
        })
    },
    // 点击阶段函数
    selectStage (index) {
      // 通过index找到对应的阶段数据，用render_data.....到时间，相位
      this.render_index = index
      // // 触发橘色选中函数
      this.checkList = this.render_data.parts_info[this.render_index].ids
      // 将现有的对应的禁用
      // 从有的里面往外取，将禁用项取出来
      this.banstatue()
    },
    // 点击删除阶段按钮 触发 delPase(index,row)
    delPase (index, item) {
      // 是否是最后一条，现有的length===0
      if (this.render_data.parts_info.length < 3) {
        // 提示：方案配置下阶段不得为空！
        this.$alert('方案配置下的阶段数量不可少于两个！', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        // 提示：阶段删除后无法恢复，方案保存后生效，是否继续？
        this.$confirm('阶段删除后无法恢复，方案保存后生效，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            // 触发真正删除阶段的函数realdel(index,row)
            this.realdel(index, item)
            this.scroll_left = this.render_data.parts_info.length * 400
            this.$forceUpdate()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    },
    // 真正删除阶段的函数realdel(index,row)，
    realdel (index, row) {
      // 删除项从render_data中删除删除render_data.parts_info的[index]删除
      if (row.web_tempid) {
        this.render_data.parts_info = this.render_data.parts_info.filter(
          data => {
            return row.web_tempid !== data.web_tempid
          }
        )
      } else {
        this.render_data.parts_info = this.render_data.parts_info.filter(
          data => {
            return row.id !== data.id
          }
        )
      }
      this.delHandel(index)
    },
    // 删除以后的后续处理函数
    delHandel (index) {
      // 删除项是否处于选中状态
      if (index === this.render_index) {
        // 是选中状态
        // 判断是不是最后一个，
        if (index === this.render_data.parts_info.length) {
          // 是最后一个
          this.selectStage(index - 1)
        } else {
          // 不是最后一个
          this.selectStage(index)
        }
      } else {
        // 不是选中状态
        // 判断选中的在前面还是后面
        if (this.render_index > index) {
          // 选中的在删除的后面
          this.selectStage(this.render_index - 1)
        } else {
          // 选中的在删除的前面
          this.selectStage(this.render_index)
        }
      }
    },
    // 获取相位列表
    async getphaselist () {
      let res = await this.$http.get('phaselist/')
      if (res.code === 200) {
        let { phase_list: phaseList } = res.data
        this.phaseOptions = phaseList
        // 暂存一下人行和车的区别
        this.carPhase = []
        this.phaseOptions.filter((data) => {
          if (data.type === 1) {
            this.carPhase.push(data.id)
          }
        })
        // 图例相关设置开始
        this.phaseTraffic = phaseList
        // 判断所有阶段的多有相位在总相位中的位置
        for (let i = 0; i < this.render_data.parts_info.length; i++) {
          var arr = []
          var ids = []
          for (
            let k = 0;
            k < this.render_data.parts_info[i].phases_info.length;
            k++
          ) {
            for (let j = 0; j < this.phaseOptions.length; j++) {
              if (
                this.phaseOptions[j].id ===
                this.render_data.parts_info[i].phases_info[k].id
              ) {
                arr.push(j)
                ids.push(this.phaseOptions[j].id)
              }
            }
          }
          this.render_data.parts_info[i].phase_index = arr.sort((a, b) => {
            return a - b
          })
          this.render_data.parts_info[i].ids = ids.sort((a, b) => {
            return a - b
          })
        }
      }
      // 处理初始存的数据
      this.init_data = JSON.parse(JSON.stringify(this.render_data))
      this.selectStage(0)
    },
    // 将对应的禁用方法
    banstatue () {
      this.forbidden = []
      this.checkList.filter((data) => {
        this.phaseOptions.filter((detail) => {
          if (data === detail.id) {
            if (detail.fightinfo.length > 0) {
              detail.fightinfo.filter((opposite) => {
                this.forbidden.push(opposite.id)
              })
            }
          }
        })
      })
    },
    // 复选框情况
    checkedChange (value) {
      // 先改变本身的值
      // 传到上面，
      let arr = []
      this.phaseOptions.filter((data, index) => {
        value.filter((everyid, rowindex) => {
          if (data.id === everyid) {
            arr.push(index)
          }
        })
      })
      this.render_data.parts_info[this.render_index].ids = value.sort((a, b) => {
        return a - b
      })
      this.render_data.parts_info[this.render_index].phase_index = arr.sort((a, b) => {
        return a - b
      })
      this.$set(this.render_data, this.render_data.parts_info[this.render_index].phase_index, arr)
      this.banstatue()
    },
    // 对象数组比较
    compare (origin, target) {
      for (let key of Object.keys(target)) {
        // 遍历target的所有自身属性的key
        if (!this.compare(origin[key], target[key])) {
          return false
        }
      }
      return true
    },
    // 返回按钮
    returnFixed () {
      if (!this.render_data.parts_info && this.index === '-1' && !this.render_data.plan_num && !this.render_data.plan_name) {
        this.$router.push({
          name: 'fixedcontrol'
        })
        return
      }
      let initObj = {}
      let renderObj = {}
      initObj = JSON.parse(JSON.stringify(this.init_data))
      renderObj = JSON.parse(JSON.stringify(this.render_data))
      // 方案号，方案名称
      // if (renderObj.plan_name) renderObj.plan_name = ''
      // if (renderObj.plan_num) renderObj.plan_num = ''
      let str = false
      if (renderObj.plan_num && renderObj.plan_name) {
        str = parseInt(renderObj.plan_num) === parseInt(initObj.plan_num) && renderObj.plan_name === initObj.plan_name
      }
      let phaselen = false
      // 阶段总数
      if (renderObj.parts_info) {
        phaselen = initObj.parts_info.length === renderObj.parts_info.length
      }
      // 阶段时间,相位
      let timearr = []
      let phasearr = []
      if (initObj.parts_info) {
        initObj.parts_info.filter((initdata, i) => {
          renderObj.parts_info.filter((renderdata, j) => {
            if (i === j) {
            // 时间
              timearr.push(initdata.green_time === renderdata.green_time && initdata.red_time === renderdata.red_time && initdata.yellow_time === renderdata.yellow_time)
              phasearr.push(JSON.stringify(initdata.ids) === JSON.stringify(renderdata.ids))
            }
          })
        })
      }
      if (str && phaselen && timearr.indexOf(false) === -1 && phasearr.indexOf(false) === -1) {
        this.$router.push({
          name: 'fixedcontrol'
        })
      } else {
        // 已修改提示确定是否返回
        this.$confirm('当前方案已修改，是否保存方案配置?', '方案配置', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.complete('plan_data')
        }).catch(() => {
          this.$router.push({
            name: 'fixedcontrol'
          })
        })
      }
    },
    // 保存
    complete (formName) {
      let isTrue = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          isTrue = false
        } else {
          isTrue = true
          return false
        }
      })
      if (!this.render_data.plan_num) return this.$message.warning('请输入方案编号!')
      if (this.render_data.plan_num < 1 || this.render_data.plan_num > 16) return this.$message.warning('请设置1-16的方案编号！')
      if (!this.render_data.plan_name) return this.$message.warning('请输入方案名称！')
      if (isTrue) return
      if (!this.render_data.parts_info) {
        this.$message({
          message: '方案阶段不可为空，请配置阶段信息！',
          type: 'warning'
        })
        return
      }
      if (this.render_data.parts_info.length < 2) {
        this.$message({
          message: '请配置至少两个阶段的方案！',
          type: 'warning'
        })
        return
      }
      // 如果有一点不一样
      // 就进行，否则提示
      // 数据处理
      let senddata = {}
      // 红绿灯时间如果是undefiined设为0
      senddata = JSON.parse(JSON.stringify(this.render_data))
      senddata.plan_info = {}
      senddata.plan_info.id = this.render_data.id
      senddata.plan_info.plan_name = this.render_data.plan_name
      senddata.plan_info.plan_num = this.render_data.plan_num
      senddata.parts_info.filter((data, index) => {
        data.time_info = {}
        data.phases_info = data.ids
        data.time_info.green_time = data.green_time
        data.time_info.red_time = data.red_time
        data.time_info.yellow_time = data.yellow_time
        data.part_info = {}
        data.part_info.part_num = index + 1
        data.part_info.id = data.id
      })
      // 将为undefined的设置为0
      senddata.parts_info.filter(data => {
        for (let item in data.time_info) {
          if (typeof data.time_info[item] !== 'number') {
            data.time_info[item] = 0
          }
        }
      })
      // 数据检验
      // 将阶段数据遍历，创建数组对象，[{id,phase_name,time,phase_list},{},{},{}]
      // 如果数组长度>1就取出所有的phase_name，提示1阶段+2阶段未配置
      // 如果等于1就取出来，提示详细信息
      // 先将整个数据阶段信息取出来，遍历
      let timePhase = []
      let testArr = senddata.parts_info
      testArr.filter(data => {
        // 时间没有
        if (data.time_info.green_time === 0) {
          // 相位为空
          if (data.phases_info.length === 0) {
            timePhase.push({
              part_num: data.part_num,
              green_time: data.time_info.green_time,
              phases_info: data.phases_info
            })
          } else {
            // 相位不为空
            timePhase.push({
              part_num: data.part_num,
              green_time: data.time_info.green_time
            })
          }
        } else {
          // 时间有
          if (data.phases_info.length === 0) {
            timePhase.push({
              part_num: data.part_num,
              phases_info: data.phases_info
            })
          }
        }
      })
      // 如果没有为空的
      if (timePhase.length === 0) {
        // 判断是否都是行人
        let intersection = ''
        senddata.parts_info.filter((send, index) => {
          if (this.carPhase.filter(function (val) { return send.ids.indexOf(val) > -1 }).length === 0) {
            intersection = intersection + (index + 1) + ','
          }
        })
        if (intersection.length > 1) {
          intersection = intersection.substring(0, intersection.length - 1)
          return this.$message.warning(`第${intersection}阶段配置错误，请配置合理方案，方案中不可以只设置行人相位！`)
        }
        // 直接调用
        senddata.parts_info = JSON.stringify(senddata.parts_info)
        senddata.plan_info = JSON.stringify(senddata.plan_info)
        senddata = JSON.parse(JSON.stringify(senddata))

        this.$http({
          method: this.index === '-1' ? 'post' : 'put',
          url: this.index === '-1' ? 'addfixedplan/' : `editfixedplan/${senddata.id}/`,
          data: senddata
        }).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$router.push({
              name: 'fixedcontrol'
            })
          }
        })
        return
      }
      // 如果都配置了
      // 如果存起来的值只有一个，说明只有一个空阶段
      if (timePhase.length === 1) {
        // 如果灯的时间为0
        if (timePhase[0].green_time === 0) {
          if ('phases_info' in timePhase[0]) {
            this.$message({
              message:
                '第' + timePhase[0].part_num + '阶段未配置，无法保存方案，请配置阶段详情',
              type: 'warning'
            })
          } else {
            this.$message({
              message: '第' + timePhase[0].part_num + '阶段绿灯时间未设置，无法保存方案，请配置阶段详情',
              type: 'warning'
            })
          }
        } else {
          // 如果灯的时间不为0,则相位长度为0阶段
          this.$message({
            message: '第' + timePhase[0].part_num + '相位未设置，无法保存方案',
            type: 'warning'
          })
        }
      } else {
        // 如果存起来的值有多个
        let msg = ''
        timePhase.filter(data => {
          msg = msg + data.part_num + '、'
        })
        msg = msg.substr(0, msg.length - 1)
        this.$message({
          message: '第' + msg + '阶段未设置',
          type: 'warning'
        })
      }
    }
  },
  destroyed () {
    this.setTimeout = null
  }
}
</script>

<style scoped lang="stylus">
@import '../../assets/css/phaseImg.styl'
@import '../../assets/css/config.styl'
*
  font-size 16px
#dis_line
  display inline-block
  font-size 16px
  .el-form-item__error
    color #F56C6C
    font-size 12px
    line-height 1
    padding-top 4px
    position absolute
    top 100%
    left 90px
.table-title span
  position relative
  right 20px
.t16
  margin-bottom 20px
  .el-input
    width 350px
    margin-left 30px
.f_bold
  font-weight 600
.car_img
  padding 24px
  padding-bottom 0px
  background #333
  white-space nowrap
  min-width:40px
  .nonemsg
    position: absolute;
    text-align: center;
    line-height: 250px;
    margin: -24px 24px 0 -24px;
    color: #666;
    height: 269px;
    background: #ccc;
    width 100%
  .every_img
    display inline-block
    width 239px
    background #878787
    margin-right 37px
.color_focus
  background #FF6600
  display inline-block
  height 245px
  width 239px
  margin-right 37px
.set_time
  height 42px
  line-height 42px
.che_light
  margin-bottom 15px
  .el-input-number
    width 360px
.add_border
  border-bottom 1px solid #E5E5E5;
  padding-bottom 10px;
.del_btn
  float right
// 相位相关
.set_camera {
  height: 48px;
  line-height: 48px;
}
// 相位0102行高
.set_cam_hei {
  display: inherit;
  width: 685px;
  line-height: 32px;
}
label {
  width: 140px;
}
#roll_phase_img
  // padding-right:100px;
  // width:100%;
  overflow-y:hidden;
  #part_img
      background url('../../assets/images/svg/consoles/part/partBg.svg') no-repeat
      background-size 100% 100%
      position relative
      #content
        height 30px
        margin-top -8px
        i
          float right
          height 30px
          color white
          line-height 30px
          margin-right 10px
          cursor pointer
      .img
        transform scale(1.6,1.6)
        height 200px
        position absolute
        margin-top 50px
        .part_n,.part_s,.part_w,.part_e
          transform-origin: center center
          width 50px
          position absolute
          left 55px
          .map_phase_img
            position: absolute
            top 20px
            left 0
            // transform rotate(180deg)
            span
              width 5px
              height 15px
              font-size 12px
              color #ffffff
              line-height 20px
              margin 0 5px
              display block
              float left
              transform rotate(180deg)
              .active
                display: none
          .foot_way
            position: absolute
            // top 5px
            left 13px
        .part_w
          top 62px
          left -24px
          transform rotate(-90deg)
        .part_s
          top 135px
          left 46px
          transform rotate(180deg)
        .part_e
          top 70px
          left 124px
          transform rotate(90deg)
.footer
  text-align:center;
  padding-top:55px;
  padding-bottom:20px
  .save_btn
    width:160px;
    margin-top: 12px;
    color:#fff;
    background-color:#FF6600
</style>

<style lang="stylus">

.fixededit .el-input__inner
  text-align center
.fixededit .el-form-item__error
  left 44px
.fixededit .happy-scroll-container
  width: 100% !important;
</style>

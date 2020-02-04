<template>
  <div class="device_info">
    <div class="steps">
      <div class="step active">
        <div class="line "><span>1.路口信息</span>
          <div class="dot"><i></i></div>
        </div>
      </div>
      <div class="step active">
        <div class="line"><span>2.设备信息</span>
          <div class="dot"><i></i></div>
        </div>
      </div>
      <div class="step ">
        <div class="line"><span>3.控制信息</span>
          <div class="dot"><i></i></div>
        </div>
      </div>
    </div>
    <el-row type="flex"
            class="row-bg deviceInfo">
      <el-col :span="14"
             >
        <h2 class="table-title">相位与信号灯关联</h2>
        <div class="grid" >
            <gemini-scrollbar style="height:290px">
          <el-table :data="phaseTraffic"
                    style="height:807px"
                    :header-cell-style="{background:'#FAFAFA'}"
                    class="device-info">
            <el-table-column label="相位序号"
                             align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.phase_num }}</span>
              </template>
            </el-table-column>

            <el-table-column label="方向"
                             align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.phase_name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="相位类型"
                             align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.type === 1 ? '机动车相位' : '行人相位' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态"
                             align="center"
                             width="100">
              <template slot-scope="scope">
                <span :style="scope.row.light_info.light_num === '未关联' ? 'color: #ccc' : ''">{{ scope.row.light_info.light_num === '未关联' ? '未关联' : scope.row.light_info.light_num }}</span>
              </template>
            </el-table-column>
          </el-table>
        </gemini-scrollbar>
          </div>
      </el-col>
      <el-col :span="10">
        <div style="margin: 0px auto; text-align:right"
             class="diagram">
           <div style="text-align: center;  width:370px; display: inline-block;">
              <div class="img-style" v-if="carArr.length === 8">
                <div class="div_n">
                  <div class="phase">
                    <span>{{
                      phaseTraffic.length === 0 ? '' : phaseTraffic[2].phase_num
                    }}</span>
                    <span>{{
                      phaseTraffic.length === 0 ? '' : phaseTraffic[1].phase_num
                    }}</span>
                    <span>{{
                      phaseTraffic.length === 0 ? '' : phaseTraffic[0].phase_num
                    }}</span>
                  </div>
                  <div class="camera">
                    <span>
                      {{
                        cameraData.length === 0
                          ? ''
                          : cameraData[3].camera_num === '未关联'
                          ? ''
                          : cameraData[3].camera_num
                      }}</span
                    >
                  </div>
                  <div class="camera_img">
                    <span class="camera_imgs">
                      <img
                        class="change_img"
                        :src="
                          !carArr[3]
                            ? ''
                            : carArr[3].status == 1
                            ? require('../../assets/images/Camera/westCamera.png')
                            : carArr[3].status == 3
                            ? require('../../assets/images/Camera/westFaultCamera.png')
                            : carArr[3].status == 4
                            ? require('../../assets/images/Camera/westUnrelatedCamera.png')
                            : ''
                        "
                        alt=""
                      />
                    </span>
                  </div>
                  <div class="camera_person">
                    <span>{{
                      7 > cameraData.length
                        ? ''
                        : cameraData[7].camera_num === '未关联'
                        ? ''
                        : cameraData[7].camera_num
                    }}</span>
                  </div>
                  <div class="camera_person_img">
                    <span class="camera_person_imgs">
                      <!-- 北7 -->
                      <img
                        class="change_img"
                        :src="
                          !carArr[7]
                            ? ''
                            : carArr[7].status == 1
                            ? require('../../assets/images/Camera/westCamera.png')
                            : carArr[7].status == 3
                            ? require('../../assets/images/Camera/westFaultCamera.png')
                            : carArr[7].status == 4
                            ? require('../../assets/images/Camera/westUnrelatedCamera.png')
                            : ''
                        "
                        alt=""
                      />
                    </span>
                  </div>
                  <div class="phase_img">
                    <span class="phase_img_r"
                      ><img
                        class="change_img"
                        src="../../assets/images/svg/cross/right_2.svg"
                        alt=""/><img
                        class="change_img"
                        src="../../assets/images/svg/cross/right_1.svg"
                        alt=""
                    /></span>

                    <span class="phase_img_c"
                      ><img
                        class="change_img"
                        src="../../assets/images/svg/cross/straight_2.svg"
                        alt=""/><img
                        class="change_img"
                        src="../../assets/images/svg/cross/straight_1.svg"
                        alt=""
                    /></span>

                    <span class="phase_img_l">
                      <img
                        class="change_img"
                        src="../../assets/images/svg/cross/left_2.svg"
                        alt=""/><img
                        class="change_img"
                        src="../../assets/images/svg/cross/left_1.svg"
                        alt=""
                    /></span>
                  </div>
                  <div class="foot_way">
                    <span>{{
                      phaseTraffic.length === 0
                        ? ''
                        : phaseTraffic[12].phase_num
                    }}</span>
                    <span class="foot_way_img"
                      ><img
                        class="change_img"
                        src="../../assets/images/svg/cross/footway_2.svg"
                        alt=""/><img
                        class="change_img"
                        src="../../assets/images/svg/cross/footway_1.svg"
                        alt=""
                    /></span>
                  </div>
                </div>
                <div class="div_w">
                  <div class="phase">
                    <span>{{
                      phaseTraffic.length === 0 ? '' : phaseTraffic[5].phase_num
                    }}</span>
                    <span>{{
                      phaseTraffic.length === 0 ? '' : phaseTraffic[4].phase_num
                    }}</span>
                    <span>{{
                      phaseTraffic.length === 0 ? '' : phaseTraffic[3].phase_num
                    }}</span>
                  </div>
                  <div class="camera">
                    <span>{{
                      cameraData.length === 0
                        ? ''
                        : cameraData[1].camera_num === '未关联'
                        ? ''
                        : cameraData[1].camera_num
                    }}</span>
                  </div>
                  <div class="camera_img">
                    <span class="camera_imgs">
                      <img
                        class="change_img"
                        :src="
                          !carArr[1]
                            ? ''
                            : carArr[1].status == 1
                            ? require('../../assets/images/Camera/westCamera.png')
                            : carArr[1].status == 3
                            ? require('../../assets/images/Camera/westFaultCamera.png')
                            : carArr[1].status == 4
                            ? require('../../assets/images/Camera/westUnrelatedCamera.png')
                            : ''
                        "
                        alt=""
                      />
                    </span>
                  </div>
                  <div class="camera_person">
                    <span>{{
                      7 > cameraData.length
                        ? ''
                        : cameraData[5].camera_num === '未关联'
                        ? ''
                        : cameraData[5].camera_num
                    }}</span>
                  </div>
                  <div class="camera_person_img">
                    <span class="camera_person_imgs">
                      <!-- 西 -->
                      <img
                        class="change_img"
                        :src="
                          !carArr[5]
                            ? ''
                            : carArr[5].status == 1
                            ? require('../../assets/images/Camera/westCamera.png')
                            : carArr[5].status == 3
                            ? require('../../assets/images/Camera/westFaultCamera.png')
                            : carArr[5].status == 4
                            ? require('../../assets/images/Camera/westUnrelatedCamera.png')
                            : ''
                        "
                        alt=""
                      />
                      <!-- <img class="change_img"
                           src="../../assets/images/svg/cross/camera_2.svg"
                           alt="" /><img class="change_img"
                           src="../../assets/images/svg/cross/camera_1.svg"
                           alt="" /> -->
                    </span>
                  </div>
                  <div class="phase_img">
                    <span class="phase_img_r"
                      ><img
                        class="change_img"
                        src="../../assets/images/svg/cross/right_2.svg"
                        alt=""/><img
                        class="change_img"
                        src="../../assets/images/svg/cross/right_1.svg"
                        alt=""
                    /></span>

                    <span class="phase_img_c"
                      ><img
                        class="change_img"
                        src="../../assets/images/svg/cross/straight_2.svg"
                        alt=""/><img
                        class="change_img"
                        src="../../assets/images/svg/cross/straight_1.svg"
                        alt=""
                    /></span>

                    <span class="phase_img_l">
                      <img
                        class="change_img"
                        src="../../assets/images/svg/cross/left_2.svg"
                        alt=""/><img
                        class="change_img"
                        src="../../assets/images/svg/cross/left_1.svg"
                        alt=""
                    /></span>
                  </div>
                  <div class="foot_way">
                    <span>{{
                      phaseTraffic.length === 0
                        ? ''
                        : phaseTraffic[13].phase_num
                    }}</span>
                    <span class="foot_way_img"
                      ><img
                        class="change_img"
                        src="../../assets/images/svg/cross/footway_2.svg"
                        alt=""/><img
                        class="change_img"
                        src="../../assets/images/svg/cross/footway_1.svg"
                        alt=""
                    /></span>
                  </div>
                </div>
                <div class="div_s">
                  <div class="phase">
                    <span>{{
                      phaseTraffic.length === 0 ? '' : phaseTraffic[8].phase_num
                    }}</span>
                    <span>{{
                      phaseTraffic.length === 0 ? '' : phaseTraffic[7].phase_num
                    }}</span>
                    <span>{{
                      phaseTraffic.length === 0 ? '' : phaseTraffic[6].phase_num
                    }}</span>
                  </div>
                  <div class="camera">
                    <span>{{
                      cameraData.length === 0
                        ? ''
                        : cameraData[2].camera_num === '未关联'
                        ? ''
                        : cameraData[2].camera_num
                    }}</span>
                  </div>
                  <div class="camera_img">
                    <span class="camera_imgs">
                      <img
                        class="change_img"
                        :src="
                          !carArr[2]
                            ? ''
                            : carArr[2].status == 1
                            ? require('../../assets/images/Camera/westCamera.png')
                            : carArr[2].status == 3
                            ? require('../../assets/images/Camera/westFaultCamera.png')
                            : carArr[2].status == 4
                            ? require('../../assets/images/Camera/westUnrelatedCamera.png')
                            : ''
                        "
                        alt=""
                      />
                    </span>
                  </div>
                  <div class="camera_person">
                    <span>{{
                      7 > cameraData.length
                        ? ''
                        : cameraData[6].camera_num === '未关联'
                        ? ''
                        : cameraData[6].camera_num
                    }}</span>
                  </div>
                  <div class="camera_person_img">
                    <span class="camera_person_imgs">
                      <!-- 南 -->
                      <img
                        class="change_img"
                        :src="
                          !carArr[6]
                            ? ''
                            : carArr[6].status == 1
                            ? require('../../assets/images/Camera/westCamera.png')
                            : carArr[6].status == 3
                            ? require('../../assets/images/Camera/westFaultCamera.png')
                            : carArr[6].status == 4
                            ? require('../../assets/images/Camera/westUnrelatedCamera.png')
                            : ''
                        "
                        alt=""
                      />

                      <!-- <img class="change_img"
                          ! carArr[9?'':]:src="
                            carArr[2].status == 1?require('../../assets/images/Camera/westCamera.png'):carArr[2].status == 3?require('../../assets/images/Camera/westFaultCamera.png'):carArr[2].status == 4 ? require('../../assets/images/Camera/westUnrelatedCamera.png'):''"
                           alt="" /> -->
                      <!-- <img class="change_img"
                           src="../../assets/images/svg/cross/camera_2.svg"
                           alt="" /><img class="change_img"
                           src="../../assets/images/svg/cross/camera_1.svg"
                           alt="" /> -->
                    </span>
                  </div>
                  <div class="phase_img">
                    <span class="phase_img_r"
                      ><img
                        class="change_img"
                        src="../../assets/images/svg/cross/right_2.svg"
                        alt=""/><img
                        class="change_img"
                        src="../../assets/images/svg/cross/right_1.svg"
                        alt=""
                    /></span>

                    <span class="phase_img_c"
                      ><img
                        class="change_img"
                        src="../../assets/images/svg/cross/straight_2.svg"
                        alt=""/><img
                        class="change_img"
                        src="../../assets/images/svg/cross/straight_1.svg"
                        alt=""
                    /></span>

                    <span class="phase_img_l">
                      <img
                        class="change_img"
                        src="../../assets/images/svg/cross/left_2.svg"
                        alt=""/><img
                        class="change_img"
                        src="../../assets/images/svg/cross/left_1.svg"
                        alt=""
                    /></span>
                  </div>
                  <div class="foot_way">
                    <span>{{
                      phaseTraffic.length === 0
                        ? ''
                        : phaseTraffic[14].phase_num
                    }}</span>
                    <span class="foot_way_img"
                      ><img
                        class="change_img"
                        src="../../assets/images/svg/cross/footway_2.svg"
                        alt=""/><img
                        class="change_img "
                        src="../../assets/images/svg/cross/footway_1.svg"
                        alt=""
                    /></span>
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
                      phaseTraffic.length === 0 ? '' : phaseTraffic[9].phase_num
                    }}</span>
                  </div>
                  <div class="camera">
                    <span>{{
                      cameraData.length === 0
                        ? ''
                        : cameraData[0].camera_num === '未关联'
                        ? ''
                        : cameraData[0].camera_num
                    }}</span>
                  </div>
                  <div class="camera_img">
                    <span class="camera_imgs">
                      <img
                        class="change_img"
                        :src="
                          !carArr[0]
                            ? ''
                            : carArr[0].status == 1
                            ? require('../../assets/images/Camera/westCamera.png')
                            : carArr[0].status == 3
                            ? require('../../assets/images/Camera/westFaultCamera.png')
                            : carArr[0].status == 4
                            ? require('../../assets/images/Camera/westUnrelatedCamera.png')
                            : ''
                        "
                        alt=""
                      />
                    </span>
                  </div>
                  <div class="camera_person">
                    <span>{{
                      7 > cameraData.length
                        ? ''
                        : cameraData[4].camera_num === '未关联'
                        ? ''
                        : cameraData[4].camera_num
                    }}</span>
                  </div>
                  <div class="camera_person_img">
                    <span class="camera_person_imgs">
                      <!-- 东 -->
                      <img
                        class="change_img"
                        :src="
                          !carArr[4]
                            ? ''
                            : carArr[4].status == 1
                            ? require('../../assets/images/Camera/westCamera.png')
                            : carArr[4].status == 3
                            ? require('../../assets/images/Camera/westFaultCamera.png')
                            : carArr[4].status == 4
                            ? require('../../assets/images/Camera/westUnrelatedCamera.png')
                            : ''
                        "
                        alt=""
                      />
                    </span>
                  </div>
                  <div class="phase_img">
                    <span class="phase_img_r"
                      ><img
                        class="change_img"
                        src="../../assets/images/svg/cross/right_2.svg"
                        alt=""/><img
                        class="change_img"
                        src="../../assets/images/svg/cross/right_1.svg"
                        alt=""
                    /></span>

                    <span class="phase_img_c"
                      ><img
                        class="change_img"
                        src="../../assets/images/svg/cross/straight_2.svg"
                        alt=""/><img
                        class="change_img"
                        src="../../assets/images/svg/cross/straight_1.svg"
                        alt=""
                    /></span>

                    <span class="phase_img_l">
                      <img
                        class="change_img"
                        src="../../assets/images/svg/cross/left_2.svg"
                        alt=""/><img
                        class="change_img"
                        src="../../assets/images/svg/cross/left_1.svg"
                        alt=""
                    /></span>
                  </div>
                  <div class="foot_way">
                    <span>{{
                      phaseTraffic.length === 0
                        ? ''
                        : phaseTraffic[15].phase_num
                    }}</span>
                    <span class="foot_way_img"
                      ><img
                        class="change_img"
                        src="../../assets/images/svg/cross/footway_2.svg"
                        alt=""/>
                      <img
                        class="change_img"
                        src="../../assets/images/svg/cross/footway_1.svg"
                        alt=""
                    /></span>
                  </div>
                </div>
              </div>
              <p style="font-size:14px; margin: 320px 0 5px;">路口示意图</p>
              <p style="font-size:12px">
                （数字为默认相位,可到相位设置页面更改）
              </p>
            </div>
        </div>
      </el-col>
    </el-row>
    <h2 class="table-title">摄像头配置</h2>
     <GeminiScrollbar class="my-scroll-bar">
      <el-table :data="cameraData"
                :header-cell-style="{ background: '#FAFAFA' }"
                class="device-info">
        <el-table-column label="方向"
                         align="center">
          <template slot-scope="scope">
            <span>{{
            scope.row.direct_type === '' ? '---' : scope.row.direct_type
          }}</span>
          </template>
        </el-table-column>
        <el-table-column label="道路类型"
                         width="100"
                         align="center">
          <template slot-scope="scope">
            {{
            scope.row.direct_type.indexOf('进口') > -1
              ? '车道识别'
              : '人行道识别'
          }}
            <!-- <span >{{ scope.row.type === 1 ? '车道识别' : scope.row.type === 2 ? '人行道识别' : '----'  }}</span> -->
          </template>
        </el-table-column>
        <el-table-column label="设备型号"
                         align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.model === '' ? '---' : scope.row.model }}</span>
          </template>
        </el-table-column>
        <el-table-column label="架设高度（米）"
                         align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.height ? scope.row.height + 'm' : '---' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="IP地址"
                         align="center"
                         show-overflow-tooltip
                         >
          <template slot-scope="scope">
            <span>{{ scope.row.ip === '' ?'---' :  scope.row.ip }}</span>
          </template>
        </el-table-column>
        <el-table-column label="后缀"
                         align="center"
                         show-overflow-tooltip
                         >
          <template slot-scope="scope">
            <span>{{ scope.row.tail === '' ?'---':  scope.row.tail  }}</span>
          </template>
        </el-table-column>
        <el-table-column label="端口号"
                         align="center"
                         show-overflow-tooltip
                         >
          <template slot-scope="scope">
            <span>{{ scope.row.port === '' ? '---' : scope.row.port }}</span>
          </template>
        </el-table-column>

        <el-table-column label="摄像头编号"
                         align="center">
          <template slot-scope="scope">
            <span>{{
              scope.row.camera_num === '未关联' ? '---' : scope.row.camera_num
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="摄像头状态"
                         align="center">
          <template slot-scope="scope">
            <span  :style="
                        scope.row.status === 3 ? 'color: red' :scope.row.status===4 ?'color:#ccc':''
                      ">{{
            scope.row.status === 1
              ? '正常'
              : scope.row.status === 3
              ? '故障'
              : scope.row.status === 4
              ? '未连接'
              : '返回值非123'
          }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         class="font_org"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       size="mini"
                       color="#FF6600"
                       @click="handleEdit(scope.$index, scope.row, 'formdata')"><i style="color:#FF6600; font-style:normal">设置</i></el-button>
            <el-button type="text"
                       size="mini"
                       @click="handldel(scope.$index, scope.row, 'formdata')">重置</el-button>
          </template>
        </el-table-column>
      </el-table>
     </GeminiScrollbar>
    <div class="el-fot">
      <el-button @click="prev">上一步</el-button>
      <el-button style="color:#fff; background-color:#FF6600"
                 @click="next">下一步</el-button>
    </div>
    <el-dialog title="连接摄像头"
               :visible.sync="centerDialogVisible"
               :close-on-click-modal="false"
               width="500px"
               center>
      <el-form label-width="90px"
       v-loading="loading"
          element-loading-text="视频加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#ffffffb8"
               :rules="rules"
               ref="formdata"
               :model="formdata"
               class="crossInfo">
        <!-- <el-form-item label="道路类型:" prop="type">
            <el-select v-model="formdata.type" placeholder="请选择道路类型">
              <el-option label="车道识别" value="1"></el-option>
              <el-option label="人行道识别" value="2"></el-option>
            </el-select>
          </el-form-item> -->
        <el-form-item label="设备型号:"
                      prop="model"
                      :hide-required-asterisk="true">
          <el-input class="infoInputs"
                    v-model="formdata.model"
                    maxlength="20"
                    placeholder="请输入设备型号"></el-input>
        </el-form-item>
        <el-form-item label="编号:"
                      prop="camera_num">
          <el-input class="infoInputs"
                    v-model="formdata.camera_num"
                    maxlength="5"
                    placeholder="请输入摄像头编号"></el-input>
        </el-form-item>
        <el-form-item label="高度:"
                      class="height"
                      prop="height">
          <el-input class="infoInputs"
                    v-model="formdata.height"
                    maxlength="5"
                    placeholder="请输入摄像高度"></el-input>&nbsp;m
        </el-form-item>
        <el-form-item label="IP:"
                      prop="ip">
          <el-input class="infoInputs"
                    v-model="formdata.ip"
                    placeholder="请输入摄像头IP"></el-input>
        </el-form-item>
        <el-form-item label="后缀:"
                      prop="tail">
          <el-input class="infoInputs"
                    v-model="formdata.tail"
                    maxlength="100"
                    placeholder="请输入后缀"></el-input>
        </el-form-item>
        <el-form-item label="端口:">
          <el-input class="infoInputs"
                    v-model="formdata.port"
                    maxlength="7"
                    placeholder="请输入摄像头端口号"></el-input>
        </el-form-item>
        <!-- <el-form-item label="端口:" prop="port"> -->
        <!-- <el-form-item label="用户名:" prop="username"> -->
        <el-form-item label="用户名:">
          <el-input class="infoInputs"
                    v-model="formdata.username"
                    maxlength="30"
                    placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码:" prop="pwd"> -->
        <el-form-item label="密码:">
          <el-input type="password"
                    class="infoInputs"
                    v-model="formdata.pwd"
                    maxlength="30"
                    placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="confirm('formdata')">确 定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import GeminiScrollbar from 'vue-gemini-scrollbar'
Vue.use(GeminiScrollbar)
export default {
  data () {
    var deviceModel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('设备型号不能为空!'))
      } else {
        callback()
      }
    }
    var tail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('设备型号不能为空!'))
      } else {
        callback()
      }
    }
    var cameraNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('摄像头编号不能为空!'))
      } else {
        callback()
      }
    }
    var height = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('摄像高度不能为空!'))
      } else {
        let reg = new RegExp('^[-\\+]?([0-9]+\\.?)?[0-9]+$')
        if (!reg.test(value.toString())) {
          callback(new Error('请输入正确的格式!'))
        }
        callback()
      }
    }
    var port = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('服务端端口不能为空!'))
      } else {
        // 正则匹配端口
        let pattern = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
        if (!pattern.test(value.toString())) {
          callback(new Error('请设置0-65535的有效端口号!'))
        }
        callback()
      }
    }
    var ip = (rule, value, callback) => {
      // 正则匹配ip
      let pattern = /^([1-9]\d?|1\d{2}|2[01]\d|22[0-3])(\.([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/g
      if (value === '') {
        callback(new Error('路口IP不能为空!'))
      } else {
        if (!pattern.test(value.toString())) {
          callback(new Error('请输入正确的格式!'))
        }
        callback()
      }
    }
    var username = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空!'))
      } else {
        callback()
      }
    }
    var password = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      carArr: [],
      phaseTraffic: [],
      cameraData: [],
      cameraArr: [],
      scrollTop: '',
      centerDialogVisible: false,
      direct_type: '东',
      formdata: {
        model: '',
        direct_type: '1',
        camera_num: '',
        port: '',
        ip: '',
        tail: '',
        username: '',
        pwd: '',
        type: '',
        height: ''
      },
      rules: {
        // type: [
        //   { validator: type, trigger: 'blur' }
        // ],
        camera_num: [
          { required: true, validator: cameraNum, trigger: 'blur' }
        ],
        model: [
          { required: true, validator: deviceModel, trigger: 'blur' }
        ],
        height: [
          { required: true, validator: height, trigger: 'blur' }
        ],
        port: [
          { validator: port, trigger: 'blur' }
        ],
        ip: [
          { required: true, validator: ip, trigger: 'blur' }
        ],
        tail: [
          { required: true, validator: tail, trigger: 'blur' }
        ],
        username: [
          { validator: username, trigger: 'blur' }
        ],
        pwd: [
          { validator: password, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.init()
    this.getPhaseList()
  },
  mounted () {
    // window.addEventListener('scroll', this.btn_pos)
  },
  methods: {
    async init () {
      let res = await this.$http.get('phaselist/')
      let phaseArr = []
      let cameraArr = []
      let { camera_list: cameraList, phase_list: phaseList } = res.data
      this.phaseTraffic = phaseList
      this.cameraData = cameraList
      cameraList.map(v => {
        this.directSwitch(v)
        if (v.type === '') {
          v.camera_num = '未关联'
        }
        cameraArr.push(v.camera_num)
      })
      phaseList.map(function (v, index) {
        if (JSON.stringify(v.light_info) === '{}') {
          v.light_info.light_num = '未关联'
        }
        phaseArr.push(v.light_info.light_num)
      })
      this.$nextTick(() => {
        this.cameraArr = cameraArr
        let phaseArrDom = this.getPhaseList().phaseArr
        // let cameraArrDom = await this.getPhaseList().cameraArr
        for (let i = 0; i < phaseArr.length; i++) {
          if (phaseArr[i] === '未关联') {
            phaseArrDom[i].lastChild.classList.remove('active')
          } else {
            phaseArrDom[i].lastChild.classList.add('active')
          }
        }
      })
    },
    async getCamerInfo (id) {
      let res = await this.$http.get(`camerainfo/${id}/`)
      this.formdata = res.data
      this.formdata.type = res.data.type + ''
    },
    async handldel (index, row) {
      if (!row.id) {
        return
      }
      this.$confirm('重置后将清空所有配置信息，是否继续？', '重置', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let res = await this.$http.delete(`camera/${row.id}/`)
          if (res.code === 200) {
            this.$message.success('成功')
            this.init()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          })
        })
    },
    async confirm (formName) {
      let isTrue = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          isTrue = false
        } else {
          isTrue = true
          return false
        }
      })
      if (isTrue) return
      this.loading = true
      let res = ''
      if (this.formdata.id === '') {
        res = await this.$http.post('camera/', this.formdata)
      } else {
        res = await this.$http.put(`camera/${this.formdata.id}/`, this.formdata)
      }
      if (res.code === 200) {
        this.$message.success('设备配置成功')
        this.init()
        this.getPhaseList()
        this.centerDialogVisible = false
      }
      this.loading = false
    },
    // 设置
    async handleEdit (index, row, formdata) {
      this.loading = false
      if (this.$refs[formdata]) {
        this.$refs[formdata].resetFields()
      }
      if (row.id) {
        this.getCamerInfo(row.id)
      } else {
        this.formdata.camera_num = ''
        this.formdata.port = ''
        this.formdata.ip = ''
        this.formdata.tail = ''
        this.formdata.username = ''
        this.formdata.pwd = ''
        this.formdata.id = ''
      }
      this.direct_type = row.direct_type
      this.centerDialogVisible = true
      if (row.direct_type === '东进口') {
        this.formdata.direct_type = 1
      } else if (row.direct_type === '西进口') {
        this.formdata.direct_type = 2
      } else if (row.direct_type === '南进口') {
        this.formdata.direct_type = 3
      } else if (row.direct_type === '北进口') {
        this.formdata.direct_type = 4
      }
      if (index >= 4) {
        if (row.direct_type === '东行人') {
          this.formdata.direct_type = 5
        } else if (row.direct_type === '西行人') {
          this.formdata.direct_type = 6
        } else if (row.direct_type === '南行人') {
          this.formdata.direct_type = 7
        } else if (row.direct_type === '北行人') {
          this.formdata.direct_type = 8
        }
      }
    },
    prev () {
      this.$router.push({ name: 'crossinfo' })
    },
    next () {
      for (let i = 0; i < this.cameraArr.length; i++) {
        if (this.cameraArr[i] === '未关联') {
          this.$confirm('有摄像头未设置,未设置的无法观看实时视频, 是否继续?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true
          }).then(() => {
            this.$router.push({ name: 'controlinfo' })
          })
          return
        }
      }
      this.$router.push({ name: 'controlinfo' })
    },
    btn_pos () {
      // 滚动条的高度
      this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      let diagram = document.querySelector('.diagram')
      if (this.scrollTop >= 100) {
        diagram.style.position = 'fixed'
        diagram.style.top = 130 + 'px'
      } else {
        diagram.style.position = 'relative'
        diagram.style.top = 0 + 'px'
      }
    },
    getPhaseList () {
      let phaseList = document.querySelectorAll('.phase_img')
      let footWayList = document.querySelectorAll('.foot_way_img')
      let cameraList = document.querySelectorAll('.camera_imgs')
      let cameraPersonList = document.querySelectorAll('.camera_person_imgs')
      let phaseArr = []
      let cameraArr = []
      let obj = {}
      Object.values(phaseList).map(v => {
        Object.values(v.children).reverse().map(v => {
          phaseArr.push(v)
        })
      })
      Object.values(footWayList).map(v => {
        phaseArr.push(v)
      })
      cameraArr.push(cameraList[3], cameraList[1], cameraList[2], cameraList[0])
      cameraArr.push(cameraPersonList[3], cameraPersonList[1], cameraPersonList[2], cameraPersonList[0])

      obj.phaseArr = phaseArr
      obj.cameraArr = cameraArr
      return obj
    },
    directSwitch (value) {
      if (value.direct_type === 1) {
        value.direct_type = '东进口'
        this.carArr[0] = value
      } else if (value.direct_type === 2) {
        value.direct_type = '西进口'
        this.carArr[1] = value
      } else if (value.direct_type === 3) {
        value.direct_type = '南进口'
        this.carArr[2] = value
      } else if (value.direct_type === 4) {
        value.direct_type = '北进口'
        this.carArr[3] = value
      } else if (value.direct_type === 5) {
        this.carArr[4] = value
        value.direct_type = '东行人'
      } else if (value.direct_type === 6) {
        this.carArr[5] = value
        value.direct_type = '西行人'
      } else if (value.direct_type === 7) {
        this.carArr[6] = value
        value.direct_type = '南行人'
      } else if (value.direct_type === 8) {
        this.carArr[7] = value
        value.direct_type = '北行人'
      }
    }
  },
  destroyed () {
    // window.removeEventListener('scroll', this.btn_pos)
  }
}
</script>
<style scoped lang="stylus">
@import '../../assets/css/phaseImg.styl'
.diagram
  position relative
  top 0
  padding-left 15px
.device-info
  .el-table .has-gutter th
    background-color red !important
.deviceInfo
  .table-title
    font-size 14px
    line-height 22px
    color #333333
.my-scroll-bar
  height:335px;
  .grid, .hero {
    // overflow: auto;
    position: relative;
    background: bisque;
  }
  .grid .gm-scrollbar .thumb {
    background-color: #D8D8D8;
  }

  .grid .gm-scrollbar .thumb:hover,
  .grid .gm-scrollbar .thumb:active {
    background-color: #D8D8D8;
  }
  .gm-scrollbar .thumb {
    border-radius: 4px;
  }
  .gm-scrollbar.-vertical {
    width: 8px;
    background-color #F0F0F0
  }
  .gm-scrollbar.-horizontal {
    height: 6px;
    left: 2px;
    background: white;
    display:none
  }
  .gm-scrollbar-container .gm-scroll-view {
    width: 100%;
    height: 335px;
    transform: initial;
  }
.device_info
  .camera_img
    .camera_imgs
      .change_img
        width 20px
  .camera_person_img
    top 97px
    left 18px
    position absolute
    .camera_person_imgs
      img
        width 20px
</style>

<style lang="stylus">
// html
// ::-webkit-scrollbar
// display none
.device_info
  .el-select
    width 100%
  .height
    .el-input
      width 90%
  .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell
    padding 0
  .gm-scrollbar.-horizontal
    height: 6px;
    left: 2px;
    background: white;
    display:none
  .el-table::before
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0px;
  .el-loading-mask
    height: 580px;
</style>

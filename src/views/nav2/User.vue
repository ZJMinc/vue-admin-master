<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-input placeholder="请输入工号查询" v-model="filterInput"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="showAddForm">新增</el-button>
        </el-form-item>
        <el-form-item>
<!--          当前员工数量为:{{userNum}}-->
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="filterBy(users,filterInput)" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100" sortable>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="100" sortable>
      </el-table-column>
      <el-table-column prop="uid" label="工号" width="180" sortable>
      </el-table-column>
      <el-table-column prop="car" label="使用车辆" width="180" sortable>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" min-width="180" sortable>
      </el-table-column>
      <el-table-column prop="idCard" label="身份证号" min-width="180" sortable>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="props">
          <el-button size="small" @click="showEditForm(props.row.id)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteUser(props.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增界面-->
    <el-dialog title="新增人员" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form v-on:submit="addUser">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="adduser.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="adduser.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工号" :label-width="formLabelWidth">
        <el-input v-model="adduser.uid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用车辆" :label-width="formLabelWidth">
          <el-select v-model="adduser.car" placeholder="请选择使用车辆">
            <el-option label="苏E12345" value="苏E12345"></el-option>
            <el-option label="苏E12345" value="苏E12345"></el-option>
            <el-option label="苏E12345" value="苏E12345"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="adduser.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="身份证" :label-width="formLabelWidth">
          <el-input v-model="adduser.idCard" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑界面-->
    <el-dialog title="修改车辆信息：" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form v-on:submit="updateUser">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="user.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="user.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工号" :label-width="formLabelWidth">
          <el-input v-model="user.uid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用车辆" :label-width="formLabelWidth">
          <el-select v-model="user.car" placeholder="请选择使用车辆">
            <el-option label="苏E12345" value="苏E12345"></el-option>
            <el-option label="苏E12345" value="苏E12345"></el-option>
            <el-option label="苏E12345" value="苏E12345"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="身份证" :label-width="formLabelWidth">
          <el-input v-model="user.idCard" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">修 改</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  export default {
    data(){
      return{
        // userNum:'',
        filterInput:"",
        //新增界面数据
        adduser:{
          addname: '',
          addage: '',
          adduid: '',
          addcar: '',
          addphone: '',
          addidCard: ''
        },
        //编辑界面数据
        user:{
          name: '',
          age: '',
          uid: '',
          car: '',
          phone: '',
          idCard: ''
        },
        users:[],
        addFormVisible: false,//新增界面是否显示
        editFormVisible: false,//修改界面是否显示
        formLabelWidth: '120px'
      }
    },
    methods: {
      // getUserNum(){
      //   this.$http.get("http://localhost:3000/users").then(function (response) {
      //     console.log(response);
      //     this.carNum = response.body.length;
      //   })
      // },
      filterBy(users,value){
        return users.filter(function (user) {
          return user.uid.match(value);
        })
      },
      fetchUsers() {
        this.$http.get("http://localhost:3000/users").then(function (response) {
          console.log(response);
          this.users = response.body;
        })
      },
      //添加操作函数
      showAddForm() {
        this.addFormVisible = true
      },
      addUser(e){
        if(!this.adduser.name ||!this.adduser.age ||!this.adduser.uid ||!this.adduser.car ||!this.adduser.phone ||!this.adduser.idCard ){
          this.$notify({
            title: '消息提示',
            message: '请填写完整信息',
            type: 'error'
          });
        }else{
          let newUser = {
            name: this.adduser.name,
            age: this.adduser.age,
            uid: this.adduser.uid,
            car: this.adduser.car,
            phone: this.adduser.phone,
            idCard: this.adduser.idCard,
          }
          this.$http.post("http://localhost:3000/users",newUser).then(function (response) {
          })
          this.$notify({
            title: '消息提示',
            message: '添加成功',
            type: 'success'
          });
          e.preventDefault();
        }
        e.preventDefault();
        this.addFormVisible = false
        this.fetchUsers();
        // this.getUserNum();
      },
      //编辑操作函数
      showEditForm(id) {
        this.id = id;
        this.editFormVisible = true;
        this.$http.get("http://localhost:3000/users/"+id).then(function (response) {
          this.user = response.body;
        });
      },
      updateUser(id){
        if(!this.user.name ||!this.user.age ||!this.user.uid ||!this.user.car ||!this.user.phone ||!this.user.idCard ){
          this.$notify({
            title: '消息提示',
            message: '请填写完整信息',
            type: 'error'
          });
        }else{
          let updateUser = {
            name: this.user.name,
            age: this.user.age,
            uid: this.user.uid,
            car: this.user.car,
            phone: this.user.phone,
            idCard: this.user.idCard
          }
          this.$http.put("http://localhost:3000/users/"+this.id,updateUser).then(function () {
            this.fetchUsers();
          });
          this.$notify({
            title: '消息提示',
            message: '更新成功',
            type: 'success'
          });
          this.editFormVisible = false;
        }
      },
      //删除操作函数
      deleteUser(id){
        this.$http.delete("http://localhost:3000/users/"+id).then(function () {
          this.fetchUsers();
          // this.getUserNum();
        });
        this.$notify({
          title: '消息提示',
          message: '删除成功',
          type: 'success'
        });
      },
    },
    created(){
      this.fetchUsers();
      // this.getUserNum();
    }
  }
</script>

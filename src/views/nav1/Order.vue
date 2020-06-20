<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input placeholder="请输入地点查询" v-model="filterInput"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="showAddForm">新增</el-button>
				</el-form-item>
				<el-form-item>
					当前订单数量为:{{orderNum}}
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="filterBy(orders,filterInput)" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="address" label="配送地点" width="180" sortable>
			</el-table-column>
			<el-table-column prop="weight" label="货物量" width="100" sortable>
			</el-table-column>
			<el-table-column prop="earlyTime" label="最早到达时间" width="170" sortable>
			</el-table-column>
			<el-table-column prop="lastTime" label="最晚到达时间" width="170" sortable>
			</el-table-column>
			<el-table-column prop="name" label="收货人" min-width="120" sortable>
			</el-table-column>
			<el-table-column prop="phone" label="电话号码" min-width="120" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="props">
					<el-button size="small" @click="showEditForm(props.row.id)">编辑</el-button>
					<el-button type="danger" size="small" @click="deleteOrder(props.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--新增界面-->
		<el-dialog title="新增配送订单" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form v-on:submit="addOrder">
				<el-form-item label="配送地点" :label-width="formLabelWidth">
					<el-input v-model="addorder.address" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="货物量" :label-width="formLabelWidth">
					<el-input v-model="addorder.weight" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="最早到达时间" :label-width="formLabelWidth">
					<el-input v-model="addorder.earlyTime" placeholder="请按照yyyy-mm-dd hh:mm:ss格式输入" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="最晚到达时间" :label-width="formLabelWidth">
					<el-input v-model="addorder.lastTime" placeholder="请按照yyyy-mm-dd hh:mm:ss格式输入" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="收货人" :label-width="formLabelWidth">
					<el-input v-model="addorder.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话号码" :label-width="formLabelWidth">
					<el-input v-model="addorder.phone" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addOrder">确 定</el-button>
			</div>
		</el-dialog>
		<!--编辑界面-->
		<el-dialog title="修改车辆信息：" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form v-on:submit="updateOrder">
				<el-form-item label="配送地点" :label-width="formLabelWidth">
					<el-input v-model="order.address" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="货物量" :label-width="formLabelWidth">
					<el-input v-model="order.weight" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="最早到达时间" :label-width="formLabelWidth">
					<el-input v-model="order.earlyTime" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="最晚到达时间" :label-width="formLabelWidth">
					<el-input v-model="order.lastTime" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="收货人" :label-width="formLabelWidth">
					<el-input v-model="order.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话号码" :label-width="formLabelWidth">
					<el-input v-model="order.phone" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="updateOrder">修 改</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	export default {
		data(){
			return{
				orderNum:'',
				filterInput:"",
				//新增界面数据
				addorder:{
					addaddress: '',
					addweight: '',
					addearlyTime: '',
					addlastTime: '',
					addname: '',
					addphone: ''
				},
				//编辑界面数据
				order:{
					address: '',
					weight: '',
					earlyTime: '',
					lastTime: '',
					name: '',
					phone: ''
				},
				orders:[],
				addFormVisible: false,//新增界面是否显示
				editFormVisible: false,//修改界面是否显示
				formLabelWidth: '120px'
			}
		},
		methods: {
			getOrderNum(){
				this.$http.get("http://localhost:3000/orders").then(function (response) {
					console.log(response);
					this.orderNum = response.body.length;
				})
			},
			filterBy(orders,value){
				return orders.filter(function (orders) {
					return orders.address.match(value);
				})
			},
			fetchOrders() {
				this.$http.get("http://localhost:3000/orders").then(function (response) {
					console.log(response);
					this.orders = response.body;
				})
			},
			//添加操作函数
			showAddForm() {
				this.addFormVisible = true
			},
			addOrder(e){
				if(!this.addorder.address ||!this.addorder.earlyTime ||!this.addorder.lastTime ||!this.addorder.name ||!this.addorder.weight ||!this.addorder.phone ){
					this.$notify({
						title: '消息提示',
						message: '请填写完整信息',
						type: 'error'
					});
				}else{
					let newOrder = {
						address: this.addorder.address,
						weight: this.addorder.weight,
						earlyTime: this.addorder.earlyTime,
						lastTime: this.addorder.lastTime,
						name: this.addorder.name,
						phone: this.addorder.phone
					}
					this.$http.post("http://localhost:3000/orders",newOrder).then(function (response) {
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
				this.fetchOrders();
				this.getOrderNum();
				// this.getUserNum();
			},
			//编辑操作函数
			showEditForm(id) {
				this.id = id;
				this.editFormVisible = true;
				this.$http.get("http://localhost:3000/orders/"+id).then(function (response) {
					this.order = response.body;
				});
			},
			updateOrder(id){
				if(!this.order.address ||!this.order.earlyTime ||!this.order.lastTime ||!this.order.name ||!this.order.weight ||!this.order.phone ){
					this.$notify({
						title: '消息提示',
						message: '请填写完整信息',
						type: 'error'
					});
				}else{
					let updateOrder = {
						address: this.order.address,
						weight: this.order.weight,
						earlyTime: this.order.earlyTime,
						lastTime: this.order.lastTime,
						name: this.order.name,
						phone: this.order.phone
					}
					this.$http.put("http://localhost:3000/orders/"+this.id,updateOrder).then(function () {
						this.fetchOrders();
						this.getOrderNum();
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
			deleteOrder(id){
				this.$http.delete("http://localhost:3000/orders/"+id).then(function () {
					this.fetchOrders();
					this.getOrderNum();
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
			this.getOrderNum();
			this.fetchOrders();
			// this.getUserNum();
		}
	}
</script>

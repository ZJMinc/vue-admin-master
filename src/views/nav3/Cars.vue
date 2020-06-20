<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input placeholder="请输入车牌查询" v-model="filterInput"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="showAddForm">新增</el-button>
				</el-form-item>
				<el-form-item>
					当前车辆数量为:{{carNum}}
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="filterBy(cars,filterInput)" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="type" label="类型" width="100" sortable>
			</el-table-column>
			<el-table-column prop="numPlate" label="车牌" width="120" sortable>
			</el-table-column>
			<el-table-column prop="maxMileage" label="最大里程（KM）" width="180" sortable>
			</el-table-column>
			<el-table-column prop="maxSpeed" label="最大时速（KM/h）" width="180" sortable>
			</el-table-column>
			<el-table-column prop="load" label="载重（吨）" min-width="180" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="props">
					<el-button size="small" @click="showEditForm(props.row.id)">编辑</el-button>
					<el-button type="danger" size="small" @click="deleteCar(props.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--新增界面-->
		<el-dialog title="新增车辆" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form v-on:submit="addCar">
				<el-form-item label="车辆类型" :label-width="formLabelWidth">
					<el-select v-model="addcar.type" placeholder="请选择车辆大小">
						<el-option label="大" value="大"></el-option>
						<el-option label="中" value="中"></el-option>
						<el-option label="小" value="小"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="车牌" :label-width="formLabelWidth">
					<el-input v-model="addcar.numPlate" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="最大里程" :label-width="formLabelWidth">
					<el-input v-model="addcar.maxMileage" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="最大时速" :label-width="formLabelWidth">
					<el-input v-model="addcar.maxSpeed" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="载重" :label-width="formLabelWidth">
					<el-input v-model="addcar.load" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addCar">确 定</el-button>
			</div>
		</el-dialog>
		<!--编辑界面-->
		<el-dialog title="修改车辆信息：" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form v-on:submit="updateCar">
				<el-form-item label="车辆类型" :label-width="formLabelWidth">
					<el-select v-model="car.type" placeholder="请选择车辆大小">
						<el-option label="大" value="大"></el-option>
						<el-option label="中" value="中"></el-option>
						<el-option label="小" value="小"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="车牌" :label-width="formLabelWidth">
					<el-input v-model="car.numPlate" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="最大里程" :label-width="formLabelWidth">
					<el-input v-model="car.maxMileage" :min="0" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="最大时速" :label-width="formLabelWidth">
					<el-input v-model="car.maxSpeed" :min="0" :max="200" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="载重" :label-width="formLabelWidth">
					<el-input v-model="car.load" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="updateCar">修 改</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	export default {
		data(){
			return{
				carNum:'',
				filterInput:"",
				//新增界面数据
				addcar:{
					addtype: '',
					addnumPlate: '',
					addmaxMileage: '',
					addmaxSpeed: '',
					addload: ''
				},
				numPlate: [],
				//编辑界面数据
				car:{
					type: '',
					numPlate: '',
					maxMileage: '',
					maxSpeed: '',
					load: ''
				},
				cars:[],
				addFormVisible: false,//新增界面是否显示
				editFormVisible: false,//修改界面是否显示
				formLabelWidth: '120px'
			}
		},
		methods: {
			getCarNum(){
				this.$http.get("http://localhost:3000/cars").then(function (response) {
					console.log(response);
					this.carNum = response.body.length;
				})
			},
			filterBy(cars,value){
				return cars.filter(function (car) {
					return car.numPlate.match(value);
				})
			},
			fetchCars() {
				this.$http.get("http://localhost:3000/cars").then(function (response) {
					console.log(response);
					this.cars = response.body;
				})
			},
			//添加操作函数
			showAddForm() {
				this.addFormVisible = true
			},
			addCar(e){
				if(!this.addcar.type ||!this.addcar.numPlate ||!this.addcar.maxMileage ||!this.addcar.maxSpeed ||!this.addcar.load){
					this.$notify({
						title: '消息提示',
						message: '请填写完整信息',
						type: 'error'
					});
				}else{
					let newCar = {
						type: this.addcar.type,
						numPlate: this.addcar.numPlate,
						maxMileage: this.addcar.maxMileage,
						maxSpeed: this.addcar.maxSpeed,
						load: this.addcar.load
					}
					this.$http.post("http://localhost:3000/cars",newCar).then(function (response) {
					})
					let newNumPlate = {
						numPlate: this.addcar.numPlate,
					}
					this.$http.post("http://localhost:3000/numPlates",newNumPlate).then(function (response) {
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
				this.fetchCars();
				this.getCarNum();
			},
			//编辑操作函数
			showEditForm(id) {
				this.id = id;
				this.editFormVisible = true;
				this.$http.get("http://localhost:3000/cars/"+id).then(function (response) {
					this.car = response.body;
				});
			},
			updateCar(id){
				if(!this.car.type ||!this.car.numPlate ||!this.car.maxMileage ||!this.car.maxSpeed ||!this.car.load){
					this.$notify({
						title: '消息提示',
						message: '请填写完整信息',
						type: 'error'
					});
				}else{
					let updateCar = {
						type: this.car.type,
						numPlate: this.car.numPlate,
						maxMileage: this.car.maxMileage,
						maxSpeed: this.car.maxSpeed,
						load: this.car.load
					}
					this.$http.put("http://localhost:3000/cars/"+this.id,updateCar).then(function () {
						this.fetchCars();
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
			deleteCar(id){
				// var num;
				//  //获取需要删除的车牌信息
				// this.$http.get("http://localhost:3000/cars/"+id).then(function (response) {
				// 	this.car = response.body;
				// 	num = this.car.numPlate;
				// 	alert("删除车牌为"+num+"的汽车");
				// });
				// this.$http.get("http:localhost:3000/numPlates?numPlate="+num).then(function (response) {
				// 	//返回信息是数组
				// 	let num1 = new Array();
				// 	num1 = response.body;
				// 	alert(num1)
				// });

				//删除该项信息
				this.$http.delete("http://localhost:3000/cars/"+id).then(function () {
					this.fetchCars();
					this.getCarNum();
				});
				this.$notify({
					title: '消息提示',
					message: '删除成功',
					type: 'success'
				});
			},
		},
		created(){
			this.fetchCars();
			this.getCarNum();
		}
	}
</script>

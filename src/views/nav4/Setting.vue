<template>
    <section>
        <el-form ref="form" :model="form" label-width="110px">
            <p>配送中心设置</p>
            <el-form-item label="地区选择">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="value1" placeholder="请选择">
                    <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="中心配送点设置">
                <el-select v-model="value2" placeholder="请选择">
                    <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="预计人员总量">
                <el-input style="width: 100px"></el-input>
            </el-form-item>
            <el-form-item label="可容纳车总量">
                <el-input style="width: 100px"></el-input>
            </el-form-item>
            <el-form-item label="可处理货物总量">
                <el-input style="width: 100px"></el-input>
            </el-form-item>
            <p>负责人信息</p>
            <el-form-item label="负责人姓名">
                <el-input style="width: 160px"></el-input>
            </el-form-item>
            <el-form-item label="负责人电话">
                <el-input style="width: 160px"></el-input>
            </el-form-item>
            <el-form-item label="负责人邮箱">
                <el-input style="width: 160px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit">提交审核</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
    export default {
        name: "Setting",
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '上海'
                }, {
                    value: '选项2',
                    label: '浙江'
                }, {
                    value: '选项3',
                    label: '江苏'
                }, {
                    value: '选项4',
                    label: '北京'
                }, {
                    value: '选项5',
                    label: '广东'
                }],
                value: '选项3',

                options1: [{
                    value: '选项1',
                    label: '常州'
                }, {
                    value: '选项2',
                    label: '苏州'
                }, {
                    value: '选项3',
                    label: '无锡'
                }, {
                    value: '选项4',
                    label: '扬州'
                }, {
                    value: '选项5',
                    label: '南京'
                }],
                value1: '选项1',

                options2: [{
                    value: '选项1',
                    label: '红星美凯龙'
                }, {
                    value: '选项2',
                    label: '百货大楼'
                }, {
                    value: '选项3',
                    label: '大润发'
                }],
                value2: '选项1'
            }
        },
        methods: {
            submit(){
                this.$notify({
                    title: '消息提示',
                    message: '已提交',
                    type: 'success'
                });
            }
        }
    }
</script>

<style scoped>

</style>

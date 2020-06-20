<template>
    <section>
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true">
                    <el-form-item>
                        <el-input placeholder="请输入日期查询" v-model="filterInput"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>

        <el-table
                :data="filterBy(planData,filterInput)"
                border
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="配送员"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="途径地点">
            </el-table-column>
            <el-table-column
                    prop="performance"
                    label="完成情况">
            </el-table-column>
            <el-table-column
                    prop="later"
                    label="迟到情况">
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                filterInput: '',
                planData: []
            }
        },
        methods:{
            filterBy(planData,value){
                return planData.filter(function (planData) {
                    return planData.date.match(value);
                })
            },
            fetchPlanData() {
                this.$http.get("http://localhost:3000/plandata").then(function (response) {
                    console.log(response);
                    this.planData = response.body;
                })
            }
        },
        created() {
            this.fetchPlanData();
        }
    }
</script>

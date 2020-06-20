<template>
    <section>
        <el-form ref="form" :model="form" label-width="80px" style="padding: 10px;width:300px;border-radius: 30px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
            <p>基本设置</p>
            <el-form-item label="邮箱">
                <el-input style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input style="width: 180px"></el-input>
            </el-form-item>
            <p>密码设置</p>
            <el-form-item label="当前密码">
                <el-input style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="重制密码">
                <el-input style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit" style="width: 120px">提交</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
    export default {
        name: "Safesetting",
        methods:{
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

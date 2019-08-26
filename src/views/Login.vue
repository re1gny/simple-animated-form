<template>
  <div class="login">
    <div class="login__canvas" :style="{'width': canvasWidth}">
        <login-canvas/>
    </div>
    <div class="login__form" :style="{'width': formWidth}">
        <login-form/>
    </div>
  </div>
</template>

<script>
import LoginCanvas from '@/components/LoginCanvas.vue'
import LoginForm from '@/components/LoginForm.vue'

export default {
    name: 'login',
    components: {
        LoginCanvas,
        LoginForm
    },
    computed: {
        canvasWidth () {
            return this.$store.getters['loginState/getCanvasWidth']
        },
        formWidth () {
            return this.$store.getters['loginState/getFormWidth']
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    flex-wrap: nowrap;
    height: 100%;
    overflow: hidden;
}

.login__canvas {
    height: 100%;
    transition: .4s;
    z-index: 1000;
}

.login__form {
    height: 100%;
    transition: .4s;
    z-index: 1000;
}
</style>

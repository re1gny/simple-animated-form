<template>
    <div class="form-button" @click="$emit('btnClick')">
        {{value}}
    </div>
</template>

<script>
import EventBus from '@/EventBus.js'

export default {
    name: 'formButton',
    props: [
        'value',
        'onClick'
    ],
    data () {
        return {
            
        }
    },
    methods: {
        
    },
    mounted () {

    },
    beforeDestroy () {

    }
}
</script>

<style lang="scss" scoped>
.form-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    border-radius: 30px;
    background-color: #42b983;
    color: #ffffff;
    transition: .2s;
    cursor: pointer;

    &:hover {
        background-color: darken($color: #42b983, $amount: 10%);
    }
}
</style>

<template>
    <div class="form-input">
        <!-- <div :class="{'form-input__blur-area': true, 'form-input__blur-area_selected': selected}"></div> -->
        <div :class="{'form-input__input-wrapper': true, 'form-input__input-wrapper_selected': selected}">
            <div class="form-input__label" v-show="selected">
                {{label}}
            </div>   
            <input type="text" ref='form-input__input' :placeholder="selected ? '' : label" @focus="select" @blur="unselect">
            <div class="form-input__placeholder" v-show="selected">
                {{placeholder}}
            </div>
        </div>
    </div>
</template>

<script>
import EventBus from '@/EventBus.js'

export default {
    name: 'formInput',
    props: [
        'label',
        'placeholder'
    ],
    data () {
        return {
            selected: false
        }
    },
    methods: {
        select () {
            EventBus.$emit('unselect-all')
            this.selected = true
        },
        unselect () {
            this.selected = false
        }
    },
    mounted () {
        EventBus.$on('unselect-all', () => this.selected = false)
    },
    beforeDestroy () {
        EventBus.$off('unselect-all')
    }
}
</script>

<style lang="scss" scoped>
.form-input {
    .form-input__blur-area {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        transition: .4s;
        z-index: -1;

        &.form-input__blur-area_selected {
            filter: blur(10px);
            z-index: 1001;
        }
    }

    .form-input__input-wrapper {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 0 14%;
        width: 100%;
        transition: padding .4s cubic-bezier(0.165, 0.84, 0.44, 1), background-color .4s;
        box-sizing: border-box;
        z-index: 1002;
        
        &.form-input__input-wrapper_selected {
            background-color: #42b983;
            padding: 30px 10%;

            input {
                border-color: #ffffff;
                color: #ffffff;
            }

            input::placeholder {
                color: #ffffff;
            }

            .form-input__placeholder {
                opacity: 0.8;
            }

            .form-input__label {
                opacity: 1;
            }
        }

        &.form-input__input-wrapper_error {
            background-color: #ff4949;

            input {
                border-color: #ff4949;
            }
        }
    }
    input {
        font: inherit;
        font-size: 16px;
        width: 100%;
        height: 30px;
        outline: none;
        border: none;
        border-bottom: 1px solid #42b983;
        background-color: transparent;
    }

    .form-input__placeholder, .form-input__label {
        width: 100%;
        opacity: 0;
        color: #ffffff;
        font-size: 14px;
        transition: .4s;
    }

    .form-input__placeholder {
        margin-top: 10px;
    }

    .form-input__label {
        font-size: 16px;
        margin-bottom: 10px;
    }
}
</style>

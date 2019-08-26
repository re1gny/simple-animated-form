<template>
    <div class="login-form">
        <div class="login-form__background-block">
            <div class="top-right-square"></div>
            <div class="bottom-left-square"></div>
        </div>
        <div class="login-form__title">
            <h1>Авторизация</h1>
            <p>Войдите в свою учетную запись</p>
        </div>
        <div class="login-form__form-group">
            <form-input 
                class="login-form__input" 
                label='Логин'
                placeholder='Введите свой логин'
            />
            <form-input 
                class="login-form__input" 
                label='Пароль'
                placeholder='Введите свой пароль'
            />
            <div class="login-form__buttons">
                <form-button value='Отмена' @btnClick='hideLoginForm'/>
                <form-button value='Продолжить' @btnClick='onContinue'/>
            </div>
        </div>
    </div>
</template>

<script>
import FormInput from '@/components/FormInput.vue'
import FormButton from '@/components/FormButton.vue'

export default {
    name: 'loginForm',
    components: {
        FormInput,
        FormButton
    },
    methods: {
        hideLoginForm () {
            this.$store.dispatch('loginState/changeWidth', {
                canvasWidth: '100%',
                formWidth: '0%',
                formHidden: true
            })
        },
        onContinue () {

        }
    }
}
</script>

<style lang="scss" scoped>
.login-form {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 20px 0;
    width: 100%;
    height: 100%;
    border-left: 6px solid #42b983;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #ffffff;

    .login-form__background-block {
        .top-right-square {
            position: absolute;
            width: 400px;
            height: 400px;
            top: -150px;
            right: -230px;
            transform: rotate(30deg);
            background-color: #f19e36;
            border-radius: 40px;
            z-index: 1;
        }

        .bottom-left-square {
            position: absolute;
            width: 400px;
            height: 400px;
            bottom: -70px;
            left: -290px;
            transform: rotate(60deg);
            background-color: #36f1d7;
            border-radius: 40px;
            z-index: 1;
        }
    }

    .login-form__title {
        padding: 0 14%;
        min-width: 250px;
        margin-bottom: 100px;
        z-index: 10;

        p {
            opacity: 0.8;
        }
    }

    .login-form__subtitle {
        margin-bottom: 100px;
    }

    .login-form__form-group {
        z-index: 10;
    }

    .login-form__input {
        margin-bottom: 40px;
        z-index: 10;
    }

    .login-form__buttons {
        display: flex;
        justify-content: flex-end;
        padding: 0 14%;
        margin-top: 80px;
        z-index: 10;

        .form-button:first-child {
            margin-right: 10px;
        }
    }
}
</style>

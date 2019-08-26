<template>
    <div class="canvas__wrapper">
        <div class="login-canvas">
            <form-button :class="{'login-canvas__login-btn': true, 'login-canvas__login-btn_hidden': !formHidden}" value='Войти' @btnClick='showLoginForm'/>
        </div>
        <canvas id='canvas'></canvas>
    </div>
</template>

<script>
import FormButton from '@/components/FormButton.vue'

export default {
    name: 'loginCanvas',
    components: {
        FormButton
    },
    methods: {
        showLoginForm () {
            this.$store.dispatch('loginState/changeWidth', {
                canvasWidth: '60%',
                formWidth: '40%',
                formHidden: false
            })
        },
        handleCanvas () {
            let canvas = document.getElementById('canvas');
            let context = canvas.getContext('2d');

            canvas.width = document.getElementsByClassName('login-canvas')[0].clientWidth;
            canvas.height = window.innerHeight;

            let particlesAmount = 100;
            let maxDistance = 150;

            context.fillStyle = "#f19e36";
            context.strokeStyle = "rgba(54, 241, 215, 1)";
            context.lineWidth = 0.5;

            let particles = [];

            function Particle(posX, posY, radius) {
                // Public props
                this.posX = posX;
                this.posY = posY;
                this.radius = radius;

                // Private props
                let stepX = Math.random() * 2;
                let stepY = Math.random() * 2;

                // Private methods
                let checkBorders = () => {
                    if (this.posX >= canvas.width || this.posX <= 0)
                    stepX *= -1;

                    if (this.posY <= 0 || this.posY >= canvas.height)
                    stepY *= -1;
                };

                // Public methods
                this.refreshCoords = () => {
                    checkBorders();

                    this.posX += stepX;
                    this.posY += stepY;
                }
            }

            function getDistance(particle_1, particle_2) {
                return Math.sqrt(
                    Math.pow(particle_1.posX - particle_2.posX, 2) +
                    Math.pow(particle_1.posY - particle_2.posY, 2)
                );
            }

            function initParticles() {
                for (let i = 0; i < particlesAmount; i++) {
                    let dotX = Math.random() * canvas.width;
                    let dotY = Math.random() * canvas.height;
                    let radius = (Math.random() * 3 + 3);

                    particles.push(new Particle(dotX, dotY, radius));
                }
            }

            function drawParticles() {
                context.clearRect(0, 0, canvas.width, canvas.height);

                for (let i = 0; i < particles.length; i++) {
                    for (let j = i; j < particles.length; j++) {
                    let distance = getDistance(particles[i], particles[j]);

                    if (distance < maxDistance) {
                        let opacity = 1 - distance / maxDistance;

                        if (opacity > 0) {
                        context.strokeStyle = `rgba(54, 241, 215, ${opacity})`;

                        context.beginPath();
                        context.moveTo(particles[i].posX, particles[i].posY);
                        context.lineTo(particles[j].posX, particles[j].posY);
                        context.closePath();
                        context.stroke();
                        }
                    }
                    }
                }

                particles.forEach(particle => {
                    particle.refreshCoords();

                    context.beginPath();
                    context.arc(particle.posX, particle.posY, particle.radius, 0, 2 * Math.PI);
                    context.closePath();
                    context.fillStyle = "#f19e36";
                    context.fill();
                });

                requestAnimationFrame(() => {
                    canvas.width = document.getElementsByClassName('login-canvas')[0].clientWidth;
                    canvas.height = window.innerHeight;
                    drawParticles()
                });
            }

            initParticles();
            drawParticles();
        }
    },
    computed: {
        formHidden () {
            return this.$store.getters['loginState/getFormHidden']
        }
    },
    mounted () {
        this.handleCanvas()
    }
}
</script>

<style lang="scss" scoped>
.canvas__wrapper {
    height: 100%;

    .login-canvas {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    // height: 100%;
    background: linear-gradient(135deg, #fefcea, #f19e36);
    z-index: 1000;

    .login-canvas__login-btn {
        position: absolute;
        top: 30px;
        right: 30px;
        visibility: visible;
        opacity: 1;

        &.login-canvas__login-btn_hidden {
            visibility: hidden;
            opacity: 0;
        }
    }

    span {
        color: #42b983;
        font-size: 40px;
        font-weight: bold;
    }
}
}
</style>

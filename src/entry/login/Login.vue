<template>
  <div id="login" class="pos-login">
    <canvas height="100%" width="100%" style="background:#000;position: fixed; top: 0px; left: 0px; z-index: -1; opacity: 1;" id="canvas"></canvas>
    <div class="login-content">
        <div class="title">登 录</div>
        <div class="login-input">
            <div class="login-control">
                <input v-model="user" type="text" placeholder="用户名" />
            </div>
             <div  class="login-control">
                <input  v-model="pwd"  type="password" placeholder="密码" />
            </div>
        </div>
        <div class="login-btn">
            <button @click="login">登 录</button>
        </div>
    </div>
  </div>
</template>
<script>
import queryString from '../../utils/queryString.js'

export default {
    name: 'Login',
    components: {

    },
    data() {
        return {
            user: '',
            pwd: ''
        }
    },
    methods: {
        login(){
            console.log(this.user,this.pwd)
            let returnUrl = queryString.getQueryString('returnUrl')
            if (!returnUrl){
                returnUrl = 'index.html/#'
            }

            location.href  = returnUrl
        }
    },

    computed: {


    },
    mounted() {
        let canvas,
            ctx,
            width,
            height,
            size,
            lines,
            tick;

        function line() {
            this.path = [];
            this.speed = rand(10, 20);
            this.count = randInt(10, 30);
            this.x = width / 2, +1;
            this.y = height / 2 + 1;
            this.target = {
                x: width / 2,
                y: height / 2
            };
            this.dist = 0;
            this.angle = 0;
            this.hue = tick / 5;
            this.life = 1;
            this.updateAngle();
            this.updateDist();
        }

        line.prototype.step = function (i) {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;

            this.updateDist();

            if (this.dist < this.speed) {
                this.x = this.target.x;
                this.y = this.target.y;
                this.changeTarget();
            }

            this.path.push({
                x: this.x,
                y: this.y
            });
            if (this.path.length > this.count) {
                this.path.shift();
            }

            this.life -= 0.001;

            if (this.life <= 0) {
                this.path = null;
                lines.splice(i, 1);
            }
        };

        line.prototype.updateDist = function () {
            let dx = this.target.x - this.x,
                dy = this.target.y - this.y;
            this.dist = Math.sqrt(dx * dx + dy * dy);
        }

        line.prototype.updateAngle = function () {
            let dx = this.target.x - this.x,
                dy = this.target.y - this.y;
            this.angle = Math.atan2(dy, dx);
        }

        line.prototype.changeTarget = function () {
            let randStart = randInt(0, 3);
            switch (randStart) {
            case 0: // up
                this.target.y = this.y - size;
                break;
            case 1: // right
                this.target.x = this.x + size;
                break;
            case 2: // down
                this.target.y = this.y + size;
                break;
            case 3: // left
                this.target.x = this.x - size;
            }
            this.updateAngle();
        };

        line.prototype.draw = function () {
            ctx.beginPath();
            let rando = rand(0, 10);
            for (let j = 0, length = this.path.length; j < length; j++) {
                ctx[(j === 0) ? 'moveTo' : 'lineTo'](this.path[j].x + rand(-rando, rando), this.path[j].y + rand(-rando, rando));
            }
            ctx.strokeStyle = 'hsla(' + rand(this.hue, this.hue + 30) + ', 80%, 55%, ' + (this.life / 3) + ')';
            ctx.lineWidth = rand(0.1, 2);
            ctx.stroke();
        };

        function rand(min, max) {
            return Math.random() * (max - min) + min;
        }

        function randInt(min, max) {
            return Math.floor(min + Math.random() * (max - min + 1));
        }

        function init() {
            canvas = document.getElementById('canvas');
            ctx = canvas.getContext('2d');
            size = 30;
            lines = [];
            reset();
            loop();
        }

        function reset() {
            width = Math.ceil(window.innerWidth / 2) * 2;
            height = Math.ceil(window.innerHeight / 2) * 2;
            tick = 0;

            lines.length = 0;
            canvas.width = width;
            canvas.height = height;
        }

        function create() {
            if (tick % 10 === 0) {
                lines.push(new line());
            }
        }

        function step() {
            let i = lines.length;
            while (i--) {
                lines[i].step(i);
            }
        }

        function clear() {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'hsla(0, 0%, 0%, 0.1';
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = 'lighter';
        }

        function draw() {
            ctx.save();
            ctx.translate(width / 2, height / 2);
            ctx.rotate(tick * 0.001);
            let scale = 0.8 + Math.cos(tick * 0.02) * 0.2;
            ctx.scale(scale, scale);
            ctx.translate(-width / 2, -height / 2);
            let i = lines.length;
            while (i--) {
                lines[i].draw(i);
            }
            ctx.restore();
        }

        function loop() {
            requestAnimationFrame(loop);
            create();
            step();
            clear();
            draw();
            tick++;
        }

        function onresize() {
            reset();
        }

        window.addEventListener('resize', onresize);

        init();

    },
};
</script>
<style lang="scss">
html,body{
    height: 100%;
    width: 100%;
}
.pos-login{
    height: 100%;
    width: 100%;
}
.login-content{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 400px;
    background: rgba(61, 146, 243, .1);
    transform: translate(-50%,-50%);
    border-radius: 10px;
    .title{
        text-align: center;
        margin: 50px 0 30px;
        color: #3394f2;
        font-size: 24px;
    }
    .login-control{
        margin-bottom: 30px;
        text-align: center;
        input{
            border: 1px solid #aaa;
            background: transparent;
            color: #fff;
            outline: none;
            border-radius: 3px;
            padding: 8px 15px;
            width: 80%;
        }
    }
    .login-btn{
        margin-top: 105px;
        text-align: center;
        cursor: pointer;
        button{
            background: #3394f2;
            border: none;
            outline: none;
            padding: 10px 15px;
            border-radius: 3px;
            color: #fff;
            cursor: pointer;
            width: 432px;
            &:hover{
                background: #51a2f3;
            }
        }
    }
}
</style>

<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <div class='main-content'>
      <div class="wheels">
        <div class='wheel' v-for="index in 12">
        </div>
      </div>

      <div class='contact-info'>
        <a href='mailto:steve@distantfutu.re'>steve@distantfutu.re</a>San Francisco, CA
      </div>
    </div>

  </div>
</v-dialog>
</template>

<script>
import {
  DialogTitleBar
} from 'stellar-js-utils'

export default {
  props: ['ping', 'title'],
  components: {
    'dialog-titlebar': DialogTitleBar
  },
  data() {
    return {
      errorMessage: '',
      visible: false,
      items: []
    }
  },
  watch: {
    ping: function () {
      this.visible = true
    }
  },
  methods: {
    // sdf
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/styles.scss';

.main-container {
    @include standard-dialog-contents();

    .main-content {
        position: relative;
        height: 200px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        color: white;
        text-align: right;
        font-weight: bold;
        font-size: 1em;
        // border: solid 24px rgb(55,55,55);

        .contact-info {
            z-index: 1;
            display: flex;
            justify-content: center;
            flex-direction: column;
            a {
                text-decoration: none;
                color: white;
                font-size: 3em;
                text-shadow: 0 0 20px black;
            }
        }

        .wheels {
            overflow: hidden;
            height: 500px;
            width: 1000px;
            position: absolute;
            top: 0;
            bottom: 0;

            .wheel {
                opacity: 0.2;
                display: block;
                height: 500px;
                width: 1000px;
                border-radius: 50%;
                /* color wheels */
                position: absolute;
            }
        }
        .wheels .wheel:nth-child(1) {
            background: linear-gradient(#ff8000, #cc6600);
            animation: spin 5s infinite;
            animation-delay: 0.0833333333s;
        }
        .wheels .wheel:nth-child(2) {
            background: linear-gradient(yellow, #cccc00);
            animation: spin 5s infinite;
            animation-delay: 0.1666666667s;
        }
        .wheels .wheel:nth-child(3) {
            background: linear-gradient(#80ff00, #66cc00);
            animation: spin 5s infinite;
            animation-delay: 0.25s;
        }
        .wheels .wheel:nth-child(4) {
            background: linear-gradient(lime, #00cc00);
            animation: spin 5s infinite;
            animation-delay: 0.3333333333s;
        }
        .wheels .wheel:nth-child(5) {
            background: linear-gradient(#00ff80, #00cc66);
            animation: spin 5s infinite;
            animation-delay: 0.4166666667s;
        }
        .wheels .wheel:nth-child(6) {
            background: linear-gradient(cyan, #00cccc);
            animation: spin 5s infinite;
            animation-delay: 0.5s;
        }
        .wheels .wheel:nth-child(7) {
            background: linear-gradient(#0080ff, #0066cc);
            animation: spin 5s infinite;
            animation-delay: 0.5833333333s;
        }
        .wheels .wheel:nth-child(8) {
            background: linear-gradient(blue, #0000cc);
            animation: spin 5s infinite;
            animation-delay: 0.6666666667s;
        }
        .wheels .wheel:nth-child(9) {
            background: linear-gradient(#8000ff, #6600cc);
            animation: spin 5s infinite;
            animation-delay: 0.75s;
        }
        .wheels .wheel:nth-child(10) {
            background: linear-gradient(magenta, #cc00cc);
            animation: spin 5s infinite;
            animation-delay: 0.8333333333s;
        }
        .wheels .wheel:nth-child(11) {
            background: linear-gradient(#ff0080, #cc0066);
            animation: spin 5s infinite;
            animation-delay: 0.9166666667s;
        }
        .wheels .wheel:nth-child(12) {
            background: linear-gradient(red, #cc0000);
            animation: spin 5s infinite;
            animation-delay: 1s;
        }
        .wheels .wheel:nth-child(13) {
            background: linear-gradient(#ff8000, #cc6600);
            animation: spin 5s infinite;
            animation-delay: 1.0833333333s;
        }

        @keyframes spin {
            0% {
                transform: rotateX(0deg) scale(2);
            }
            25% {
                transform: rotateX(90deg);
            }
            50% {
                transform: rotateY(180deg) scale(4);
            }
            75% {
                transform: rotateX(270deg);
            }
            100% {
                transform: rotateY(360deg) scale(2);
            }
        }
    }
}
</style>

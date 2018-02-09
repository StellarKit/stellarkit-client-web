<template>
<v-dialog lazy v-model='visible' scrollable @keydown.esc="visible = false" max-width="600">
  <div class='main-container'>
    <dialog-titlebar :title=title v-on:close='visible = false' />

    <!-- added the v-if visible here to kill the animation when dialog closed -->
    <div v-if='visible' class='main-content'>
      <div id="rainbow"></div>

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
import {
  TimelineMax,
  Power0
} from 'gsap'
import $ from 'jquery'

export default {
  props: ['ping', 'title'],
  components: {
    'dialog-titlebar': DialogTitleBar
  },
  data() {
    return {
      errorMessage: '',
      visible: false,
      items: [],
      rainbowTimeline: null,
      flasher: null
    }
  },
  watch: {
    ping: function () {
      this.visible = true

      this.$nextTick(() => {
        this.animate()
      })
    }
  },
  methods: {
    animate() {
      const rainbowElement = $('#rainbow')
      const duration = 3

      this.rainbowTimeline = new TimelineMax({
          repeat: -1,
          repeatdelay: 0,
          yoyo: false
        })

        .set(rainbowElement, {
          boxShadow: '0 0 0 2vmax #800080, 0 0 0 4vmax #DC143C, 0 0 0 6vmax #FF0000, 0 0 0 8vmax #FF4500, 0 0 0 10vmax #FF6347, 0 0 0 12vmax #FFD700, 0 0 0 14vmax #FFFF00, 0 0 0 16vmax #9ACD32, 0 0 0 18vmax #40E0D0, 0 0 0 20vmax #4169E1, 0 0 0 22vmax #7B68EE, 0 0 0 24vmax #BA55D3, 0 0 0 26vmax #800080, 0 0 0 28vmax #DC143C, 0 0 0 30vmax #FF0000, 0 0 0 32vmax #FF4500, 0 0 0 34vmax #FF6347, 0 0 0 36vmax #FFD700, 0 0 0 38vmax #FFFF00, 0 0 0 40vmax #9ACD32, 0 0 0 42vmax #40E0D0, 0 0 0 44vmax #4169E1, 0 0 0 46vmax #7B68EE, 0 0 0 48vmax #BA55D3, 0 0 0 50vmax #9400D3, 0 0 0 52vmax #800080, 0 0 0 54vmax #DC143C, 0 0 0 56vmax #FF0000, 0 0 0 58vmax #FF4500, 0 0 0 60vmax #FF6347, 0 0 0 62vmax #FFD700, 0 0 0 64vmax #FFFF00, 0 0 0 66vmax #9ACD32, 0 0 0 68vmax #40E0D0, 0 0 0 70vmax #4169E1, 0 0 0 72vmax #7B68EE, 0 0 0 74vmax #BA55D3, 0 0 0 76vmax #9400D3, 0 0 0 78vmax #800080, 0 0 0 80vmax #DC143C, 0 0 0 82vmax #FF0000, 0 0 0 84vmax #FF4500, 0 0 0 86vmax #FF6347, 0 0 0 88vmax #FFD700, 0 0 0 90vmax #FFFF00'
        })

        .to(rainbowElement, duration, {
          boxShadow: '0 0 0 2vmax #4169E1, 0 0 0 4vmax #7B68EE, 0 0 0 6vmax #BA55D3, 0 0 0 8vmax #800080, 0 0 0 10vmax #DC143C, 0 0 0 12vmax #FF0000, 0 0 0 14vmax #FF4500, 0 0 0 16vmax #FF6347, 0 0 0 18vmax #FFD700, 0 0 0 20vmax #FFFF00, 0 0 0 22vmax #9ACD32, 0 0 0 24vmax #40E0D0, 0 0 0 26vmax #4169E1, 0 0 0 28vmax #7B68EE, 0 0 0 30vmax #BA55D3, 0 0 0 32vmax #9400D3, 0 0 0 34vmax #800080, 0 0 0 36vmax #DC143C, 0 0 0 38vmax #FF0000, 0 0 0 40vmax #FF4500, 0 0 0 42vmax #FF6347, 0 0 0 44vmax #FFD700, 0 0 0 46vmax #FFFF00, 0 0 0 48vmax #9ACD32, 0 0 0 50vmax #40E0D0, 0 0 0 52vmax #4169E1, 0 0 0 54vmax #7B68EE, 0 0 0 56vmax #BA55D3, 0 0 0 58vmax #9400D3, 0 0 0 60vmax #800080, 0 0 0 62vmax #DC143C, 0 0 0 64vmax #FF0000, 0 0 0 66vmax #FF4500, 0 0 0 68vmax #FF6347, 0 0 0 70vmax #FFD700, 0 0 0 72vmax #FFFF00, 0 0 0 74vmax #9ACD32, 0 0 0 76vmax #40E0D0, 0 0 0 78vmax #4169E1, 0 0 0 80vmax #7B68EE, 0 0 0 82vmax #BA55D3, 0 0 0 84vmax #9400D3, 0 0 0 86vmax #800080, 0 0 0 88vmax #DC143C, 0 0 0 90vmax #FF0000',
          ease: Power0.easeNone
        }, '+=0')
        .to(rainbowElement, duration, {
          boxShadow: '0 0 0 2vmax #FFFF00, 0 0 0 4vmax #9ACD32, 0 0 0 6vmax #40E0D0, 0 0 0 8vmax #4169E1, 0 0 0 10vmax #7B68EE, 0 0 0 12vmax #BA55D3, 0 0 0 14vmax #800080, 0 0 0 16vmax #DC143C, 0 0 0 18vmax #FF0000, 0 0 0 20vmax #FF4500, 0 0 0 22vmax #FF6347, 0 0 0 24vmax #FFD700, 0 0 0 26vmax #FFFF00, 0 0 0 28vmax #9ACD32, 0 0 0 30vmax #40E0D0, 0 0 0 32vmax #4169E1, 0 0 0 34vmax #7B68EE, 0 0 0 36vmax #BA55D3, 0 0 0 38vmax #9400D3, 0 0 0 40vmax #800080, 0 0 0 42vmax #DC143C, 0 0 0 44vmax #FF0000, 0 0 0 46vmax #FF4500, 0 0 0 48vmax #FF6347, 0 0 0 50vmax #FFD700, 0 0 0 52vmax #FFFF00, 0 0 0 54vmax #9ACD32, 0 0 0 56vmax #40E0D0, 0 0 0 58vmax #4169E1, 0 0 0 60vmax #7B68EE, 0 0 0 62vmax #BA55D3, 0 0 0 64vmax #9400D3, 0 0 0 66vmax #800080, 0 0 0 68vmax #DC143C, 0 0 0 70vmax #FF0000, 0 0 0 72vmax #FF4500, 0 0 0 74vmax #FF6347, 0 0 0 76vmax #FFD700, 0 0 0 78vmax #FFFF00, 0 0 0 80vmax #9ACD32, 0 0 0 82vmax #40E0D0, 0 0 0 84vmax #4169E1, 0 0 0 86vmax #7B68EE, 0 0 0 88vmax #BA55D3, 0 0 0 90vmax #9400D3',
          ease: Power0.easeNone
        }, '+=0')
        .to(rainbowElement, duration, {
          boxShadow: '0 0 0 2vmax #FF4500, 0 0 0 4vmax #FF6347, 0 0 0 6vmax #FFD700, 0 0 0 8vmax #FFFF00, 0 0 0 10vmax #9ACD32, 0 0 0 12vmax #40E0D0, 0 0 0 14vmax #4169E1, 0 0 0 16vmax #7B68EE, 0 0 0 18vmax #BA55D3, 0 0 0 20vmax #800080, 0 0 0 22vmax #DC143C, 0 0 0 24vmax #FF0000, 0 0 0 26vmax #FF4500, 0 0 0 28vmax #FF6347, 0 0 0 30vmax #FFD700, 0 0 0 32vmax #FFFF00, 0 0 0 34vmax #9ACD32, 0 0 0 36vmax #40E0D0, 0 0 0 38vmax #4169E1, 0 0 0 40vmax #7B68EE, 0 0 0 42vmax #BA55D3, 0 0 0 44vmax #9400D3, 0 0 0 46vmax #800080, 0 0 0 48vmax #DC143C, 0 0 0 50vmax #FF0000, 0 0 0 52vmax #FF4500, 0 0 0 54vmax #FF6347, 0 0 0 56vmax #FFD700, 0 0 0 58vmax #FFFF00, 0 0 0 60vmax #9ACD32, 0 0 0 62vmax #40E0D0, 0 0 0 64vmax #4169E1, 0 0 0 66vmax #7B68EE, 0 0 0 68vmax #BA55D3, 0 0 0 70vmax #9400D3, 0 0 0 72vmax #800080, 0 0 0 74vmax #DC143C, 0 0 0 76vmax #FF0000, 0 0 0 78vmax #FF4500, 0 0 0 80vmax #FF6347, 0 0 0 82vmax #FFD700, 0 0 0 84vmax #FFFF00, 0 0 0 86vmax #9ACD32, 0 0 0 88vmax #40E0D0, 0 0 0 90vmax #4169E1',
          ease: Power0.easeNone
        }, '+=0')
        .to(rainbowElement, duration, {
          boxShadow: '0 0 0 2vmax #800080, 0 0 0 4vmax #DC143C, 0 0 0 6vmax #FF0000, 0 0 0 8vmax #FF4500, 0 0 0 10vmax #FF6347, 0 0 0 12vmax #FFD700, 0 0 0 14vmax #FFFF00, 0 0 0 16vmax #9ACD32, 0 0 0 18vmax #40E0D0, 0 0 0 20vmax #4169E1, 0 0 0 22vmax #7B68EE, 0 0 0 24vmax #BA55D3, 0 0 0 26vmax #800080, 0 0 0 28vmax #DC143C, 0 0 0 30vmax #FF0000, 0 0 0 32vmax #FF4500, 0 0 0 34vmax #FF6347, 0 0 0 36vmax #FFD700, 0 0 0 38vmax #FFFF00, 0 0 0 40vmax #9ACD32, 0 0 0 42vmax #40E0D0, 0 0 0 44vmax #4169E1, 0 0 0 46vmax #7B68EE, 0 0 0 48vmax #BA55D3, 0 0 0 50vmax #9400D3, 0 0 0 52vmax #800080, 0 0 0 54vmax #DC143C, 0 0 0 56vmax #FF0000, 0 0 0 58vmax #FF4500, 0 0 0 60vmax #FF6347, 0 0 0 62vmax #FFD700, 0 0 0 64vmax #FFFF00, 0 0 0 66vmax #9ACD32, 0 0 0 68vmax #40E0D0, 0 0 0 70vmax #4169E1, 0 0 0 72vmax #7B68EE, 0 0 0 74vmax #BA55D3, 0 0 0 76vmax #9400D3, 0 0 0 78vmax #800080, 0 0 0 80vmax #DC143C, 0 0 0 82vmax #FF0000, 0 0 0 84vmax #FF4500, 0 0 0 86vmax #FF6347, 0 0 0 88vmax #FFD700, 0 0 0 90vmax #FFFF00',
          ease: Power0.easeNone
        }, '+=0')

      this.flasher = new TimelineMax({
          repeat: -1,
          repeatdelay: 0,
          yoyo: false
        })
        .set(rainbowElement, {
          backgroundColor: 'rgb(255,255,255)'
        })
        .to(rainbowElement, 1, {
          backgroundColor: 'rgb(1,1,1)'
        }, '+=0')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/styles.scss';

#rainbow {
    position: absolute;
    left: 60%;
    top: 90%;
    width: 11vmax;
    height: 11vmax;
    background: white;
    border-radius: 50%;
}

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
                font-size: 1.52em;
                text-shadow: 0 0 20px black;
            }
        }
    }
}
</style>

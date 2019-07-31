<template>
  <v-dialog v-model="visible" scrollable @keydown.esc="visible = false" max-width="500">
    <div class="main-container">
      <dialog-titlebar :title="title" v-on:close="visible = false" />

      <!-- added the v-if visible here to kill the animation when dialog closed -->
      <div v-if="visible" class="main-content">
        <div id="rainbow"></div>

        <div class="contact-info">
          <a href="mailto:steve@distantfutu.re">steve@distantfutu.re</a>San Francisco, CA
        </div>
        <div class="initials-text">
          <a href="https://tripping.tech" target="_blank">LSD</a>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { DialogTitleBar } from 'stellarkit-js-ui'
import { TimelineMax, TweenMax, Power0 } from 'gsap'
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
    ping: function() {
      this.visible = true

      this.$nextTick(() => {
        this.animate()
      })
    }
  },
  methods: {
    byte2Hex(n) {
      const nybHexString = '0123456789ABCDEF'
      return (
        String(nybHexString.substr((n >> 4) & 0x0f, 1)) +
        nybHexString.substr(n & 0x0f, 1)
      )
    },
    rainbowColor() {
      const colors = []
      const frequency = 0.2

      for (let i = 0; i < 32; ++i) {
        let red = Math.sin(frequency * i + 0) * 127 + 128
        let grn = Math.sin(frequency * i + 2) * 127 + 128
        let blu = Math.sin(frequency * i + 4) * 127 + 128

        red *= 0.4
        grn *= 0.4
        blu *= 0.8

        colors.push(
          '#' + this.byte2Hex(red) + this.byte2Hex(grn) + this.byte2Hex(blu)
        )
      }

      return colors
    },
    shadowString(shift) {
      const colors = this.rainbowColor()

      let shadowString = ''
      for (let i = 0; i < colors.length; i++) {
        let colorIndex = i + shift

        if (colorIndex < 0) {
          colorIndex += colors.length
        }
        if (colorIndex >= colors.length) {
          colorIndex -= colors.length
        }

        const pixels = (i + 1) * 8
        shadowString += shadowString.length > 0 ? ', ' : ''

        shadowString += '0 0 0 ' + pixels + 'px ' + colors[colorIndex]
      }

      return shadowString
    },
    animate() {
      const rainbowElement = $('#rainbow')
      const duration = 0.5

      TweenMax.set(rainbowElement, {
        boxShadow: this.shadowString(0)
      })

      this.rainbowTimeline = new TimelineMax({
        repeat: -1,
        repeatdelay: 0,
        yoyo: false
      })

      const colors = this.rainbowColor()

      for (let i = 1; i <= colors.length; i++) {
        this.rainbowTimeline.to(
          rainbowElement,
          duration,
          {
            boxShadow: this.shadowString(-i),
            ease: Power0.easeNone
          },
          '+=0'
        )
      }

      this.flasher = new TimelineMax({
        repeat: -1,
        repeatdelay: 0,
        yoyo: false
      })
        .set(rainbowElement, {
          backgroundColor: 'rgb(255,255,255)'
        })
        .to(
          rainbowElement,
          3,
          {
            backgroundColor: 'rgb(0,0,0)'
          },
          '+=0'
        )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/styles.scss';

#rainbow {
  position: absolute;
  left: 283px;
  top: 82px;
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
}

.main-container {
  @include standard-dialog-contents();

  .main-content {
    position: relative;
    height: 220px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    color: white;
    text-align: right;
    font-size: 1em;
    background: black;

    .initials-text {
      position: absolute;
      bottom: 62px;
      left: 310px;
      z-index: 1;

      a {
        color: rgba(0, 0, 0, 0.07);
        text-decoration: none;
      }
    }

    .contact-info {
      z-index: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      font-family: $fancyFontFamily;
      text-shadow: 0 0 5px black;
      font-weight: bold;

      a {
        text-decoration: none;
        color: white;
        font-size: 1.78em;
        text-shadow: 0 0 5px black;
      }
    }
  }
}
</style>

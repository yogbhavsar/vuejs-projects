<script setup lang="ts">
import vueLogo from '../assets/vue.svg'
import heroImg from '../assets/hero.png'
</script>

<style scoped>
.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}
</style>

<template>
    <div class="privacy">
        <div class="hero">
            <img :src="heroImg" class="base" width="170" height="179" alt="" />
        </div>
        <h1>Privacy Policy</h1>
        <p>This is the privacy policy page from vue.<img :src="vueLogo" class="framework" alt="Vue logo" /></p>
    </div>
</template>
<template>
  <div class="arrow">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<style lang="scss">
body {
  background-color: #322B2B;
}

.arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform: rotate(90deg);
  cursor: pointer;
}

.arrow span {
  display: block;
  width: 1.6rem;
  height: 1.6rem;
  border-bottom: 5px solid white;
  border-right: 5px solid white;
  transform: rotate(45deg);
  animation: animate 2s infinite;
}

.arrow span:nth-child(2) {
  animation-delay: -0.2s;
}

.arrow span:nth-child(3) {
  animation-delay: -0.4s;
}

@keyframes animate {
  0% {
    opacity: 0;
    transform: rotate(45deg) translate(-20px, -20px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(20px, 20px);
  }
}
</style>
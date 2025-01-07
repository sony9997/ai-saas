<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
    <!-- 星空背景 -->
    <div class="absolute inset-0">
      <div class="stars"></div>
      <div class="stars2"></div>
      <div class="stars3"></div>
    </div>
    
    <!-- 内容区域 -->
    <div class="relative z-10">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.stars {
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 1744px 122px #FFF , 134px 1321px #FFF , 92px 859px #FFF;
  animation: animStar 50s linear infinite;
}

.stars2 {
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: 1744px 122px #FFF , 134px 1321px #FFF , 92px 859px #FFF;
  animation: animStar 100s linear infinite;
}

.stars3 {
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: 1744px 122px #FFF , 134px 1321px #FFF , 92px 859px #FFF;
  animation: animStar 150s linear infinite;
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
}
</style> 
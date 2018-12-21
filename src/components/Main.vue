<template>
  <div class="page">
    <div class="title">{{roomName}}</div>
    <Login v-if="notLogin" v-model="notLogin"></Login>
    <div v-else>
      <div class="current-user">嗨～ {{userName}}</div>
      <ChatBox :userName="userName"></ChatBox>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Login from './log/Login';
import ChatBox from './chat/ChatBox';

export default {
  components: {Login, ChatBox},
  data () {
    return {
      roomName: '从南山南到七月上',
      notLogin: true
    }
  },
  computed: {
    userName() {
      return this.notLogin ? '' : localStorage.getItem('username');
    }
  }
}
</script>

<style lang="less" scoped>
  .page {
    width: 100%;
    position: relative;
    height: 100vh;
    .title {
      height: 50px;
      overflow: hidden;
      text-align: center;
      font-size: 1.2rem;
      line-height: 50px;
      color: rgb(231, 81, 199);
      font-weight: bolder;
      @media (max-width: 762px) {
          height: 6vh;
          line-height: 6vh;
      }
    }
    .current-user {
      font-size: 1rem;
      text-align: center;
      color: paleturquoise;
    }
  }
</style>

<template>
  <div class="chat">
    <UserList></UserList>
    <div class="chat-box">
        <ChatView :userName="userName"></ChatView>
        <div class="chat-input">
        <Input v-model="text" @keyup.enter.native="submit" placeholder="Enter something..." clearable/>
        <Button class="submit-btn" type="primary" @click="submit">Submit</Button>
        </div>
    </div>
  </div>
</template>

<script>
import UserList from './UserList';
import ChatView from './ChatView';
import { setInterval } from 'timers';

export default {
  components: {UserList, ChatView},
  props: {
    userName: {required: true, type: String}
  },
  data () {
    return {
      text: '',
    }
  },
  methods: {
      submit() {
        socket.emit('chat message', JSON.stringify({
          user: this.userName,
          msg: this.text,
          time: new Date()
        }));
        this.text = '';
      }
  },
  mounted() {
    setInterval(() => {
    socket.emit('heartbeat', this.userName);
    }, 3000);
  }
}
</script>

<style lang="less" scoped>
    .chat {
        width: 500px;
        height: 550px;
        margin-top: 10px;
        background: #ffffff;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        @media (max-width: 762px) {
        width: 100%;
        height: 94vh;
        margin-top: 0;
        }
        &-box {
            height: 500px;
            position: relative;
            background-color: paleturquoise;
            @media (max-width: 762px) {
                height: 84vh;
            }
        }
        &-input {
            position: absolute;
            bottom: 0;
            display: flex;
            width: 100%;
        }
    }
</style>

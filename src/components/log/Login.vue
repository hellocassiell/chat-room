<template>
    <div class="login">
      <Input v-model="userName" placeholder="起个名字吧～" clearable/>
      <Button class="login-btn" type="success" @click="login">敲门</Button>
    </div>
</template>

<script>
import _ from 'lodash';
import { mapState, mapMutations } from 'vuex';
import {fetchUserList} from '@/api/user';
import {login} from '@/api/login';

export default {
  model: {prop: 'value', event: 'change'},
  data () {
    return {
      userName: ''
    }
  },
  computed: {
    ...mapState(['users']),
  },
  methods: {
    ...mapMutations(['getUsers']),
    async load() {
      const res = await fetchUserList();
      this.getUsers(res.data);
    },
    async login() {
      if (_.indexOf(this.users, this.userName) < 0) {
        this.$emit('change', false);
        localStorage.setItem('username', this.userName);
        await login({username: this.userName});
      } else {
        this.$Message.info('该用户昵称已被占用噢～');
      }
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style lang="less" scoped>

    .login {
      margin-top: 10px;
      width: 100px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      &-btn {
        margin-top: 30px;
        width: 80px;
      }
    }
</style>

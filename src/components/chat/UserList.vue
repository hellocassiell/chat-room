<template>
  <ul class="user-list">
    <li v-for="user in currUsers" class="user-item" :key="user.id">
        <Avatar :style="{background: color}">{{ user | avatarLetter }}</Avatar>
    </li>
  </ul>
</template>

<script>
import {fetchCurrUsers} from '@/api/user';
import { setInterval } from 'timers';

export default {
  filters: {
    avatarLetter(v) {
      return v.substr(0, 1);
    }
  },
  data() {
      return {
          currUsers: [],
          color: 'pink'
      };
  },
  methods: {
      async load() {
        const res = await fetchCurrUsers();
        this.currUsers = res.data;
      }
  },
  mounted() {
    this.load();
    setInterval(()=> {
        this.load();
    }, 1000);
  }
}
</script>

<style lang="less" scoped>
    .user {
        &-list {
            width: 100%;
            min-height: 50px;
            max-height: 80px;
            overflow: hidden;
            background-color: peachpuff;
        }
        &-item {
            width: 40px;
            margin: 6px;
            display: inline-block;
        }
    }

</style>

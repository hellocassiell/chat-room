<template>
  <ul class="chat-view">
    <li :class="item.isMe ? 'chat-item-right' : 'chat-item-left'" v-for="item in messages" :key="item.id">
        <div class="chat-item-time">{{item.time}}</div>
        <div class="box" v-if="item.isMe">
            <div class="chat-item-content">{{item.msg}}</div>
            <Avatar :style="{background: color}">{{ item.user | avatarLetter }}</Avatar>
        </div>
        <div class="box" v-else>
            <Avatar :style="{background: color}">{{ item.user | avatarLetter }}</Avatar>
            <div class="chat-item-content">{{item.msg}}</div>
        </div>
    </li>
  </ul>
</template>

<script>
import _ from 'lodash';
import {fetchChatRecord} from '@/api/chat';
import { log } from 'util';

export default {
  props: {
    userName: {required: true, type: String}
  },
  filters: {
    avatarLetter(v) {
      return v.substr(0, 1);
    },
  },
  data () {
    return {
      messages: [],
      color: 'pink'
    }
  },
  methods: {
    async load() {
        const res = await fetchChatRecord();
        let record = res.data;
        for (let item of record) {
            this.messages.push(JSON.parse(item));
        }
        socket.on('chat message', (v) => {
            this.messages.push(JSON.parse(v));
            this.messages = _.map(this.messages, (i) => ({
                ...i,
                isMe: i.user === this.userName
            }));
        });
        this.messages = _.map(this.messages, (i) => ({
            ...i,
            isMe: i.user === this.userName
        }));
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style lang="less" scoped>
    .chat {
        &-view {
            overflow: scroll;
            height: 450px;
            padding: 4px 8px 4px;
            @media (max-width: 762px) {
                height: 74vh;
            }
        }
        &-item {
            &-left {
                text-align: left;
            }
            &-right {
                text-align: right;
            }
            &-time {
                text-align: center;
                color: gray;
            }
            &-content {
                width: fit-content;
                display: inline-block;
                min-width: 30px;
                max-width: 280px;
                min-height: 1rem;
                height: auto;
                font-size: .8rem;
                padding: .1rem .2rem;
                text-align: center;
                background-color: #fff;
                border-radius: 4px;
                color: palevioletred;
                margin-top: 9px;
                margin-left: 6px;
                margin-right: 6px;
            }
        }
    }
</style>

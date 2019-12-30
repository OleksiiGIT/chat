<template>
  <div class="room-list">
    <h4>Channels</h4>
    <hr />
    <b-list-group v-if="activeRoom">
      <b-list-group-item
        v-for="room in rooms"
        :key="room.name"
        :active="activeRoom.id === room.id"
        href="#"
        @click="onChange(room)"
      >
        {{ room.isPrivate ? "*" : "#" }}
        {{room.name }}
        <div class="deleteRoom" v-on:click.prevent="deleteRoomHandler(room.id)">delete</div>
      </b-list-group-item>
      <b-button class="mt-3" block @click="showModal"
      >Create a new room</b-button
      >
    </b-list-group>
    <b-modal ref="my-modal" hide-footer title="Create your room">
      <div class="d-block text-center">
        <b-input-group prepend="Name" class="mt-3">
          <b-form-input v-model="roomName" />
        </b-input-group>
        <b-form-checkbox class="mt-3" v-model="checked" name="check-button" switch>
          Do you wanna make it private?
        </b-form-checkbox>
      </div>
      <b-button class="mt-3" variant="outline-warning" block :disabled="isValid" @click="createRoom"
        >Create a new room</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "RoomList",
  computed: {
    ...mapState(["rooms", "activeRoom"]),
    isValid: function() {
      const result = this.roomName.length === 0;
      return result ? result : this.loading;
    }
  },
  data() {
    return {
      roomName: "",
      checked: false
    };
  },
  methods: {
    ...mapActions(["changeRoom", "createNewRoom", "deleteRoom"]),
    onChange(room) {
      this.changeRoom(room.id);
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    async createRoom() {
      const result = await this.createNewRoom({
        name: this.roomName,
        private: this.checked
      });
      if(result) {
        this.$refs["my-modal"].hide();
      }
      console.log(this.rooms)
    },
    async deleteRoomHandler(id) {
      await this.deleteRoom(id)
    }
  }
};
</script>

<style scoped>
.deleteRoom {
  background: #ccc;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 15px;
  border-radius: 5px;
  font-size: 0;
  z-index: 1;
}
.deleteRoom:before, .deleteRoom:after {
  content: "";
  width: 10px;
  height: 2px;
  background: black;
  position: absolute;
  top: 9px;
  left: 5px;
}
.deleteRoom:before {
  transform: rotate(45deg);
}
.deleteRoom:after {
  transform: rotate(-45deg);
}
</style>
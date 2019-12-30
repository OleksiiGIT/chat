<template>
  <div class="user-list">
    <h4>Members</h4>
    <hr />
    <b-list-group>
      <b-list-group-item v-for="user in users" :key="user.username">
        {{ user.name }}
        <b-badge
          v-if="user.presence"
          :variant="statusColor(user.presence)"
          pill
        >
          {{ user.presence }}</b-badge
        >
      </b-list-group-item>
      <b-button variant="danger" class="mt-3" @click="showModal"
        >Add members</b-button
      >
    </b-list-group>
    <b-modal ref="addMember" hide-footer title="Create your room">
      <div
        class="d-block text-center"
        v-for="member in availableUsers"
        :key="member.id"
      >
        <b-form-checkbox
          class="mt-3"
          v-if="member.id !== user.username"
          v-model="selectedUsers[member.id]"
          switch
        >
          {{ member.name }}
        </b-form-checkbox>
      </div>
      <b-button class="mt-3" variant="outline-warning" @click="onSubmit" block
        >Add new member</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "user-list",
  computed: {
    ...mapState(["loading", "users", "availableUsers", "activeRoom", "user"])
  },
  data() {
    return {
      selectedUsers: []
    };
  },
  methods: {
    ...mapActions(["addUsersToRoom"]),
    statusColor(status) {
      return status === "online" ? "success" : "warning";
    },
    showModal() {
      this.$refs["addMember"].show();
    },
    onSubmit() {
      const data = {
        users: this.selectedUsers,
        room: this.activeRoom
      };
      const res = this.addUsersToRoom(data);
      if (res) { this.$refs["addMember"].hide(); }
    }
  }
};
</script>

<style scoped>
input.disabled {
  display: none;
}
</style>

export default {
  setError(state, error) {
    state.error = error;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
  setUser(state, user) {
    state.user = user;
  },
  setReconnect(state, reconnect) {
    state.reconnect = reconnect;
  },
  setActiveRoom(state, roomId) {
    state.activeRoom = roomId;
  },
  setRooms(state, rooms) {
    state.rooms = rooms;
  },
  addRoom(state, room) {
    state.rooms.push(room);
  },
  deleteRoom(state, id) {
    let a = null;
    state.rooms.map((u, index) => {
      a = u.id === id ? index : null
    });
    state.rooms.splice(a, 1);
  },
  setUsers(state, users) {
    state.users = users;
  },
  clearChatRoom(state) {
    state.users = [];
    state.messages = [];
  },
  setMessages(state, messages) {
    state.messages = messages;
  },
  addMessage(state, message) {
    state.messages.push(message);
  },
  setSending(state, status) {
    state.sending = status;
  },
  setUserTyping(state, userId) {
    state.userTyping = userId;
  },
  setAvailableUsers(state, users) {
    state.availableUsers = users;
  },
  addMembers(state, user) {
    state.users.push(user);
  },
  reset(state) {
    state.error = null;
    state.users = [];
    state.messages = [];
    state.rooms = [];
    state.user = null;
    state.activeRoom = null;
  }
};

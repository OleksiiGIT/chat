import chatkit from "../chatkit";

// Helper function for displaying error messages
function handleError(commit, error) {
  const message = error.message || error.info.error_description;
  commit("setError", message);
}

export default {
  async login({ commit }, userId) {
    try {
      commit("setError", "");
      commit("setLoading", true);
      // Connect user to ChatKit service
      const currentUser = await chatkit.connectUser(userId);
      commit("setUser", {
        username: currentUser.id,
        name: currentUser.name
      });
      commit("setReconnect", false);

      // Save list of user's rooms in store
      const rooms = currentUser.rooms.map(room => ({
        id: room.id,
        name: room.name,
        isPrivate: room.isPrivate
      }));
      commit("setRooms", rooms);

      // Subscribe user to a room
      const activeRoom = {
        id : "cf14c91b-636b-441c-ab7d-f102a79ace5c",
        name: "General"
      }; // pick last used room, or the first one
      commit("setActiveRoom", {
        id: activeRoom.id,
        name: activeRoom.name
      });
      const data = await chatkit.subscribeToRoom(activeRoom.id);
      commit("setAvailableUsers", data.users);
      return true;
    } catch (error) {
      handleError(commit, error);
    } finally {
      commit("setLoading", false);
    }
  },
  async changeRoom({ commit }, roomId) {
    try {
      const { id, name } = await chatkit.subscribeToRoom(roomId);
      commit("setActiveRoom", { id, name });
    } catch (error) {
      handleError(commit, error);
    }
  },
  async sendMessage({ commit }, message) {
    try {
      commit("setError", "");
      commit("setSending", true);
      return await chatkit.sendMessage(message);
    } catch (error) {
      handleError(commit, error);
    } finally {
      commit("setSending", false);
    }
  },
  async logout({ commit }) {
    commit("reset");
    chatkit.disconnectUser();
    window.localStorage.clear();
  },
  async createNewRoom({ commit }, roomNew) {
    try {
      commit("setError", "");
      commit("setLoading", true);
      const roomId = await chatkit.createNewRoom(roomNew);
      commit("addRoom", roomId);
      return roomId;
    } catch (error) {
      handleError(commit, error);
    } finally {
      commit("setSending", false);
    }
  },
  async addUsersToRoom({ commit }, data) {
    try {
      for (let key in data.users) {
        if (data.users[key]) {
          await chatkit.addUsers(key, data.room.id);
          commit("addMembers", {
            id: key,
            name: key
          });
        }
      }
    } catch (error) {
      handleError(commit, error);
    }
  },
  async deleteRoom({ commit }, data) {
    try {
      await chatkit.deleteUsers(data);
      commit("deleteRoom", data)
    } catch (error) {
      handleError(commit, error);
    }
  }
};

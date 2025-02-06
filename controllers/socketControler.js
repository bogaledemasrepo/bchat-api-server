const socketHandler = (socket) => {
  socket.emit("wellcome", "Wellcome to BChat App");
  socket.on("/signIn", (msg) => {});
  socket.on("/signUp", (msg) => {});
  socket.on("/addFriend", (msg) => {});
  socket.on("/chats", (msg) => {});
  socket.on("/chats/groupId", (msg) => {});
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
};

module.exports = socketHandler;

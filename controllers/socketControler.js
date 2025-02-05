const socketHandler = (socket) => {
  socket.emit("wellcome", "Wellcome to BChat App");
  socket.on("/signIn", (msg) => signInHandler(msg));
  socket.on("/signUp", (msg) => signUpHandler(msg));
  socket.on("/addFriend", (msg) => signUpHandler(msg));
  socket.on("/chats", (msg) => signUpHandler(msg));
  socket.on("/chats/groupId", (msg) => signUpHandler(msg));
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
};

module.exports = socketHandler;

'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 */

// module.exports = cb => {
//   cb();
// };

module.exports = cb => {
  var io = require('socket.io')(strapi.server);

  /*
  // listen for user connection
  io.on('connection', function(socket) {
    // send message on user connection
    socket.emit(
      'hello',
      JSON.stringify({
        message: 'Hello food lover'
      })
    );
    // listen for user diconnect
    socket.on('disconnect', () => console.log('a user disconnected'));
  });
  */
  var users = [];
  io.on('connection', socket => {
    socket.user_id = Math.random() * 100000000000000; // not so secure
    users.push(socket); // save the socket to use it later

    socket.emit(
      'hello',
      JSON.stringify({
        message: 'Hello food lover'
      })
    );
    socket.on('disconnect', () => {
      users.forEach((user, i) => {
        // delete saved user when they disconnect
        if (user.user_id === socket.user_id) users.splice(i, 1);
      });
    });
  });

  strapi.io = io;
  // send to all users connected
  strapi.emitToAllUsers = food => io.emit('food_ready', food);
  cb();
};

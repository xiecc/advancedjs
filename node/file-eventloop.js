

var FDMap = {};

function _seen_new_fd (fd) {
  FDMap[fd] = new FDHandler(fd);
}

for (var fd in FDMap) {
    add_to_epoll_set(fd);
}

while (1) {
  var timeout = _run_timers(); 
  var events = epoll_wait(Epoll, 1000, timeout);
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    // event is an array of [fd, state]
    var fd_handler = FDMap[event[0]];
    var state = event[1];
    if (state & EPOLLIN)  fd_handler.do_read();
    if (state & EPOLLOUT) fd_handler.do_write();
  }
}

First we run the timers and get the timeout
Then we call epoll_wait() passing in the timeout returned from _run_timers
Then we process the events returned, which map to file descriptors
Then we loop back and do it all again


At the low level your HTTP server is just a socket that is listening on a port (usually 80 for http, or 443 for https). In Unix terms a socket is represented by an FD, so is part of the descriptor map (FDMap) above.
When a connection comes in from the internet, it tells the kernel, to tell epoll_wait, that a “read” event fired on that FD.



GET /path/to/resource HTTP/1.1
Host: app.hubdoc.com
Connection: close


Writing data in this system is a little more confusing, because the “write” event isn’t really telling you that you SHOULD write, just that there’s space left in the kernel buffers so that you CAN write. More importantly, your application never cares about “write” events because Node handles it all internally. Once you understand that it gets a bit more simple. There’s multiple levels of buffering occurring – Node has to buffer data that your application has tried to write that didn’t get to the kernel, and send it when the epoll system tells it that it can.


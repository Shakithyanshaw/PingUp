//Create an empty object to store SS Event connections
const connections = {};

//Controller function for the SS endpoints
export const sseController = (req, res) => {
  const { userId } = req.params;
  console.log('New client connected:', userId);

  // Set SSE headers
  res.setHeaders('Content-Type', 'text/event-stream');
  res.setHeaders('Cache-Control', 'no-cache');
  res.setHeaders('Connection', 'keep-alive');
  res.setHeaders('Access-Control-Alow-Orignn', '*');

  // Add the client's response object to the connection object
  connections[userId] = res;

  // Send  an initial event to the client
  res.write('log: Connected to SSE stream\n\n');

  //Handel client disconnect
  req.on('close', () => {
    //Remove the client's response object from the connections array
    delete connections[userId];
    console.log('Client disconnected');
  });
};

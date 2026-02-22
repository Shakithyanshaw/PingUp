import fs from 'fs';
import imagekit from '../configs/imageKit.js';
import Message from '../models/Message.js';

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

//Send Message
export const sendMessage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { to_user_id, text } = req.body;
    const image = req.file;

    let media_url = '';
    let message_type = image ? 'image' : 'text';

    if (message_type === 'image') {
      const fileBuffer = fs.readFileSync(image.path);
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: image.originalname,
      });
      media_url = imagekit.url({
        path: response.filePath,
        transformation: [
          { quality: 'auto' },
          { format: 'webp' },
          { width: '1280' },
        ],
      });
    }
    const message = await Message.create({
      from_user_id: userId,
      to_user_id,
      text,
      message_type,
      media_url,
    });

    res.json({ success: true, message });

    // Send message to_user_id using SSE

    const messageWithUserData = await Message.findById(message._id).populate(
      'from_user_id',
    );

    if (connections[to_user_id]) {
      connections[to_user_id].write(
        `data: ${JSON.stringify(messageWithUserData)}\n\n`,
      );
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get Chat Message
export const getChatMessage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { to_user_id } = req.body;

    const messages = await Message.find({
      $or: [
        { from_user_id: userId, to_user_id },
        { from_user_id: to_user_id, to_user_id: userId },
      ],
    }).sort({ created_at: -1 });
    //Mark messages as seen
    await Message.updateMany(
      { from_user_id: to_user_id, to_user_id: userId },
      { seen: true },
    );
    res.json({ success: true, messages });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get User Recent Message
export const getUserRecentMessage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const messages = (
      await Message.find(
        { to_user_id: userId }.populate('from_user_id to_user_id'),
      )
    ).toSorted({ created_ar: -1 });

    res.json({ success: true, messages });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const AVATAR = {
  // 'procedural' builds the stylised character in code (no download); 'glb' loads `url` instead.
  mode: 'glb',
  url: `${process.env.PUBLIC_URL || ''}/models/RobotExpressive.glb`,
  height: 1.8, // GLB models are auto-scaled to this height
  forwardOffset: 0, // radians; set to Math.PI if a GLB faces -Z
  speed: 2.3,
  accel: 8,
  decel: 10,
  turnRate: 10,
  // Candidate clip names for GLB mode (case-insensitive substring match, first hit wins).
  clips: {
    idle: ['idle', 'stand'],
    walk: ['walk'],
    turn: ['turn'],
    wave: ['wave', 'hello'],
    greet: ['thumbsup', 'greet', 'yes', 'agree'],
  },
};

// Look of the procedural character, based on the owner's reference photo.
export const HUMAN = {
  // Front face texture cropped from the reference sheet; set to null for the hand-built face.
  faceTexture: `${process.env.PUBLIC_URL || ''}/avatar/face.jpg`,
  skin: '#b57e57',
  hair: '#15100d',
  beard: '#241913',
  vest: '#0b0c10',
  joggers: '#1c2029',
  tilak: true,
};

// How long each one-shot action runs, in seconds.
export const ACTION_SECONDS = { wave: 3.9, greet: 1.8 };

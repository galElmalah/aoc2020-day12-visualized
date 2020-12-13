export const top = ({ x, y }, val = 1) => ({ x, y: y - val });
export const topLeft = ({ x, y }, val = 1) => ({ x: x - val, y: y - val });
export const topRight = ({ x, y }, val = 1) => ({ x: x + val, y: y - val });
export const bottom = ({ x, y }, val = 1) => ({ x, y: y + val });
export const bottomLeft = ({ x, y }, val = 1) => ({ x: x - val, y: y + val });
export const bottomRight = ({ x, y }, val = 1) => ({ x: x + val, y: y + val });
export const left = ({ x, y }, val = 1) => ({ x: x - val, y });
export const right = ({ x, y }, val = 1) => ({ x: x + val, y });

export const makePoint = (x, y) => ({
  x: Number(x),
  y: Number(y),
});
export const allDirections = [
  top,
  topLeft,
  topRight,
  right,
  left,
  bottom,
  bottomLeft,
  bottomRight,
];

export const pt1 = (input) => {
  // const input = `F10
  // N3
  // F7
  // R90
  // F11`.split('\n');
  let shipsOrigin = makePoint(0, 0);
  const directions = ['E', 'S', 'W', 'N'];
  let angle = 0;
  const waypoints = [];
  let moves = {
    N: top,
    S: bottom,
    E: right,
    W: left,
  };

  const moveShip = (action, val) => {
    return moves[action](shipsOrigin, val);
  };

  input.forEach((move) => {
    const [, action, value] = move.match(/(\w)(\d+)/);
    let val = +value;

    waypoints.push({ ...shipsOrigin });
    if (moves[action]) {
      shipsOrigin = moveShip(action, val);
    }
    switch (action) {
      case 'L':
        angle -= val;
        break;
      case 'R':
        angle += val;
        break;
      case 'F':
        let direction;
        if (angle >= 0) {
          direction = directions[(angle / 90) % 4];
        } else {
          direction = directions[4 + ((angle / 90) % 4)];
        }
        shipsOrigin = moveShip(direction, val);

        break;
    }
  });

  return waypoints;
};

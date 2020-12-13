import { pt1, makePoint } from './game';
import { moves } from './input';
const settings = {
  speed: 50,
};

const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

canvas.width = innerWidth * 2;
canvas.height = innerHeight * 2;
function calcWaypoints(vertices) {
  var waypoints = [];
  for (var i = 1; i < vertices.length; i++) {
    var pt0 = vertices[i - 1];
    var pt1 = vertices[i];
    var dx = pt1.x - pt0.x;
    var dy = pt1.y - pt0.y;

    if (dx !== 0 || dy !== 0) {
      for (var j = 0; j < 10; j++) {
        var x = pt0.x + (dx * j) / 25;
        var y = pt0.y + (dy * j) / 25;
        waypoints.push({ x: x, y: y });
      }
      waypoints.push({ x: x, y: y, waypoint: true });
    }
  }
  return waypoints;
}
const points = pt1(moves);
window.scrollBy(canvas.width / 2, canvas.height / 2);

const allPs = calcWaypoints(points);
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.moveTo(0, 0);
ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';
ctx.lineCap = 'round';

ctx.fillRect(0, 0, 10, 10);
console.log(allPs);
let ticks = 0;
ctx.scale(2, 2);
const animate = () => {
  ticks++;

  if (ticks === allPs.length) {
    return;
  }
  const p = allPs[ticks];
  // console.log(p.x, innerWidth);

  if (p.waypoint) {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(p.x * 2, p.y * 2, 3, 2 * Math.PI, 0);
    ctx.fill();
  }
  ctx.strokeStyle = 'white';

  ctx.lineTo(p.x * 2, p.y * 2);
  ctx.stroke();

  requestAnimationFrame(animate);
};

animate();
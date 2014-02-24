// Generated by CoffeeScript 1.6.3
var animate, debug, onDataUpdated, onKeyDown, onRatio, onUserIn, onUserOut, perso, renderer, setup, skeleton, stage, sync, toggleDebug, windowResized;

stage = null;

renderer = null;

skeleton = null;

sync = null;

perso = null;

debug = false;

setup = function() {
  stage = new PIXI.Stage(0xFFFFFF);
  renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, null, false, true);
  document.body.appendChild(renderer.view);
  skeleton = new Skeleton();
  stage.addChild(skeleton.view);
  sync = new SkeletonSync(skeleton);
  sync.onUserIn = onUserIn;
  sync.onUserOut = onUserOut;
  sync.onRatio = onRatio;
  sync.onDataUpdated = onDataUpdated;
  perso = new Perso();
  perso.setFromSkeleton(skeleton);
  stage.addChild(perso.view);
  windowResized();
  window.addEventListener('resize', windowResized);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('touchstart', toggleDebug);
  return requestAnimFrame(animate);
};

onRatio = function(ratio) {
  skeleton.dataRatio = ratio;
  return skeleton.resize();
};

onUserIn = function(userId) {
  return console.log("user " + userId + " entered");
};

onUserOut = function(userId) {
  return console.log("user " + userId + " exited");
};

onDataUpdated = function() {
  return perso.setFromSkeleton(skeleton);
};

onKeyDown = function(ev) {
  if (ev.keyCode === 83) {
    return toggleDebug();
  }
};

toggleDebug = function() {
  debug = !debug;
  skeleton.setDebug(debug);
  return perso.setDebug(debug);
};

windowResized = function(ev) {
  var sh, sw;
  sw = window.innerWidth * window.devicePixelRatio;
  sh = window.innerHeight * window.devicePixelRatio;
  renderer.resize(sw, sh);
  renderer.view.style.width = window.innerWidth + 'px';
  renderer.view.style.height = window.innerHeight + 'px';
  if (skeleton) {
    skeleton.resize();
    skeleton.view.position.x = sw * 0.5;
    skeleton.view.position.y = sh * 0.5;
    perso.view.position.x = skeleton.view.position.x;
    return perso.view.position.y = skeleton.view.position.y;
  }
};

animate = function() {
  requestAnimFrame(animate);
  skeleton.update();
  perso.update();
  return renderer.render(stage);
};

setup();

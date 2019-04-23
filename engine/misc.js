const fs = require('fs');
const path = require('path');

exports.time = (start) => {
  if (start) {
    let time = process.hrtime(start);
    return (time[0] / 1000) + (time[1]/1000000);
  } else {
    return process.hrtime();
  }
}

// note that this will break with default arguments
exports.arglist = (f) => {
  let s = f.toString();
  return s.substring(s.indexOf("{") + 1, s.indexOf("}")).replace(/\s/g, "").split(",");
}

function walkSync(dir, files = []) {
  for (let file of fs.readdirSync(dir)) {
    file = path.join(dir, file);
    if (fs.statSync(file).isDirectory()) {
      files = walkSync(file, files);
    } else {
      files.push(file);
    }
  }
  return files;
}
exports.walkSync = walkSync;

exports.requireReload = (modulePath) => {
    delete require.cache[require.resolve(modulePath)];
    return require(modulePath);
}
function callAngularSignXMLFunction() {
  window.angularComponentReference.zone.run(() => {
    console.log('function callAngularSignXMLFunction calling ...');
    window.angularComponentReference.loadAngularFunction();
  });
}

function findPath(targetName, {name, children}) {
  console.log(targetName, children);
  let ret = false;
  if (name.toLowerCase().indexOf(targetName.toLowerCase()) > -1) {
    ret = true;
  }

  for (const child of children) {
    const result = findPath(targetName, child);
    if (result) {
      return ret = true;
    }
  }
  return ret;
}

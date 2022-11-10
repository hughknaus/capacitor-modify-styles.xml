// run `node index.js` in the terminal

var fs = require('fs');
var xmljs = require('xml-js');

/*
<item name="android:background">@drawable/splash</item>  // EXISTS BY DEFAULT
<item name="android:windowNoTitle">true</item> // ADD
<item name="android:windowActionBar">false</item> // ADD
<item name="android:windowContentOverlay">@null</item> // ADD
<item name="android:windowIsTranslucent">true</item> // ADD
<item name="android:windowFullscreen">true</item> // ADD
*/

var windowNoTitle = {
  _attributes: { name: 'android:windowNoTitle' },
  _text: 'true',
};

var windowActionBar = {
  _attributes: { name: 'android:windowActionBar' },
  _text: 'false',
};

var windowContentOverlay = {
  _attributes: { name: 'android:windowContentOverlay' },
  _text: '@null',
};

var windowIsTranslucent = {
  _attributes: { name: 'android:windowIsTranslucent' },
  _text: 'true',
};

var windowFullscreen = {
  _attributes: { name: 'android:windowFullscreen' },
  _text: 'true',
};

fs.readFile('styles.xml', 'utf-8', function (err, xml) {
  if (err) console.error(err);
  // we log out the readFile results
  console.log('READFILE:', xml);

  var json = xmljs.xml2js(xml, { compact: true, spaces: 4 });

  console.log(`JSON.RESOURCE.STYLE:`, json.resources.style);
  console.log(`JSON.RESOURCE.STYLE[2]:`, json.resources.style[2]);
  console.log(`JSON.RESOURCE.STYLE[2].ITEM:`, json.resources.style[2].item);

  // get the original item
  var firstItem = json.resources.style[2].item;

  // change to array
  json.resources.style[2].item = [];

  // re-add original item + new item(s)
  json.resources.style[2].item.push(firstItem);
  json.resources.style[2].item.push(windowNoTitle);
  json.resources.style[2].item.push(windowActionBar);
  json.resources.style[2].item.push(windowContentOverlay);
  json.resources.style[2].item.push(windowIsTranslucent);
  json.resources.style[2].item.push(windowFullscreen);

  console.log(`NEW JSON.RESOURCE.STYLE[2]`, json.resources.style[2]);
  console.log(`NEW JSON`, json);

  // convert JSON objec to XML
  const newXml = xmljs.js2xml(json, { compact: true, spaces: 4 });
  console.log(`NEW XML:`, newXml);

  // write updated XML string to a file
  fs.writeFile('new-styles.xml', newXml, (err) => {
    if (err) console.error(err);
    console.log(`Updated XML is written to a new file.`);
  });
});

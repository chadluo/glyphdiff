"use strict";

let def = {
  text: "いろは",
  fontfamily1: "Tsukushi A Round Gothic",
  fontfamily2: "Tsukushi B Round Gothic",
  fontweight1: 400,
  fontweight2: 400,
  slant1: "normal",
  slant2: "normal",
  baseline: 1,
  darkmode: 0,
  color: "#40A040",
  // opacity: 0.7,
  size: 1.0,
  tracking: 0,
  x: 0,
  y: 0,
};

let conf = {};

for (let k in def) {
  conf[k] = param(k) || def[k];
}

let s1 = $("sample1");
let s2 = $("sample2");

// sample content

$("gd-input").value = s1.textContent = s2.textContent = conf.text;
$("gd-input").addEventListener("input", (event) => {
  conf.text = s1.textContent = s2.textContent = event.target.value || def.text;
});

// font, weight and labels

s1.style.fontFamily = conf.fontfamily1;
$("gd-fontfamily1").value = conf.fontfamily1 === def.fontfamily1 ? "" : conf.fontfamily1;
s1.style.fontWeight = $("gd-fontweight1").value = conf.fontweight1;

updateLabel("label-font1", s1);

$("gd-fontfamily1").addEventListener("input", (event) => {
  $("gd-input").style.fontFamily = s1.style.fontFamily = conf.fontfamily1 = event.target.value || def.fontfamily1;
  loadFonts();
  updateLabel("label-font1", s1);
});

$("gd-fontweight1").addEventListener("input", (event) => {
  s1.style.fontWeight = conf.fontweight1 = event.target.value;
  loadFonts();
  updateLabel("label-font1", s1);
});

s2.style.fontFamily = conf.fontfamily2;
$("gd-fontfamily2").value = conf.fontfamily2 === def.fontfamily2 ? "" : conf.fontfamily2;
s2.style.fontWeight = $("gd-fontweight2").value = conf.fontweight2;

updateLabel("label-font2", s2);

loadFonts();

$("gd-fontfamily2").addEventListener("input", (event) => {
  console.log(event.target.value);
  s2.style.fontFamily = conf.fontfamily2 = event.target.value || def.fontfamily2;
  loadFonts();
  updateLabel("label-font2", s2);
});

$("gd-fontweight2").addEventListener("input", (event) => {
  s2.style.fontWeight = conf.fontweight2 = event.target.value;
  loadFonts();
  updateLabel("label-font2", s2);
});

// slantness

let slantOptions1 = document.getElementsByName("slant1");
let slantOptions2 = document.getElementsByName("slant2");
for (let i = 0; i < 3; i++) {
  let curr1 = slantOptions1[i];
  let curr2 = slantOptions2[i];
  if (curr1.value === conf.slant1) {
    curr1.checked = true;
    s1.style.fontStyle = curr1.value;
  }
  if (curr2.value === conf.slant2) {
    curr2.checked = true;
    s2.style.fontStyle = curr2.value;
  }
  curr1.addEventListener("click", (event) => {
    s1.style.fontStyle = conf.slant1 = event.target.value;
    loadFonts();
  });
  curr2.addEventListener("click", (event) => {
    s2.style.fontStyle = conf.slant2 = event.target.value;
    loadFonts();
  });
}

// swap

$("gd-swap").addEventListener("click", function () {
  // update conf object
  swapStyle("fontfamily1", "fontfamily2");
  swapStyle("fontweight1", "fontweight2");
  swapStyle("slant1", "slant2");
  loadFonts();

  // update styles and controllers
  $("gd-fontfamily1").value = $("gd-input").style.fontFamily = s1.style.fontFamily =
    conf.fontfamily1 || def.fontfamily1;
  $("gd-fontfamily2").value = s2.style.fontFamily = conf.fontfamily2 || def.fontfamily2;

  s1.style.fontWeight = conf.fontweight1;
  $("gd-fontweight1").MaterialSlider.change(conf.fontweight1);
  s2.style.fontWeight = conf.fontweight2;
  $("gd-fontweight2").MaterialSlider.change(conf.fontweight2);

  updateLabel("label-font1", s1);
  updateLabel("label-font2", s2);

  for (let i = 0; i < 3; i++) {
    let curr1 = slantOptions1[i];
    let curr2 = slantOptions2[i];
    if (curr1.value === conf.slant1) {
      curr1.parentNode.MaterialRadio.check();
      s1.style.fontStyle = curr1.value;
    }
    if (curr2.value === conf.slant2) {
      curr2.parentNode.MaterialRadio.check();
      s2.style.fontStyle = curr2.value;
    }
  }

  function swapStyle(v1, v2) {
    let tmp = conf[v1];
    conf[v1] = conf[v2];
    conf[v2] = tmp;
  }
});

// baseline

$("gd-baseline").checked = conf.baseline === "1";
$("baseline").setAttribute("stroke-opacity", $("gd-baseline").checked ? 0.7 : 0);

$("gd-baseline").addEventListener("change", (event) => {
  let checker = event.target;
  $("baseline").setAttribute("stroke-opacity", checker.checked ? 0.7 : 0);
  conf.baseline = checker.checked ? 1 : 0;
});

// dark mode

$("gd-darkmode").checked = conf.darkmode === "1";
if ($("gd-darkmode").checked) {
  $("writepad").className = "mdl-color-text--grey-400";
  document.body.className = "mdl-color--grey-900";
}

$("gd-darkmode").addEventListener("change", (event) => {
  let checker = event.target;
  $("writepad").className = checker.checked ? "mdl-color-text--grey-400" : "mdl-color-text--grey-900";
  document.body.className = checker.checked ? "mdl-color--grey-900" : "mdl-color--grey-50 ";
  conf.darkmode = checker.checked ? 1 : 0;
});

// color

s2.style.fill = $("label-font2").style.fill = $("gd-color2").value = conf.color;
$("gd-color2").addEventListener("input", (event) => {
  s2.style.fill = $("label-font2").style.fill = conf.color = event.target.value || def.color;
});

// size

s2.style.fontSize = conf.size * 45 + "vh";
$("gd-size2").value = conf.size;
$("size2-tooltip").textContent = conf.size;

$("gd-size2").addEventListener("input", (event) => {
  let value = event.target.value;
  s2.style.fontSize = `${value * 45}vh`;
  $("size2-tooltip").textContent = value;
  conf.size = value;
});

// letter spacing

s2.setAttribute("letter-spacing", `${conf.tracking}em`);
$("gd-spacing2").value = conf.tracking;
$("spacing2-tooltip").textContent = conf.tracking;

$("gd-spacing2").addEventListener("input", (event) => {
  let value = event.target.value;
  s2.setAttribute("letter-spacing", `${value}em`);
  $("spacing2-tooltip").textContent = value;
  conf.tracking = value;
});

// translation

$("gd-translateX").value = conf.x;
$("gd-translateY").value = conf.y;
translate();

$("translateX-tooltip").textContent = conf.x;
$("translateY-tooltip").textContent = conf.y;

$("gd-translateX").oninput = function (event) {
  conf.x = event.target.value;
  translate();
  $("translateX-tooltip").textContent = conf.x;
};

$("gd-translateY").oninput = function (event) {
  conf.y = event.target.value;
  translate();
  $("translateY-tooltip").textContent = conf.y;
};

// share config snackbar

$("gd-share").onclick = function () {
  let t = document.createElement("textarea");
  let newURL = location.origin + location.pathname + queries();
  t.textContent = newURL;
  t.style.position = "fixed";
  document.body.appendChild(t);
  t.select();
  document.execCommand("copy");
  $("share-link").MaterialSnackbar.showSnackbar({
    message: "configuration copied.",
  });
  document.body.removeChild(t);
  history.pushState(null, null, newURL);
};

// helpers

// id selector shorthand

function $(x) {
  return document.getElementById(x);
}

// load external webfonts

function loadFonts() {
  // eslint-disable-next-line no-undef
  WebFont.load({
    google: {
      families: [
        `${conf.fontfamily1}:${conf.fontweight1}${conf.slant1 === "normal" ? "" : conf.slant1}`,
        `${conf.fontfamily2}:${conf.fontweight2}${conf.slant2 === "normal" ? "" : conf.slant2}`,
      ],
    },
  });
}

// query

function param(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// labels

function getStyle(obj, property) {
  return window.getComputedStyle(obj, null).getPropertyValue(property);
}

function getFontFamily(obj) {
  return getStyle(obj, "font-family").replace(/['"]+/g, "");
}

function getFontWeight(obj) {
  return getStyle(obj, "font-weight");
}

function updateLabel(obj, target) {
  $(obj).textContent = `${getFontFamily(target)} - ${getFontWeight(target)}`;
}

// translation

function translate() {
  s2.setAttribute("transform", `translate(${conf.x},${conf.y})`);
}

// sharing query

function queries() {
  let result = [];
  for (let k in conf) {
    if (conf[k] !== def[k]) {
      result.push(`${k}=${encodeURIComponent(conf[k])}`);
    }
  }
  return result.length ? "?" + result.join("&") : "";
}

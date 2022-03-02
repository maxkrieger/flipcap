import browser from "webextension-polyfill";

function takeScreenshot() {
  browser.tabs.executeScript({ file: "/content.js" });
  browser.tabs.insertCSS({
    code: `
        .flipcap__hovered {
            border: 2px dotted red;
        }
        `,
  });
}

async function selectElement(message: any) {
  const uri = await browser.tabs.captureVisibleTab();
  const canvas = document.createElement("canvas");
  canvas.width = message.rect.width;
  canvas.height = message.rect.height;
  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.src = uri;
  image.onload = () => {
    ctx?.drawImage(image, message.rect.left, message.rect.top);
    ctx?.save();
    const croppedUri = canvas.toDataURL("image/png");
    const blob = new Blob([croppedUri.substring(22)], { type: "image/png" });
    // const a = document.createElement("a");
    // a.href = croppedUri;
    // a.download = "screenshot.png";
    // a.click();
    canvas.remove();
    browser.downloads.download({
      url: URL.createObjectURL(blob),
      filename: "screenshot.png",
    });
    // a.remove();
  };
}

browser.runtime.onMessage.addListener((message) => {
  if (message.type === "take_screenshot") {
    takeScreenshot();
  } else if (message.type === "select_element") {
    selectElement(message);
  }
});

browser.commands.onCommand.addListener((command) => {
  if (command === "take_screenshot") {
    takeScreenshot();
  }
});

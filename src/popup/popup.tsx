import { useCallback } from "react";
import browser from "webextension-polyfill";

export default function Popup() {
  const onScreenshotClick = useCallback(() => {
    browser.runtime.sendMessage({ type: "take_screenshot" });
  }, []);
  return (
    <div>
      <button onClick={onScreenshotClick}>screenshot</button>
    </div>
  );
}

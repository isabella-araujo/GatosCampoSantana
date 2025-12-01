export function isMobile() {
  const uaMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const smallScreen = window.innerWidth < 820;
  return uaMobile || smallScreen;
}

export default function checkAddBarVisibility(addBar: HTMLDivElement) {
  const rect = addBar.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  return rect.bottom >= 0 && rect.top <= windowHeight;
}

export function hasGestured() {
  if (globalThis.navigator.userActivation) {
    return (
      globalThis.navigator.userActivation.isActive ||
      globalThis.navigator.userActivation.hasBeenActive
    );
  } else {
    return true;
  }
}

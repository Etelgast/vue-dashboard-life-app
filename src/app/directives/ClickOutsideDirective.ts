export default {
  mounted: function (el: HTMLElement & { clickOutsideEvent: (event: any) => void }, binding: any) {
    el.clickOutsideEvent = function (event: any) {
      if (!el.contains(event.target)) {
        binding.value(event, el)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted: function (el: HTMLElement & { clickOutsideEvent: (event: any) => void }) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}

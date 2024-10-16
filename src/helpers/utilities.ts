export const isTauri = computed(() => {
  if ("__TAURI_INTERNALS__" in window) {
    return true
  } else {
    return false
  }
})

export const getInitials = (name: string) =>
  name
    .match(/(^\S\S?|\s\S)?/g)
    ?.map((v) => v.trim())
    .join("")
    .match(/(^\S|\S$)?/g)
    ?.join("")
    .toLocaleUpperCase()

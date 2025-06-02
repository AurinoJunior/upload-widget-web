export function formatBytes(bytes: number): string {
  if (bytes < 0) {
    throw new Error("Size in bytes cannot be negative")
  }

  const units = ["B", "KB", "MB", "GB", "TB", "PB"]
  let formattedBytes = bytes
  let index = 0

  while (formattedBytes >= 1024 && index < units.length - 1) {
    formattedBytes /= 1024
    index++
  }

  return `${formattedBytes.toFixed(2)} ${units[index]}`
}

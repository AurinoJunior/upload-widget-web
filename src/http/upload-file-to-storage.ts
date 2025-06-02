import axios from "axios"

interface UploadFileToStorageParams {
  file: File
  signal?: AbortSignal
  onProgress: (sizeInBytes: number) => void
}

export async function uploadFileToStorage({
  file,
  signal,
  onProgress,
}: UploadFileToStorageParams) {
  const data = new FormData()

  data.append("file", file)

  const response = await axios.post<{ url: string }>(
    "http://localhost:3333/upload",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal,
      onUploadProgress(progressEvent) {
        const sizeInBytes = progressEvent.loaded
        onProgress(sizeInBytes)
      },
    }
  )

  return { url: response.data.url }
}

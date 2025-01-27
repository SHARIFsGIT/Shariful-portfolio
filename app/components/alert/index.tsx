import Image from 'next/image'

export function Alert({
  heading = 'Are you sure?',
  message = "This item will be deleted immediately. \n You can't undo this action",
  imageUrl,
  imageAlt = 'Alert image',
  onConfirm,
  onClose,
}: {
  onConfirm: () => void
  onClose: () => void
  imageUrl: string
  imageAlt?: string
  heading?: string
  message?: string
}) {
  return (
    <div className="fixed left-1/2 top-1/2 z-50 flex w-full max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg border border-gray-600 bg-gray-800/80 p-8 text-gray-200 backdrop-blur">
      <Image 
        alt={imageAlt} 
        src={imageUrl} 
        width={70} 
        height={70} 
        className="mb-4"
      />
      <h2 className="text-3xl font-medium">{heading}</h2>
      <p className="my-4 whitespace-pre-line text-center">{message}</p>
      <div className="grid w-full grid-cols-2 gap-4">
        <button
          onClick={onClose}
          className="w-full rounded bg-blue-600 py-1 text-base font-medium text-white hover:bg-blue-700"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="w-full rounded bg-gray-600 py-1 text-base font-medium text-white hover:bg-gray-700"
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

export default Alert;
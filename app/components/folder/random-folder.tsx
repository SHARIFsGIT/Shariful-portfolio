import acrobat from '@/public/assets/icons/Acrobat.png'
import folderBlue from '@/public/assets/icons/Folder.png'
import typingMaterIcon from '@/public/assets/icons/typing-master.png'
import Image from 'next/image'
import { Frame } from './folders'

export function RandomFolder({ type, id }: { type: Frame; id: string }) {
  if (type === 'pdf') {
    return <Image alt="pdf" src={acrobat} width={50} height={50} />
  }
  if (id === 'typing-master') {
    return <Image alt="type" src={typingMaterIcon} width={51} height={51} />
  }
  return <Image alt="folder" src={folderBlue} width={55} height={55} />
}

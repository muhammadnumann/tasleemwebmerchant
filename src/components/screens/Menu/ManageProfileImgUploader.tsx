/* eslint-disable @next/next/no-img-element */
import cn from 'clsx'
import Image from 'next/image'
import { ChangeEvent, FC, useState } from 'react'
import { Path, UseFormRegister } from 'react-hook-form'
import newCategory from './newCategory.interface'
import { useLang } from '@/hooks/useLang'

interface IImgUploader {
  register: UseFormRegister<any>
  name: Path<newCategory>
  data?: any
}

const ImgUploader: FC<IImgUploader> = (props) => {
  const [image, setimage] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setimage(URL.createObjectURL(e.target.files[0]))

      setFile(e.target.files[0])
    }
  }
  const { isEnglish } = useLang()

  let baseurl = 'https://tasleem.in/'
  let url = (props.data || '').replace('/home/tslcpanel/public_html', '')
  url = baseurl.concat("", url)
  return (
    <>
      <div className='w-full'>
        <div className='mt-1.5 w-full flex'>
          <input
            type='file'
            id={props.name}
            hidden
            {...props.register(props.name, {
              onChange: handleUpload
            })}
          />
          <label
            htmlFor={props.name}
            className={'w-full border-b-[1px] border-[#000] pb-3 text-[#AFAFAF] h-[30px] overflow-hidden text-ellipsis'}
          >
            {!file &&
              (isEnglish ? "Upload Photo(Optional)" : "تحميل الصورة (اختياري)")
            }
            {!!file && (file.name)}
          </label>
        </div>
      </div>
      <div className='my-3 relative h-[100px] w-full'>
        {!!image ? (
          <Image src={image} alt='img' className='object-cover' fill />
        ) :
          <img src={url} title='image' className='h-full' alt={''} />
        }
      </div>
    </>
  )
}

export default ImgUploader

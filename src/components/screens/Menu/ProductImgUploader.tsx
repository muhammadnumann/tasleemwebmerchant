import { ChangeEvent, FC, useState } from 'react'
import {  UseFormRegister } from 'react-hook-form'
import { useLang } from '@/hooks/useLang'
import { IProdutFormValues } from './IProductAdd.interface'

interface IImgUploader {
  register: UseFormRegister<IProdutFormValues>
  name: any
}

const ProductImgUploader: FC<IImgUploader> = (props) => {
  const [file, setFile] = useState<File | null>(null)
  const [file1, setFile1] = useState<any>()

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      setFile1(e.target.files[0])
    }
  }
  const { isEnglish } = useLang()

  return (
    <div className='w-full flex items-center justify-center'>
      <div className='mt-1.5 border rounded w-[146px] h-[50px] flex justify-center items-center'>
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
          className={'border-b-[1px] border-[#000] text-[10px] h-[15px] overflow-hidden text-ellipsis mx-4'}
        >
          {!file &&
            (isEnglish ? "Upload Photo Here" : "تحميل الصورة هنا")
          }
          {!!file && (file1.name)}
        </label>
      </div>
    </div>
  )
}

export default ProductImgUploader

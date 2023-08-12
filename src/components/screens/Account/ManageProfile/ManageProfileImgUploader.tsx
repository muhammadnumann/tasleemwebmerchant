/* eslint-disable @next/next/no-img-element */
import cn from 'clsx'
import Image from 'next/image'
import { ChangeEvent, FC, useState } from 'react'
import { Path, UseFormRegister } from 'react-hook-form'
import { IManageProfileFormValues } from './manage-profile.interface'

interface IManageProfileImgUploader {
  type: 'logo' | 'banner'
  title: string
  register: UseFormRegister<IManageProfileFormValues>
  name: Path<IManageProfileFormValues>
  path?: string
}

const ManageProfileImgUploader: FC<IManageProfileImgUploader> = (props) => {
  const [file, setFile] = useState('')

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(URL.createObjectURL(e.target.files[0]))
    }
  }

  return (
    <div>
      <div className='text-min text-[#515151]'>{props.title}</div>
      <div className='mt-1.5'>
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
          className={cn(
            'rounded block relative p-2 border border-gray-default',
            {
              'w-[110px] h-[110px] overflow-hidden': props.type === 'logo',
              'w-[146px] h-[61px] overflow-hidden': props.type === 'banner'
            }
          )}
        >
          {!!file ? (
            <Image src={file} alt='img' className='object-cover' fill />
          ) : <img src={props.path} alt='img' className='object-cover' />
          }

        </label>
      </div>
    </div>
  )
}

export default ManageProfileImgUploader

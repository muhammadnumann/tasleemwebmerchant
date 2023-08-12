import { FC } from 'react'

interface IMessage {
  text: string
}

const MessageAlert: FC<IMessage> = ({ text }) => {
  return (
    <section className='bg-white dark:bg-gray-900 mt-12'>
      <div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16'>
        <h1 className='mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-4xl dark:text-white text-gray-700'>
          {text}
        </h1>
      </div>
    </section>
  )
}

export default MessageAlert

/* eslint-disable react-hooks/exhaustive-deps */
import { useLang } from '@/hooks/useLang'
import cn from 'clsx'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { IMenuCat } from './menu.interface'
import AddNewCategory from './AddNewCategory'
import { ProductSubCategory } from '@/redux/services/Product'
import EditSubCategory from './EditSubCategory'
import { useSelector } from 'react-redux'
import { ErrorDialog } from '@/components/ui/Dailog'
import Loader from '@/components/ui/Dailog/loader'

interface IMenuCats {
  catId: { id: number, is_stop: boolean }
  setCatId: Dispatch<SetStateAction<{ id: number, is_stop: boolean }>>
}

const MenuCats: FC<IMenuCats> = (props) => {

  const [isOpen, setIsOpen] = useState(false)
  const [loading, setloading] = useState(true)
  const [editIsOpen, setEditIsOpen] = useState(false)
  const [editData, setEditData] = useState()
  const { isEnglish } = useLang()
  const [result, setResult] = useState<IMenuCat[]>()
  const apiCalled = useSelector((state: any) => state?.ApiLoading?.isCalled)

  const CategoryList = async () => {
    try {
      const res = await ProductSubCategory()
      props.setCatId({ id: res.data[0].id, is_stop: res.data[0].is_stop == 1 ? true : false })
      setResult(res.data)
      setloading(false)
    } catch (error) {
      setloading(false)
      ErrorDialog(error)
    }
  }

  useEffect(() => {
    CategoryList()
  }, [apiCalled])

  function closeEditModal() {
    setEditIsOpen(false)
  }
  function openEditModal(data: any) {
    setEditIsOpen(true)
    setEditData(data)

  }
  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }
  return (
    <div className='overflow-x-auto'>
      {loading && <Loader />}
      <div className='flex gap-6 overflow-x-auto' style={{ inlineSize: "max-content" }}>
        {result?.map((c) => (
          <div key={c.id} className='relative flex items-end h-[90px]'>

            <span className='absolute top-0 left-[45%] cursor-pointer' onClick={() => openEditModal(c)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="edit"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
            </span>
            <button
              onClick={() => props.setCatId({ id: c.id, is_stop: c.is_stop == 1 ? true : false })
              }
              className={cn(
                'flex-auto px-7 py-3 text-white duration-300 font-bold  rounded-[43px] shadow-icon sm:py-3 mb-3',
                c.id === props.catId.id ? 'bg-blue-default' : 'bg-[#C0C0C0]'
              )}
            >
              <div className='text-xs sm:text-xl'>
                {isEnglish ? c.title : c.title_ar}
              </div>
              {/* <div className='text-min sm:text-sm'>Items: {c.itemsCount}</div> */}
            </button>
          </div>
        ))}
        <button onClick={() => openModal()} className='text-lg font-extrabold'>
          + {isEnglish ? 'Add New Sub Category' : 'إضافة فئة فرعية جديدة'}
        </button>
        {
          isOpen && <AddNewCategory closeModal={closeModal} setIsOpen={setIsOpen} isOpen={isOpen} />
        }
        {
          editIsOpen && <EditSubCategory data={editData} closeModal={closeEditModal} setIsOpen={setEditIsOpen} isOpen={editIsOpen} />
        }
      </div>
    </div >
  )
}

export default MenuCats

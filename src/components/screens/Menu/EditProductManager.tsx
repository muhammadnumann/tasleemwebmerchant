/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal'
import { ProductDetailById } from '@/redux/services/Product'
import EditIcon from '@/components/Icons/EditIcon'
import EditProductManagerForm from './EditProductManagerForm'

interface Ivalue {
  editisOpen: any
  seteditisOpen: any
  data: any
}
function EditProductManagerModal({ editisOpen, seteditisOpen, data }: Ivalue) {
  const [result, setResult] = useState()

  const fetchData = async () => {
    try {
      const res = await ProductDetailById({ id: data?.id })
      setResult(res.data[0])
    } catch (error) { }
  }

  useEffect(() => {
    fetchData()
  }, [])



  function openModal() {
    seteditisOpen(true)
  }

  function closeModal() {
    seteditisOpen(false)
  }


  return (
    <div>
      <div className='flex justify-center w-full'>
        <button
          onClick={() => openModal()}
          className='flex justify-center items-center bg-[#00C2FF] rounded-full w-8 h-8'
        >
          <EditIcon />
        </button>
      </div>

      <Modal modalIsOpen={editisOpen} closeModal={closeModal}>
        {
          result &&
          <EditProductManagerForm data={result} seteditisOpen={seteditisOpen} closeModal={closeModal} />
        }
      </Modal>
    </div>
  )
}

export default EditProductManagerModal

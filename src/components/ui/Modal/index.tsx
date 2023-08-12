import React, { FC, PropsWithChildren } from 'react'
import ReactModal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    maxHeight: '90%',
    maxWidth: "700px",
    padding: "0px",
    borderRadius: "24px",
    background: "#FFF",
    boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
    transform: 'translate(-50%, -50%)',
  },
};
interface propsType {
  closeModal: any
  modalIsOpen: any
}
const Modal: FC<PropsWithChildren<propsType>> = ({ children, closeModal, modalIsOpen }) => {
  let subtitle;


  return (
    <>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {children}
      </ReactModal>
    </>
  )
}

export default Modal
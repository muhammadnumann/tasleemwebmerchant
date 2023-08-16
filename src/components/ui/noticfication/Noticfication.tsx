/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { useSelector } from 'react-redux';
import OrderModal from '@/components/screens/Orders/OrdersItem/orderModal';
import Modal from '../Modal';
import useSound from 'use-sound';

const Context = React.createContext({ name: 'Default' });

import sound from "@/public/sound.wav"

const Noticfication: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const data = useSelector((state: any) => state?.Dashboard?.notification)
  const [modalIsOpen, setIsOpen] = useState(false)

  const openNotification = (placement: NotificationPlacement) => {
    new Audio(sound).play()
    api.info({
      message: `${data[0]?.title}`,
      description: <>{data[0]?.msg}</>,
      placement,
      onClick: () => { setIsOpen(true) }
    });
  };

  useEffect(() => {
    if (data.length)
      openNotification('bottomRight')
    return () => {
      if (data.length)
        openNotification('bottomRight')
    };
  }, [data])

  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  function closeModal() {
    setIsOpen(false)
  }
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}

      <Modal closeModal={closeModal} modalIsOpen={modalIsOpen}>
        <OrderModal
          data={{ id: data[0]?.orderID }}
          closeModal={closeModal}
          type={'new'}
        />
      </Modal>
    </Context.Provider>
  );
};

export default Noticfication;
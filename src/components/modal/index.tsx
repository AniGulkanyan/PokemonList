import React  from 'react';

const Modal = ({ isOpen, onClose, children }: any) => {

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: '444'
        }}
        onClick={onClose}
      />
      <div style={{ zIndex: '9999' }}>
        {children}
      </div>
    </>
  );
};

export default Modal;

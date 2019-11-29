import React from 'react';

import './form-button.css';

const FormButton = ({ available }) => {
  const clazz = !available ? 'da-button-disabled' : null;
  return (
    <div className="form-button">
      <button type="submit" className={`da-button da-button_new ${clazz}`}>Записаться</button>
    </div>
  )
};

export default FormButton;

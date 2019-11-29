import React from 'react';

import './form-rules.css';

const FormRules = () => {
  return (
    <div className="form-rules">
      Нажимая «Записаться», я выражаю своё согласие с обработкой моих персональных данных в соответствии с
      принятой <a className="form-link" href="#">политикой конфиденциальности</a> и принимаю <a className="form-link"
                                                                                     href="#">
      пользовательское соглашение</a>
    </div>
  );
};

export default FormRules;

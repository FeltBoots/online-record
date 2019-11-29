import React  from 'react';
import './record-form.css';

const RecordForm = ({ onSubmit, children, loading }) => {
  const clazz = loading ? 'page_loading loading-affect' : null;
  return (
    <div className={`record-form ${clazz}`}>
      <div className="record-form_wrapper">
        <form action="POST" onSubmit={onSubmit}>
          { children }
        </form>
      </div>
    </div>
  );
};

export default RecordForm;

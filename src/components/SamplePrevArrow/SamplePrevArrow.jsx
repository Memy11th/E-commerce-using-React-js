import React, { useEffect, useState } from 'react'
import style from './SamplePrevArrow.module.css'


function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

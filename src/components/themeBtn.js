import React, { useEffect, useState } from 'react';
import { getValue, setValue } from '../utils/storage';

function ThemeBtn() {
  const [isDark, setIsDark] = useState(getValue('isDark'));

  useEffect(() => {
    setValue('isDark', isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <span className="toggle-container">
      <input type="checkbox" className="toggle-button" defaultChecked={isDark} onClick={() => setIsDark((isDark) => !isDark)}/>
    </span>
  );
}

export default ThemeBtn;
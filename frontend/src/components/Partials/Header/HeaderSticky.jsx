import React, { useEffect, useRef } from 'react';

function HeaderSticky(props) {
  const { top = 210 } = props;
  const ref = useRef(null);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollHandler() {
    let stickyContent = ref.current.children[0];
    if (window.pageYOffset > top) {
      if (!stickyContent.classList.contains('fixed')) {
        stickyContent.classList.add('fixed');
      }
    } else if (stickyContent.classList.contains('fixed')) {
      stickyContent.classList.remove('fixed');
    }
  }

  return (
    <div ref={ref} className="header__sticky-wrapper">
      {props.children}
    </div>
  );
}

export default HeaderSticky;

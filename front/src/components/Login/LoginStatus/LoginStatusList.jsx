// HOOKS
import { useRef, useEffect } from 'react';
// HELPERS
import clickOutside from '../../../helpers/clickOutside';
// DATA
import statusList from '../../../data/statusList';

const LoginStatusList = (props) => {

  const { setCurrenStatus, setShowStatusList, dropDownButtonTarget, classShow } = props;

  const statusContainerRef = useRef();

  const handleClick = ({ target }) => {
    const { innerText: targetStatus } = target;
    setCurrenStatus(targetStatus);
    setShowStatusList(false);
  };

  const clickOutsideStatusHandler = e => {
    const options = [
      statusContainerRef,
      setShowStatusList,
      dropDownButtonTarget,
      e.target,
    ];
    clickOutside(...options);
  };

  useEffect(() => {
    if (dropDownButtonTarget) {
      document.addEventListener('click', clickOutsideStatusHandler);
    }

    return () => {
      document.removeEventListener('click', clickOutsideStatusHandler);

    };
  }, [dropDownButtonTarget]);

  return (
    <ul className={"login-status__list " + classShow} ref={statusContainerRef}>
      {statusList
        .map((status, index) => (
          <li key={index} onClick={handleClick}>
            <div className="status-img__container">
              <img className="notHover" src={status.icon} alt="status icon" />
              <img className="hover" src={status.inconHover} alt="status icon hovered" />
            </div>
            <span>{status.sentence}</span>
          </li>
        ))}
    </ul>
  );
};

export default LoginStatusList;
// HOOKS
import { useRef, useEffect, useContext } from 'react';
// CONTEXT 
import loginContext from '../../../contexts/LoginContext';
// HELPERS
import clickOutside from '../../../helpers/clickOutside';
// DATA
import statusList from '../../../data/statusList';

const LoginStatusList = (props) => {

  const { setShowStatusList, dropDownButtonTarget, classShow } = props;

  const statusContainerRef = useRef();
  const { formUpdate, setFormUpdate } = useContext(loginContext);

  const handleClick = ({ currentTarget }) => {
    const { status } = currentTarget.dataset;

    setShowStatusList(false);
    setFormUpdate({ ...formUpdate, status });
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
      {Object.values(statusList)
        .map((status, index) => (
          <li key={index} onClick={handleClick} data-status={status.key}>
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
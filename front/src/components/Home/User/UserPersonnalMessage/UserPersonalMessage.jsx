// HOOKS
import { useState, useContext, useRef, useEffect, useCallback } from 'react';
// CONTEXT
import globalContext from '../../../../contexts/GlobalContext';

const UserPersonalMessage = () => {

  const { userDataFromDb, setUserDataFromDb } = useContext(globalContext);
  const inputRef = useRef();
  const buttonRef = useRef();

  const [clickedButton, setClickedButton] = useState(false);
  const [personalMessage, setPersonalMessage] = useState(userDataFromDb.personalMessage || "<Tapez votre message perso>");
  const [clickedTarget, setClickedTarget] = useState(null);
  const [clickedButtonTarget, setClickedButtonTarget] = useState(null);
  const handleListener = useCallback(({ target }) => {
    console.log("🚀 ~ file: UserPersonalMessage.jsx ~ line 20 ~ handleListener");
    setClickedTarget(target);
  }, [clickedTarget]);



  const handlePersonalMessage = ({ key }) => {
    if (key === "Enter") {
      setUserDataFromDb({ ...userDataFromDb, personalMessage: personalMessage });
      setClickedButton(false);
    }
  };

  const autoSelect = () => {
    if (clickedButton) {
      inputRef.current.select();
    }
  };

  useEffect(autoSelect, [clickedButton]);


  useEffect(() => {
    if (inputRef.current) {
      const isClickingOnButton = clickedButtonTarget.contains(clickedTarget);
      const isClickingOnInput = inputRef.current.contains(clickedTarget);

      if (!isClickingOnButton && !isClickingOnInput) {
        setUserDataFromDb({ ...userDataFromDb, personalMessage: personalMessage });
        setClickedButton(false);
        document.removeEventListener("mousedown", handleListener);
      }
    }
  }, [clickedTarget]);

  useEffect(() => {
    if (clickedButton) {
      document.addEventListener("mousedown", handleListener);
    }

    return () => {
      document.removeEventListener("mousedown", handleListener);
    };
  }, [clickedButton]);

  return (
    <>
      {clickedButton
        ? (<input type="text"
          ref={inputRef}
          onChange={({ target }) => setPersonalMessage(target.value)}
          onKeyDown={handlePersonalMessage}
          value={personalMessage}
        />)
        : <button
          type="button"
          className="user-personnal-message"
          ref={buttonRef}
          onClick={({ target }) => {
            setClickedButton(true);
            setClickedButtonTarget(target);
          }}
        >
          {personalMessage}
        </button>}
    </>
  );
};

export default UserPersonalMessage;
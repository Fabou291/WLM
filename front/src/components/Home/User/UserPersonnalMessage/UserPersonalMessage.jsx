// HOOKS
import { useState, useContext, useRef, useEffect } from 'react';
// CONTEXT
import globalContext from '../../../../contexts/GlobalContext';

const UserPersonalMessage = () => {

  const { userDataFromDb, setUserDataFromDb } = useContext(globalContext);
  const inputRef = useRef();

  const [clickedButton, setClickedButton] = useState(false);
  const [personalMessage, setPersonalMessage] = useState(userDataFromDb.personalMessage || "<Tapez votre message perso>");

  const handlePersonalMessage = (event) => {
    event.preventDefault();
    setUserDataFromDb({ ...userDataFromDb, personalMessage: personalMessage });
    setClickedButton(false);
  };

  const autoSelect = () => {
    if (clickedButton) {
      inputRef.current.select();
    }
  };

  useEffect(autoSelect, [clickedButton]);

  return (
    <form onSubmit={handlePersonalMessage}>
      {clickedButton
        ? (<input type="text"
          ref={inputRef}
          onChange={({ target }) => setPersonalMessage(target.value)}
          onBlur={handlePersonalMessage}
          value={personalMessage}
        />)
        : <button
          type="button"
          className="user-personnal-message"
          onClick={() => setClickedButton(true)}
        >
          {personalMessage}
        </button>}
    </form>
  );
};

export default UserPersonalMessage;
const clickOutside = (listRef, callback, listBtnTarget, target) => {
  // console.log({ listRef: listRef?.current, listBtnTarget, target });
  if (
    listRef.current &&
    listRef.current.contains(target) === false &&
    target !== listBtnTarget
  ) {
    callback(false);
  }

};

export default clickOutside;


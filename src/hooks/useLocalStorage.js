import { useState, useEffect } from "react";

/** Custom hook for keeping state data synced with localStorage.
 *
 * This creates 'item' as piece of state and look in localStorage for current value
 * (if not found, defaults to `firstValue`)
 *
 * When `item` changes, effect re-runs:
 * - if new state is null, removes from localStorage
 * - else, updates localStorage
 *
 * To the component, this just acts like state that is also synced to/from
 * localStorage::
 *
 *   const [myThing, setMyThing] = useLocalStorage("myThing")
 */

function useLocalStorage(key, firstValue = null) {
  // set initialValue of piece of state 'item' to the key passed in to localStorage or to null if no key exists
  const initialValue = localStorage.getItem(key) || firstValue;

  const [item, setItem] = useState(initialValue);

  useEffect(
    function setKeyInLocalStorage() {
      // if piece of state 'item'=null, remove key from localStorage
      if (item === null) {
        localStorage.removeItem(key);
      } else {
        // if piece of state 'item' is not null, update localStorage with 'key' and 'item'
        localStorage.setItem(key, item);
      }
    },
    [key, item]
  );

  return [item, setItem];
}

export default useLocalStorage;

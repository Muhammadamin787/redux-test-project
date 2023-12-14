import { useState, useCallback } from 'react';

export const useSessionStorage = (key: string, initialValue: string) => {

     // States
     const [value, setValue] = useState<string>(getStorageValue)

     // Functions
     function getStorageValue() {
          try {
               const item = sessionStorage.getItem(key)
               return item ? JSON.parse(item) : initialValue
          } catch (err) {
               return initialValue
          }
     }

     const setStorage = useCallback((valueToStore: string) => {
          try {
               setValue(valueToStore)
               sessionStorage.setItem(key, JSON.stringify(valueToStore))
          } catch (err) {
               // console.log(err)
          }
     }, [key])

     return [value, setStorage]
}
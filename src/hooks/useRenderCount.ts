import { useEffect, useRef } from "react"

export const useRenderCount = () => {
     const ref = useRef<number>(0);

     useEffect(() => {
          ref.current++
          console.log(ref.current);
     }, [])
}
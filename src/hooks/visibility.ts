import { RefObject, useEffect, useMemo, useState } from "react";

export default function useVisibility(element: RefObject<HTMLElement>) {
  // State untuk menyimpan visibility
  const [visible, setVisible] = useState(true);

  // Ini untuk memantau apa elemen nya kliatan
  // useMemo agar value dari var ini selalu dicache pada saat scroll
  let observer = useMemo(() => new IntersectionObserver(

    // Kenapa ini array? Karena ini sekali ada >1 element
    // yang visible, ia akan manggil sekali untuk semua el
    // https://www.codeguage.com/courses/advanced-js/intersection-observer-entries
    ([entry]) => setVisible(entry.isIntersecting)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [element]);

  // Observe element
  useEffect(() => {
    observer.observe(element.current!);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return visible;
}
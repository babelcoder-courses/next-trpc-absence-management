import { useEffect, useState } from 'react';

function useCache<T>(key: string) {
  const [value, setValue] = useState<T | null>(null);

  const changeValue = (value: T) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  const clear = () => {
    setValue(null);
    localStorage.removeItem(key);
  };

  useEffect(() => {
    const item = localStorage.getItem(key);
    setValue(item ? (JSON.parse(item) as T) : null);
  }, [key]);

  return [value, changeValue, clear] as const;
}

const IndexPage = () => {
  const [value, setValue, clear] = useCache<string>('accessToken');

  return (
    <>
      {/* ค่า value จะเปลี่ยนแปลงตลอดเมื่อเรียก setValue หรือ clear */}
      {/* เมื่อคอมโพแนนท์ mounted ต้องดึงค่าล่าสุดของ value จาก localStorage ด้วย */}
      {JSON.stringify(value)}
      {/* เมื่อทำการคลิกจะเซ็ตค่า value เป็น 'my-access-token' */}
      {/* และเก็บค่านี้ลง localStorage ภายใต้ key คือ accessToken */}
      <button onClick={() => setValue('my-access-token')}>setValue</button>
      {/* เมื่อทำการคลิกจะลบ value ออกจาก localStorage ใน key ที่ชื้อ accessToken */}
      {/* พร้อมกำหนด value ปัจจุบันเป็น null เราจะเห็น value ใหม่บนหน้าจอเป็น null */}
      <button onClick={() => clear()}>clear</button>
    </>
  );
};

export default IndexPage;

export const setStoarage = (id: string, data: string): void => {
  localStorage.setItem(id, data);
};

export const getStoarage = (id: string): string | null => {
  const result: string | null = localStorage.getItem(id);
  return result;
};

export const deleteStorage = (id:string)=>{
  localStorage.removeItem(id);
}
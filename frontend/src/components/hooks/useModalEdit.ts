import { useState } from "react";

type Values = {
  name: string,
  lastname: string,
  email: string,
  phone: string,
  date: string,
  peopleNum: number,
}

export default () => {
  const [values, setValues] = useState<Values>({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    date: '',
    peopleNum: 0,
  });

  const setFormValues = (newValues: Values) => {
    setValues({...values, ...newValues});
  };

  return { ...values, setFormValues };
};
import { useState } from "react";

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const onChange = ({ target }) => setValue(target.value);

  return [value, onChange];
}

export default useFormInput;

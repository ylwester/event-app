import {useState} from "react";

const useVisibilityChange = (component, visibility ) => {
    const [visible, setVisible] = useState(() => visibility);

    return [visible ? component : null, () => setVisible((v) => !v)];
};

export default useVisibilityChange;
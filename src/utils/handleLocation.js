import { useNavigate } from "react-router-dom";

export function useHandleLocation() {
  const navigate = useNavigate();

  const handleLocation = (url, options = {}) => {
    if (options.beforeNavigate) {
      options.beforeNavigate();
    }

    navigate(url);

    if (options.afterNavigate) {
      options.afterNavigate();
    }
  };

  return handleLocation;
}

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { simonSays } from "./simon-says";

export const useSimonSays = () => {
  const slice = useSelector(simonSays.selectors.slice);
  const dispatch = useDispatch();
  return {
    ...slice,
    ...bindActionCreators(simonSays.actions, dispatch),
  };
};

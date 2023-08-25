import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export const answerNumber = atom({
  key: "answerNumber",
  default: 0,
});

export const guessList = atom({
  key: "guessList",
  default: [],
});

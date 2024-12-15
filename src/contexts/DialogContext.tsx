import { createContext, ReactNode } from "react";

interface DialogOptions {
  open: boolean;
  title: string;
  message: string;
  btns:
    | {
        label: string;
        onClick: Function;
      }[]
    | [];
}

interface DialogContextProps {
  children?: ReactNode;
  dialogOptions: DialogOptions;
  setDialogOptions: Function;
}

const DialogContext = createContext({
  dialogOptions: {
    open: false,
    title: "",
    message: "",
    btns: [],
  } as DialogOptions,
  setDialogOptions: (_: DialogOptions) => {},
});

const DialogContextProvider = ({
  children,
  dialogOptions,
  setDialogOptions,
}: DialogContextProps) => {
  return (
    <DialogContext.Provider value={{ dialogOptions, setDialogOptions }}>
      {children}
    </DialogContext.Provider>
  );
};

export { DialogContext, DialogContextProvider };

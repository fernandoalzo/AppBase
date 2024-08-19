import { Toast } from "native-base";

export const showToastSuccess = (title, message) => {
  return Toast.show({
    title: title,
    description: message,
    status: "success",
    duration: 2000,
    isClosable: true,
    placement: "bottom",
    backgroundColor: "success.700",
  });
};

export const showToastFail = (title, message) => {
  return Toast.show({
    title: title,
    description: message,
    status: "success",
    duration: 2000,
    isClosable: true,
    placement: "top",
    backgroundColor: "error.600",
  });
};

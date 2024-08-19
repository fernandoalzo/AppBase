import { Center, AlertDialog, Button } from "native-base";

export function AlertDialogModal({
  showAlertDialogMessage,
  setShowAlertDialogMessage,
  message,
}) {
  return (
    <Center>
      <AlertDialog
        isOpen={showAlertDialogMessage}
        onClose={() => {
          setShowAlertDialogMessage(false);
        }}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Ocurrio un error!!!</AlertDialog.Header>
          <AlertDialog.Body>{message}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                colorScheme="primary"
                onPress={() => {
                  setShowAlertDialogMessage(false);
                }}
              >
                OK
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
}

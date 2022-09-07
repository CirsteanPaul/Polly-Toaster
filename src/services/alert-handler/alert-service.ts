import Swal from 'sweetalert2';
import PopupProps from './types';

const noMetamaskPopup = async () => {
  const result = await Swal.fire({
    title: 'Where is your metamask?',
    text: 'Do you want to download metamask?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!',
    cancelButtonText: 'Later..',
  });
  if (result.isConfirmed) window.open('https://metamask.io/download/', '_blank');
};
const succesPopup = (props: PopupProps) => {
  const { title, message } = props;
  Swal.fire({
    title,
    icon: 'success',
    text: message,
  });
};
const errorPopup = (props: PopupProps) => {
  const { title, message } = props;
  Swal.fire({
    title,
    icon: 'error',
    text: message,
  });
};
const infoPopup = (props: PopupProps) => {
  const { title, message } = props;
  Swal.fire({
    icon: 'warning',
    title,
    text: message,
  });
};
const somethingWentWrongPopup = (networkName: string) => {
  Swal.fire({
    title: 'Something went wrong',
    icon: 'error',
    text: `We couldn't connect to ${networkName} with your wallet`,
  });
};
const alertService = { succesPopup, errorPopup, noMetamaskPopup, somethingWentWrongPopup, infoPopup };
export default alertService;

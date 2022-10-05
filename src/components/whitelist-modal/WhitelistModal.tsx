/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Backdrop } from '@mui/material';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import alertService from 'services/alert-handler';
import { useAppDispatch } from 'store';
import { fetchDatabaseAddressescActionAsync, postNewWhitelistActionAsync, setModalStatusAction } from 'store/actions/database-actions';
import Swal from 'sweetalert2';
import WhitelistModalProps from './types';

const WhitelistModal = (props: WhitelistModalProps): JSX.Element => {
  const { status } = props;
  const dispatch = useAppDispatch();
  const onClose = () => dispatch(setModalStatusAction(false));
  const [address, setAddress] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleChange = (event: any) => {
    setAddress(event.target.value);
    setIsChecked(false);
  };
  const handleSubmit = async () => {
    let convertedAddress;
    try {
      convertedAddress = ethers.utils.getAddress(address.trim().toLowerCase());
    } catch (e) {
      alertService.errorPopup({ title: 'Error', message: 'The address is incorrect!' });
      return;
    }
    if (isChecked) {
      dispatch(postNewWhitelistActionAsync(convertedAddress));
      setAddress('');
      setIsChecked(false);
    } else {
      await dispatch(fetchDatabaseAddressescActionAsync());
      setIsChecked(true);
    }
  };

  return (
    <Backdrop
      onClick={onClose}
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', color: '#fff', zIndex: 40 }}
      open={status}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="flex w-1/2 py-10 px-20 text-accent text-3xl sm:text-xl sm:px-8 sm:w-3/4 flex-col rounded-md justify-center gap-8 items-center z-50 bg-[#131212ed]"
      >
        <p className=" text-center">{`You've found the secret whitelist submit interface!`}</p>
        <p className=" text-center text-xl tracking-wider">Insert your address and click check address</p>
        <p className=" text-center text-xl tracking-wider">Last step is submitting the address by pressing the button</p>
        <input
          maxLength={50}
          value={address}
          onChange={handleChange}
          className="rounded-sm text-lg placeholder-text text-text bg-headline border-0 w-full outline-none align-middle text-center px-2 py-4"
          placeholder="address for white list!"
        />
        <button type="submit" className=" rounded-md py-2 px-10 sm:px-4 sm:text-xl bg-headline text-text text-3xl tracking-wider" onClick={handleSubmit}>
          {isChecked ? 'Submit' : 'Check address'}
        </button>
      </div>
    </Backdrop>
  );
};

export default WhitelistModal;

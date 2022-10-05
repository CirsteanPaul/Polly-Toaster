import { ethers } from 'ethers';
import React, { useState } from 'react';
import { useAppDispatch } from 'store';
import { fetchDatabaseAddressescActionAsync, postNewWhitelistActionAsync } from 'store/actions/database-actions';
import Swal from 'sweetalert2';

const InputWhitelist = (): JSX.Element => {
  const [address, setAddress] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleChange = (event: any) => {
    setAddress(event.target.value);
    setIsChecked(false);
  };
  const handleSubmit = async () => {
    let convertedAddress;
    try {
      convertedAddress = ethers.utils.getAddress(address.trim().toLowerCase());
    } catch (e) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'The address is incorrect!',
        timer: 3000,
      });
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
    <div className=" flex w-full justify-center flex-col items-center gap-3 px-10">
      <input
        maxLength={50}
        value={address}
        onChange={handleChange}
        className="rounded-sm text-lg text-headline bg-background border-0 w-full outline-none align-middle text-center px-2 py-3"
        placeholder="address for white list!"
      />
      <button type="submit" className=" rounded-md py-2 px-10 sm:px-3 sm:text-xl bg-headline text-text text-3xl tracking-wider" onClick={handleSubmit}>
        {isChecked ? 'Submit' : 'Check address'}
      </button>
    </div>
  );
};

export default InputWhitelist;

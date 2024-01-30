async function otpCheck(otp: string): Promise<boolean> {
  return true;
  // return otp === '1234';
}

export async function verifyOTP(otp: string): Promise<boolean> {
  console.log('IN verifyOTP activity');
  const otp_status = await otpCheck(otp);
  console.log('DONE verifyOTP activity: ', otp_status);

  return otp_status;
}

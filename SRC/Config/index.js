export const baseUrl = "https://www.amazing-grothendieck.23-83-37-162.plesk.page";
// export const baseUrl = "https://54ac-103-125-71-14.ap.ngrok.io";
export const imageUrl = `${baseUrl}/api/images/`;

export const apiDataLimit = 10;
export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

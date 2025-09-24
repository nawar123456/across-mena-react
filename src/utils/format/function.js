export const formatDate = (inputDateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const dateObject = new Date(inputDateString);
    return dateObject.toLocaleDateString('en-GB', options).split('/').reverse().join('-');
  };
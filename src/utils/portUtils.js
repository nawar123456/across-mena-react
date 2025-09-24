export const isSyrianPort = (portName) => {
  const syrianPorts = ['Lattakia', 'Tartus'];
  return syrianPorts.includes(portName?.trim());
};

export const getCurrency = (portFrom, portTo) => {
  return (isSyrianPort(portFrom) || isSyrianPort(portTo)) ? 'EUR' : 'USD';
};

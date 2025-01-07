export default (item: any) => {
  const invoiceFiles = item.files.filter((f) => f.type === "invoice_file");
  const swiftFiles = item.files.filter((f) => f.type === "swift_file");
  const orderFiles = item.files.filter((f) => f.type === "order_file");
  const swift199Files = item.files.filter((f) => f.type === "swift199_file");

  return {
    ...item,
    invoice_file: invoiceFiles,
    swift_file: swiftFiles,
    order_file: orderFiles,
    swift199_file: swift199Files,
  };
};

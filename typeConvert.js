function hex_to_address(raw_hex) {
  const clean_hex = raw_hex.substring(26,);
  const address = '0x'.concat(clean_hex);
  return address;
}

function hex_to_decimal(raw_hex) {
  const clean_hex = raw_hex.substring(2,);
  const decimal = parseInt(clean_hex, 16);
  return decimal
}

module.exports = {hex_to_address, hex_to_decimal}